import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST to archive/unarchive a child
export async function POST(
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

    const { archived } = await request.json()

    // Update archived status
    const { data, error } = await supabase
      .from('children')
      .update({ archived: archived ?? true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      archived: data.archived,
      data,
    })
  } catch (error) {
    console.error('Error updating archive status:', error)
    return NextResponse.json(
      { error: 'Failed to update archive status' },
      { status: 500 }
    )
  }
}

