import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// GET all categories
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from('job_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories'
    console.error('Error fetching categories:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST create category (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const body = await request.json()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('job_categories')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create category'
    console.error('Error creating category:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

