import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { JobUpdate } from '@/types/careers'

// GET single job by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServiceClient()
    const { id } = await params

    // Try by ID first
    let { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        category:job_categories(*)
      `)
      .eq('id', id)
      .eq('archived', false)
      .single()

    // If not found by ID, try by slug
    if (error || !data) {
      const slugResult = await supabase
        .from('jobs')
        .select(`
          *,
          category:job_categories(*)
        `)
        .eq('slug', id)
        .eq('archived', false)
        .single()

      if (!slugResult.error && slugResult.data) {
        data = slugResult.data
        error = null
      } else {
        error = slugResult.error || error
      }
    }

    if (error || !data) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await supabase
      .from('jobs')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id)

    // Get application count
    const { count } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true })
      .eq('job_id', data.id)

    return NextResponse.json({
      ...data,
      application_count: count || 0,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch job'
    console.error('Error fetching job:', message)
    
    if (message.includes('not found') || message.includes('PGRST116')) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT update job (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServiceClient()
    const { id } = await params
    const body: JobUpdate = await request.json()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Remove fields that shouldn't be updated
    const { id: _, created_at, updated_at, ...updateData } = body as any

    const { data, error } = await supabase
      .from('jobs')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        category:job_categories(*)
      `)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update job'
    console.error('Error updating job:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE job (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServiceClient()
    const { id } = await params

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Soft delete by archiving
    const { error } = await supabase
      .from('jobs')
      .update({ archived: true })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Job archived successfully' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete job'
    console.error('Error deleting job:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

