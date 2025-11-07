import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ChildInsert } from '@/types/database.types'

// GET all children
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch children'
    console.error('Error fetching children:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST create new child
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body: ChildInsert = await request.json()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('children')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create child'
    console.error('Error creating child:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

