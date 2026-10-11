import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ChildUpdate } from '@/types/database.types'

// GET single child
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Auto-archive if funding goal is met
    if (data && !data.archived && data.amount_raised >= data.amount_needed) {
      const { data: updatedData, error: updateError } = await supabase
        .from('children')
        .update({ archived: true })
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        console.error('Error auto-archiving child:', updateError)
        // Continue with original data if update fails
      } else {
        return NextResponse.json(updatedData)
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching child:', error)
    return NextResponse.json(
      { error: 'Failed to fetch child' },
      { status: 500 }
    )
  }
}

// PUT update child
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const body: ChildUpdate = await request.json()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Clean up undefined values that might cause issues
    const cleanedBody = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== undefined)
    )

    // First get the current child data to check funding
    const { data: currentChild, error: fetchError } = await supabase
      .from('children')
      .select('amount_raised, amount_needed, archived')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Calculate if should be archived based on new or existing amounts
    const newAmountRaised = cleanedBody.amount_raised ?? currentChild.amount_raised
    const newAmountNeeded = cleanedBody.amount_needed ?? currentChild.amount_needed
    
    // Auto-archive if funding goal is met
    if (newAmountRaised >= newAmountNeeded && !currentChild.archived) {
      cleanedBody.archived = true
    }

    const { data, error } = await supabase
      .from('children')
      .update(cleanedBody)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating child:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update child'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE child (soft delete - archive instead)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Validate admin password
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Archive instead of delete
    const { error } = await supabase
      .from('children')
      .update({ archived: true })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, archived: true })
  } catch (error) {
    console.error('Error archiving child:', error)
    return NextResponse.json(
      { error: 'Failed to archive child' },
      { status: 500 }
    )
  }
}

