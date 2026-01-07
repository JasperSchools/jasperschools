'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Job } from '@/types/careers'

function ApplySuccessContent() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const [job, setJob] = useState<Job | null>(null)

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
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-24">
      <div className="bg-white rounded-lg border border-gray-200 p-8 lg:p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-school-green/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-heading-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h1>

        {job && (
          <p className="text-lg text-gray-600 mb-8 font-paragraph">
            Thank you for applying to the <strong>{job.title}</strong> position.
          </p>
        )}

        <p className="text-gray-700 mb-8 leading-relaxed font-paragraph">
          We have received your application and will review it carefully. 
          Only shortlisted candidates will be contacted for the next steps in the selection process.
        </p>

        {job && (
          <div className="bg-school-green/10 border border-school-green/30 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-heading-semibold text-gray-900 mb-3">What's Next?</h2>
            <ul className="space-y-2 text-gray-700 font-paragraph">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-school-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>We will review all applications and shortlist qualified candidates.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-school-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Shortlisted candidates will be contacted via email or phone.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 text-school-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>The selection process may include interviews and assessments.</span>
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/careers/browse"
            className="inline-flex items-center justify-center bg-school-green text-white px-8 py-3 rounded-lg font-heading-semibold hover:bg-green-700 transition-colors"
          >
            Browse More Opportunities
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-heading-semibold hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ApplySuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-24">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-school-green"></div>
          </div>
        </div>
      }>
        <ApplySuccessContent />
      </Suspense>
      <Footer />
    </main>
  )
}

