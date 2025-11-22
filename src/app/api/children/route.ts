import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ChildInsert } from '@/types/database.types'

// GET all children
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if request is from admin (has admin password)
    const adminPassword = request.headers.get('x-admin-password')
    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD
    
    // Fetch all children first (before filtering) to check for auto-archiving
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Auto-archive students who have reached their funding goal
    if (data && data.length > 0) {
      const studentsToArchive = data.filter(
        (child) => !child.archived && child.amount_raised >= child.amount_needed
      )

      if (studentsToArchive.length > 0) {
        const idsToArchive = studentsToArchive.map((child) => child.id)
        await supabase
          .from('children')
          .update({ archived: true })
          .in('id', idsToArchive)

        // Update the data array to reflect archived status
        data.forEach((child) => {
          if (idsToArchive.includes(child.id)) {
            child.archived = true
          }
        })
      }
    }

    // Filter out archived children for non-admin requests
    const filteredData = isAdmin 
      ? data 
      : data?.filter((child) => !child.archived) || []

    return NextResponse.json(filteredData)
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

    // Clean up undefined values
    const cleanedBody = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== undefined)
    )

    const { data, error } = await supabase
      .from('children')
      .insert([cleanedBody])
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

