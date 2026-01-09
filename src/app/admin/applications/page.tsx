'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { JobApplication, ApplicationStatus } from '@/types/careers'

type StatusFilter = 'all' | ApplicationStatus

export default function ApplicationsAdminPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  useEffect(() => {
    const adminPassword = sessionStorage.getItem('adminPassword')
    if (!adminPassword) {
      router.push('/admin')
      return
    }

    const fetchApplications = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (statusFilter !== 'all') {
          params.append('status', statusFilter)
        }

        const res = await fetch(`/api/careers/applications?${params.toString()}`, {
          headers: {
            'x-admin-password': adminPassword,
          },
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Failed to load applications (${res.status})`)
        }

        const data: JobApplication[] = await res.json()
        setApplications(data || [])
      } catch (err) {
        console.error('Error loading applications:', err)
        setError(err instanceof Error ? err.message : 'Failed to load applications')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [router, statusFilter])

  const statusOptions: StatusFilter[] = ['all', 'pending', 'reviewing', 'shortlisted', 'rejected', 'hired']

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading-bold text-gray-900">Job Applications</h1>
            <p className="mt-1 text-sm text-gray-600 font-paragraph">
              View applications submitted through the careers portal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 font-heading-medium" htmlFor="status-filter">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 flex justify-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-school-green" />
            </div>
          ) : error ? (
            <div className="py-10 px-4 sm:px-6 text-center">
              <p className="text-sm text-red-600 font-paragraph mb-2">{error}</p>
              <p className="text-xs text-gray-500">
                Check your admin password in <code>sessionStorage</code> or try again.
              </p>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-10 px-4 sm:px-6 text-center">
              <p className="text-sm text-gray-600 font-paragraph">
                No applications found for this filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-heading-semibold text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-heading-semibold text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-heading-semibold text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-heading-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-heading-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                        <div className="text-sm font-heading-medium text-gray-900">
                          {app.first_name} {app.last_name}
                        </div>
                        <div className="text-xs text-gray-500 font-paragraph">
                          {app.email}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-paragraph">
                          {app.job?.title || '—'}
                        </div>
                        <div className="text-xs text-gray-500 font-paragraph">
                          {app.job?.location}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm text-gray-600 font-paragraph">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading-medium ${
                            app.status === 'pending'
                              ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                              : app.status === 'reviewing'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : app.status === 'shortlisted'
                              ? 'bg-green-50 text-green-800 border border-green-200'
                              : app.status === 'hired'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-right text-sm">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="text-school-green hover:text-green-800 font-heading-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

