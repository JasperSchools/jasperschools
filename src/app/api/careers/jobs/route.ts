import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { JobInsert, JobFilters } from '@/types/careers'
import { generateSlug } from '@/lib/careers/utils'

// GET all jobs with optional filters
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const { searchParams } = new URL(request.url)
    
    // Parse filters
    const filters: JobFilters = {
      search: searchParams.get('search') || undefined,
      category_id: searchParams.get('category_id') || undefined,
      location: searchParams.get('location') || undefined,
      employment_type: searchParams.get('employment_type') as any || undefined,
      status: searchParams.get('status') as any || 'active',
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }

    // Build query
    let query = supabase
      .from('jobs')
      .select(`
        *,
        category:job_categories(*)
      `)

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    } else if (!filters.status || filters.status === 'active') {
      // Default to active jobs only for public access
      query = query.eq('status', 'active')
    }

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters.employment_type) {
      query = query.eq('employment_type', filters.employment_type)
    }

    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    // Always exclude archived
    query = query.eq('archived', false)

    // Get total count for pagination
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('archived', false)
      .eq('status', filters.status === 'active' ? 'active' : filters.status || 'active')

    // Order and paginate
    query = query
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    const from = ((filters.page || 1) - 1) * (filters.limit || 10)
    const to = from + (filters.limit || 10) - 1
    query = query.range(from, to)

    const { data, error } = await query

    if (error) throw error

    // Get application counts for each job
    if (data && data.length > 0) {
      const jobIds = data.map((job: any) => job.id)
      const { data: applications } = await supabase
        .from('job_applications')
        .select('job_id')
        .in('job_id', jobIds)

      // Count applications per job
      const applicationCounts = applications?.reduce((acc: Record<string, number>, app: any) => {
        acc[app.job_id] = (acc[app.job_id] || 0) + 1
        return acc
      }, {}) || {}

      // Add application counts to jobs
      data.forEach((job: any) => {
        job.application_count = applicationCounts[job.id] || 0
      })
    }

    return NextResponse.json({
      jobs: data || [],
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / (filters.limit || 10)),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch jobs'
    console.error('Error fetching jobs:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST create new job (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const body: JobInsert = await request.json()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = generateSlug(body.title)
    }

    // Ensure unique slug
    if (body.slug) {
      const { data: existing } = await supabase
        .from('jobs')
        .select('id')
        .eq('slug', body.slug)
        .single()

      if (existing) {
        // Append timestamp to make it unique
        body.slug = `${body.slug}-${Date.now()}`
      }
    }

    // Set defaults
    const jobData = {
      ...body,
      status: body.status || 'draft',
      featured: body.featured || false,
      view_count: 0,
      archived: false,
      posted_date: body.posted_date || new Date().toISOString().split('T')[0],
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select(`
        *,
        category:job_categories(*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create job'
    console.error('Error creating job:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

