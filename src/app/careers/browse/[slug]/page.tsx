'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Job } from '@/types/careers'
import { formatDate, formatEmploymentType, isJobExpired } from '@/lib/careers/utils'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchJob()
    }
  }, [slug])

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/careers/jobs/${slug}`)
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
            {job.application_count !== undefined && job.application_count > 0 && (
              <div className="flex items-center text-school-green">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="font-heading-medium">
                  {job.application_count} {job.application_count === 1 ? 'person has' : 'people have'} applied
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Link
              href={`/careers/apply/${job.id}`}
              className="flex-1 bg-school-blue text-white px-6 py-3 rounded-lg text-center font-heading-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={expired}
            >
              View Details
            </Link>
            <Link
              href={`/careers/apply/${job.id}`}
              className="flex-1 bg-school-yellow text-gray-900 px-6 py-3 rounded-lg text-center font-heading-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={expired}
            >
              {expired ? 'Application Closed' : 'Apply Now'}
            </Link>
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

        {/* Apply CTA */}
        {!expired && (
          <div className="text-center">
            <Link
              href={`/careers/apply/${job.id}`}
              className="inline-flex items-center bg-school-yellow text-gray-900 px-8 py-4 rounded-lg font-heading-semibold hover:bg-yellow-400 transition-colors text-lg"
            >
              Apply Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

