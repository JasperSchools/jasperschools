'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Job } from '@/types/careers'
import { formatDate, formatEmploymentType, isJobExpired } from '@/lib/careers/utils'
import { FEATURES } from '@/config/features'
import { sampleJobs } from '@/data/careers'

export default function ApplyClient({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (jobId) {
      fetchJob()
    }
  }, [jobId])

  const fetchJob = async () => {
    if (!FEATURES.ENABLE_DATABASE) {
      const found = sampleJobs.find(j => j.id === jobId || j.slug === jobId)
      if (found) {
        setJob(found)
      } else {
        router.push('/careers/browse')
      }
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/careers/jobs/${jobId}`)
      if (res.ok) {
        const data = await res.json()
        setJob(data)
      } else if (res.status === 404) {
        const found = sampleJobs.find(j => j.id === jobId || j.slug === jobId)
        if (found) {
          setJob(found)
        } else {
          router.push('/careers/browse')
        }
      }
    } catch (error) {
      console.error('Error fetching job:', error)
      const found = sampleJobs.find(j => j.id === jobId || j.slug === jobId)
      if (found) {
        setJob(found)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!FEATURES.ENABLE_CAREERS) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <section className="py-24 sm:py-32 bg-white text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-4">
              Careers Portal Offline
            </h1>
            <p className="text-gray-600 font-paragraph mb-8 leading-relaxed">
              We do not currently have active job openings posted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {FEATURES.ENABLE_VOLUNTEER ? (
                <Link
                  href="/volunteer"
                  className="bg-school-green hover:bg-green-700 text-white font-heading-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Volunteer With Us
                </Link>
              ) : (
                <Link
                  href="/about/our-story"
                  className="bg-school-green hover:bg-green-700 text-white font-heading-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Our Story
                </Link>
              )}
              {FEATURES.ENABLE_CONTACT ? (
                <Link
                  href="/#contact"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 font-heading-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Contact Us
                </Link>
              ) : (
                <Link
                  href="/programs"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 font-heading-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Our Programs
                </Link>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link
          href={`/careers/browse/${job.slug || job.id}`}
          className="inline-flex items-center text-school-green hover:text-school-green/80 mb-6 font-heading-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job Details
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading-bold text-gray-900 mb-2">
            Apply for {job.title}
          </h1>
          <p className="text-gray-600 font-paragraph mb-6">
            {formatEmploymentType(job.employment_type)} • {job.location} • Deadline: {formatDate(job.deadline)}
          </p>

          <div className="border-t border-gray-200 pt-6 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="text-lg font-heading-bold text-school-green mb-2">
                Application Instructions
              </h2>
              <p className="text-gray-700 font-paragraph text-sm sm:text-base leading-relaxed mb-4">
                {job.application_instructions || 'Please submit your CV/resume, cover letter, and relevant academic documents directly to our team via email.'}
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Application Email:</strong>{' '}
                  <a href={`mailto:${job.application_email}`} className="text-school-green font-medium underline">
                    {job.application_email}
                  </a>
                </p>
                {job.application_whatsapp && (
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/${job.application_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-school-green font-medium underline">
                      {job.application_whatsapp}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <a
                href={`mailto:${job.application_email}?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
                className="inline-flex items-center justify-center bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold rounded-full px-8 py-3.5 text-base sm:text-lg transition-colors"
              >
                Send Application via Email
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
