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

export default function JobDetailClient({ slug }: { slug: string }) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchJob()
    }
  }, [slug])

  const fetchJob = async () => {
    if (!FEATURES.ENABLE_DATABASE) {
      const found = sampleJobs.find(j => j.slug === slug || j.id === slug)
      if (found) {
        setJob(found)
      } else {
        router.push('/careers/browse')
      }
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/careers/jobs/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setJob(data)
      } else if (res.status === 404) {
        const found = sampleJobs.find(j => j.slug === slug || j.id === slug)
        if (found) {
          setJob(found)
        } else {
          router.push('/careers/browse')
        }
      }
    } catch (error) {
      console.error('Error fetching job:', error)
      const found = sampleJobs.find(j => j.slug === slug || j.id === slug)
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
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        {/* Back Button */}
        <Link
          href="/careers/browse"
          className="inline-flex items-center text-school-green hover:text-school-green/80 mb-6 font-heading-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        {/* Job Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-4 py-2 bg-school-green/10 text-school-green text-sm font-heading-semibold rounded-lg">
              {formatEmploymentType(job.employment_type)}
            </span>
            {job.featured && (
              <span className="inline-block px-4 py-2 bg-school-yellow/20 text-gray-900 text-sm font-heading-semibold rounded-lg">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading-bold text-gray-900 mb-4">
            {job.title}
          </h1>

          <div className="space-y-3 text-gray-600 mb-6">
            {job.category && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium">{job.category.name}</span>
              </div>
            )}
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={`font-heading-medium ${expired ? 'text-school-red' : ''}`}>
                Deadline: {formatDate(job.deadline)}
                {expired && ' (Expired)'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <a
              href={`mailto:${job.application_email}?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
              className="flex-1 bg-school-yellow text-gray-900 px-6 py-3 rounded-lg text-center font-heading-semibold hover:bg-yellow-400 transition-colors"
            >
              {expired ? 'Application Closed' : 'Apply Via Email'}
            </a>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-6">
          <div className="prose max-w-none">
            {job.about_organization && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About The Organization</h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.about_organization}
                </div>
              </section>
            )}

            {job.position_details && Object.keys(job.position_details).length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Position Details</h2>
                <div className="text-gray-700">
                  {Object.entries(job.position_details).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}: </span>
                      <span>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </section>

            {job.key_responsibilities && job.key_responsibilities.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.key_responsibilities.map((responsibility, index) => (
                    <li key={index} className="leading-relaxed">{responsibility}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications & Experience</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index} className="leading-relaxed">{qualification}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="leading-relaxed">{requirement}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
              {job.application_instructions ? (
                <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                  {job.application_instructions}
                </div>
              ) : (
                <div className="text-gray-700 space-y-2 mb-4">
                  <p>Interested candidates should submit their CV, academic documents, and a cover letter explaining their suitability for the role.</p>
                </div>
              )}
              
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${job.application_email}`} className="text-school-green hover:underline">
                    {job.application_email}
                  </a>
                </p>
                {job.application_whatsapp && (
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/${job.application_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-school-green hover:underline">
                      {job.application_whatsapp}
                    </a>
                  </p>
                )}
                <p className={`font-heading-semibold ${expired ? 'text-school-red' : 'text-gray-900'}`}>
                  Deadline: {formatDate(job.deadline)} at 5pm East Africa Time
                  {expired && ' (Expired)'}
                </p>
                <p className="text-sm text-gray-600 italic">
                  Only shortlisted candidates will be contacted.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
