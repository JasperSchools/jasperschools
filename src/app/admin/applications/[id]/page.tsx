'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { JobApplication } from '@/types/careers'

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [application, setApplication] = useState<JobApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const adminPassword = sessionStorage.getItem('adminPassword')
    if (!adminPassword) {
      router.push('/admin')
      return
    }

    const fetchApplication = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/careers/applications/${id}`, {
          headers: {
            'x-admin-password': adminPassword,
          },
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Failed to load application (${res.status})`)
        }

        const data: JobApplication = await res.json()
        setApplication(data)
      } catch (err) {
        console.error('Error loading application:', err)
        setError(err instanceof Error ? err.message : 'Failed to load application')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchApplication()
    }
  }, [id, router])

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="mb-4">
          <Link
            href="/admin/applications"
            className="inline-flex items-center text-sm text-school-green hover:text-green-800 font-heading-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to applications
          </Link>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-school-green" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <h1 className="text-lg font-heading-bold text-red-700 mb-2">Unable to load application</h1>
            <p className="text-sm text-red-600 font-paragraph">{error}</p>
          </div>
        ) : !application ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <p className="text-sm text-gray-600 font-paragraph">Application not found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-heading-bold text-gray-900 mb-1">
                    {application.first_name} {application.last_name}
                  </h1>
                  <p className="text-sm text-gray-600 font-paragraph">
                    Applied for{' '}
                    <span className="font-heading-medium text-gray-900">
                      {application.job?.title || 'Unknown position'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs text-gray-500 font-paragraph">
                    Submitted {formatDateTime(application.created_at)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-heading-medium ${
                      application.status === 'pending'
                        ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        : application.status === 'reviewing'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : application.status === 'shortlisted'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : application.status === 'hired'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm font-paragraph text-gray-700">
                <div>
                  <p className="text-xs uppercase text-gray-500 mb-1">Email</p>
                  <a
                    href={`mailto:${application.email}`}
                    className="text-school-green hover:text-green-800 break-all"
                  >
                    {application.email}
                  </a>
                </div>
                {application.phone && (
                  <div>
                    <p className="text-xs uppercase text-gray-500 mb-1">Phone</p>
                    <p>{application.phone}</p>
                  </div>
                )}
                {application.whatsapp && (
                  <div>
                    <p className="text-xs uppercase text-gray-500 mb-1">WhatsApp</p>
                    <p>{application.whatsapp}</p>
                  </div>
                )}
                {application.job?.location && (
                  <div>
                    <p className="text-xs uppercase text-gray-500 mb-1">Location</p>
                    <p>{application.job.location}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-heading-bold text-gray-900">Documents</h2>
              <div className="space-y-3 text-sm font-paragraph text-gray-700">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading-medium text-gray-900">Cover Letter</p>
                    <p className="text-xs text-gray-500">
                      {application.cover_letter_filename || 'Uploaded file'}
                    </p>
                  </div>
                  {application.cover_letter_url ? (
                    <a
                      href={application.cover_letter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-school-green font-heading-medium hover:text-green-800"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">Not provided</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading-medium text-gray-900">CV / Resume</p>
                    <p className="text-xs text-gray-500">
                      {application.cv_filename || 'Uploaded file'}
                    </p>
                  </div>
                  {application.cv_url ? (
                    <a
                      href={application.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-school-green font-heading-medium hover:text-green-800"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">Not provided</span>
                  )}
                </div>

                {application.academic_documents_url && application.academic_documents_url.length > 0 && (
                  <div>
                    <p className="font-heading-medium text-gray-900 mb-1">Academic Documents</p>
                    <ul className="space-y-1 text-sm">
                      {application.academic_documents_url.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-school-green hover:text-green-800"
                          >
                            Document {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

