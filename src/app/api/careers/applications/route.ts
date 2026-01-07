import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { JobApplicationInsert } from '@/types/careers'

// POST submit new application
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const body: JobApplicationInsert = await request.json()

    // Validate required fields
    if (!body.job_id || !body.full_name || !body.email || !body.cover_letter) {
      return NextResponse.json(
        { error: 'Missing required fields: job_id, full_name, email, cover_letter' },
        { status: 400 }
      )
    }

    // Get client IP and user agent
    const ip_address = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    const applicationData = {
      ...body,
      status: 'pending',
      ip_address: Array.isArray(ip_address) ? ip_address[0] : ip_address.split(',')[0],
      user_agent,
    }

    const { data, error } = await supabase
      .from('job_applications')
      .insert([applicationData])
      .select(`
        *,
        job:jobs(*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit application'
    console.error('Error submitting application:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// GET all applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('job_id')
    const status = searchParams.get('status')

    let query = supabase
      .from('job_applications')
      .select(`
        *,
        job:jobs(*)
      `)
      .order('created_at', { ascending: false })

    if (jobId) {
      query = query.eq('job_id', jobId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch applications'
    console.error('Error fetching applications:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

