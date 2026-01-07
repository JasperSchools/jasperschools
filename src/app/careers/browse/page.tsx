'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JobFilter from '@/components/careers/JobFilter'
import JobCard from '@/components/careers/JobCard'
import { Job, JobCategory, JobFilters, JobStats as Stats } from '@/types/careers'

export default function BrowseJobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Parse initial filters from URL - determine initial tab based on status param
  const statusParam = searchParams.get('status') as any
  const initialTab = statusParam === 'expired' ? 'expired' : statusParam === 'active' ? 'active' : 'all'
  
  const initialFilters: JobFilters = {
    search: searchParams.get('search') || undefined,
    category_id: searchParams.get('category_id') || undefined,
    location: searchParams.get('location') || undefined,
    employment_type: (searchParams.get('employment_type') as any) || undefined,
    status: statusParam || 'active',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 10,
  }

  const [jobs, setJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<JobCategory[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'expired'>(initialTab)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const [filters, setFilters] = useState<JobFilters>(initialFilters)

  // Fetch categories, stats, and locations once on mount
  useEffect(() => {
    fetchCategories()
    fetchStats()
    fetchLocations()
  }, []) // Empty array - only run once

  // Update filters when tab/page changes
  useEffect(() => {
    const statusFromTab = activeTab === 'all' ? undefined : activeTab
    setFilters(prev => {
      // Only update if values actually changed to prevent unnecessary re-renders
      if (prev.status === statusFromTab && prev.page === currentPage) {
        return prev
      }
      return { ...prev, status: statusFromTab, page: currentPage }
    })
  }, [activeTab, currentPage])

  // Fetch jobs when specific filter fields change
  useEffect(() => {
    fetchJobs()
  }, [filters.search, filters.category_id, filters.location, filters.employment_type, filters.status, filters.page]) // Only specific filter fields

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/careers/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
        // Removed setActiveTab() call that was causing infinite loop
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/careers/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/careers/jobs?limit=100')
      if (res.ok) {
        const data = await res.json()
        const uniqueLocations = Array.from(
          new Set((data.jobs || []).map((job: Job) => job.location))
        ).sort() as string[]
        setLocations(uniqueLocations)
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.search) queryParams.append('search', filters.search)
      if (filters.category_id) queryParams.append('category_id', filters.category_id)
      if (filters.location) queryParams.append('location', filters.location)
      if (filters.employment_type) queryParams.append('employment_type', filters.employment_type)
      if (filters.status) queryParams.append('status', filters.status)
      queryParams.append('page', (filters.page || 1).toString())
      queryParams.append('limit', (filters.limit || 10).toString())

      const res = await fetch(`/api/careers/jobs?${queryParams.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setJobs(data.jobs || [])
        setTotalPages(data.pagination?.totalPages || 1)
        setTotalJobs(data.pagination?.total || 0)
        
        // Update URL without reload
        const newUrl = `/careers/browse?${queryParams.toString()}`
        router.replace(newUrl, { scroll: false })
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }, [filters, router])

  const handleFilterChange = useCallback((newFilters: JobFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
    setCurrentPage(1)
  }, [])

  const handleTabChange = (tab: 'all' | 'active' | 'expired') => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            <JobFilter
              categories={categories}
              locations={locations}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Right Side - Job Listings */}
          <div className="lg:col-span-9">
            {/* Header with Tabs */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-heading-bold text-gray-900">All Jobs</h1>
                {totalJobs > 0 && (
                  <div className="bg-school-yellow text-gray-900 px-4 py-2 rounded-lg font-heading-semibold">
                    {totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found
                  </div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => handleTabChange('all')}
                  className={`px-4 py-2 font-heading-semibold transition-colors ${
                    activeTab === 'all'
                      ? 'bg-school-green text-white rounded-t-lg'
                      : 'text-gray-600 hover:text-school-green'
                  }`}
                >
                  All Jobs {stats && `(${stats.total})`}
                </button>
                <button
                  onClick={() => handleTabChange('active')}
                  className={`px-4 py-2 font-heading-semibold transition-colors ${
                    activeTab === 'active'
                      ? 'bg-school-blue text-white rounded-t-lg'
                      : 'text-gray-600 hover:text-school-blue'
                  }`}
                >
                  Active {stats && `(${stats.active})`}
                </button>
                <button
                  onClick={() => handleTabChange('expired')}
                  className={`px-4 py-2 font-heading-semibold transition-colors ${
                    activeTab === 'expired'
                      ? 'bg-school-red text-white rounded-t-lg'
                      : 'text-gray-600 hover:text-school-red'
                  }`}
                >
                  Expired {stats && `(${stats.expired})`}
                </button>
              </div>
            </div>

            {/* Job Listings */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-school-green"></div>
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="space-y-6 mb-8">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <div className="text-sm text-gray-600">
                      Showing page {currentPage} of {totalPages} ({totalJobs} total jobs)
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        &lt; Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-school-green text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-school-yellow text-gray-900 font-heading-semibold"
                      >
                        Next &gt;
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
                <button
                  onClick={() => {
                    setFilters({})
                    setActiveTab('all')
                    setCurrentPage(1)
                  }}
                  className="mt-4 text-school-green font-heading-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

