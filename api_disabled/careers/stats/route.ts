import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { JobStats } from '@/types/careers'

// GET job statistics
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    // Get total jobs (not archived)
    const { count: totalCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('archived', false)

    // Get active jobs (not expired)
    const today = new Date().toISOString().split('T')[0]
    const { count: activeCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('archived', false)
      .eq('status', 'active')
      .gte('deadline', today)

    // Get expired jobs
    const { count: expiredCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('archived', false)
      .lt('deadline', today)

    // Get unique categories count
    const { count: categoriesCount } = await supabase
      .from('job_categories')
      .select('*', { count: 'exact', head: true })

    // Get unique locations count
    const { data: jobs } = await supabase
      .from('jobs')
      .select('location')
      .eq('archived', false)
    
    const uniqueLocations = new Set(jobs?.map(job => job.location) || [])
    const locationsCount = uniqueLocations.size

    const stats: JobStats = {
      total: totalCount || 0,
      active: activeCount || 0,
      expired: expiredCount || 0,
      categories: categoriesCount || 0,
      locations: locationsCount,
    }

    return NextResponse.json(stats)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch stats'
    console.error('Error fetching stats:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

