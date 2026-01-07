'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApplicationForm from '@/components/careers/ApplicationForm'
import { Job, JobApplicationInsert } from '@/types/careers'
import { formatDate, formatEmploymentType, isJobExpired } from '@/lib/careers/utils'

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (jobId) {
      fetchJob()
    }
  }, [jobId])

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/careers/jobs/${jobId}`)
      if (res.ok) {
        const data = await res.json()
        setJob(data)
      } else if (res.status === 404) {
        router.push('/careers/browse')
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: JobApplicationInsert) => {
    try {
      const res = await fetch('/api/careers/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          job_id: jobId,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to submit application')
      }

      // Redirect to success page
      router.push(`/careers/apply-success?jobId=${jobId}`)
    } catch (error) {
      throw error
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-24">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-school-green"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-24">
          <h1 className="text-2xl font-heading-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link href="/careers/browse" className="text-school-green hover:underline">
            Return to Browse Jobs
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const expired = isJobExpired(job.deadline)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        {/* Back Button */}
        <Link
          href={`/careers/browse/${job.slug || job.id}`}
          className="inline-flex items-center text-school-green hover:text-school-green/80 mb-6 font-heading-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job Details
        </Link>

        {expired ? (
          <div className="bg-white rounded-lg border border-red-200 p-8 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-school-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-heading-bold text-gray-900 mb-2">Application Deadline Has Passed</h1>
            <p className="text-gray-600 mb-6 font-paragraph">
              The deadline for this position was {formatDate(job.deadline)}. Applications are no longer being accepted.
            </p>
            <Link
              href="/careers/browse"
              className="inline-flex items-center bg-school-green text-white px-6 py-3 rounded-lg font-heading-semibold hover:bg-green-700 transition-colors"
            >
              Browse Other Opportunities
            </Link>
          </div>
        ) : (
          <>
            {/* Job Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Apply for {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v6a2 2 0 002 2h4a2 2 0 002-2V6" />
                      </svg>
                      {formatEmploymentType(job.employment_type)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Deadline:</strong> {formatDate(job.deadline)} at 5pm East Africa Time
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Application Form</h2>
              <ApplicationForm job={job} onSubmit={handleSubmit} />
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}

