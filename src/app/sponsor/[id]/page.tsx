'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Child } from '@/types/database.types'
import Image from 'next/image'

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [child, setChild] = useState<Child | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDonorBox, setShowDonorBox] = useState(false)

  const fetchChild = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/children/${id}`)
      if (!res.ok) {
        throw new Error('Child not found')
      }
      const data = await res.json()
      
      // Check if child is archived
      if (data.archived) {
        router.push('/sponsor')
        return
      }
      
      setChild(data)
    } catch (error) {
      console.error('Error fetching child:', error)
      router.push('/sponsor')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (params.id) {
      fetchChild(params.id as string)
    }
  }, [params.id, fetchChild])

  // Log iframe URL when DonorBox form is shown (for debugging)
  useEffect(() => {
    if (showDonorBox && child) {
      const childName = `${child.first_name} ${child.last_name}`
      const designation = `${childName} (ID: ${child.id})`
      const remainingAmount = child.amount_needed - child.amount_raised
      const campaignId = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID || 'YOUR_CAMPAIGN_ID'
      const iframeUrl = `https://donorbox.org/embed/${campaignId}?default_interval=m&amount=${remainingAmount}&designation=${encodeURIComponent(designation)}`
      console.log('🔍 DonorBox iframe URL:', iframeUrl)
      console.log('📋 Designation being sent:', designation)
      console.log('🆔 Child ID:', child.id)
    }
  }, [showDonorBox, child])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0D4723' }}></div>
          <p className="ml-4 text-gray-600 font-paragraph">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!child) {
    return null
  }

  const childName = `${child.first_name} ${child.last_name}`
  // Include child ID in designation for manual tracking when processing donations
  const designation = `${childName} (ID: ${child.id})`
  const percentRaised = (child.amount_raised / child.amount_needed) * 100
  const remainingAmount = child.amount_needed - child.amount_raised
  const donorBoxCampaignId = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID || 'YOUR_CAMPAIGN_ID'

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/sponsor')}
            className="flex items-center text-school-green hover:text-green-700 font-heading-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Children
          </button>
        </div>
      </div>

      {/* Student Profile Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Student Info */}
            <div>
              {/* Photo */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-96 bg-gray-200">
                  {child.photo_url ? (
                    <Image
                      src={child.photo_url}
                      alt={childName}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                      <svg
                        className="w-32 h-32 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-heading-bold text-school-blue mb-4">
                  {childName}
                </h1>
                
                <div className="space-y-3 text-gray-700">
                  {child.age && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-paragraph"><strong className="font-heading-medium">Age:</strong> {child.age} years old</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-paragraph"><strong className="font-heading-medium">Class:</strong> {child.class_year}</span>
                  </div>
                  
                  {child.location && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-paragraph"><strong className="font-heading-medium">Location:</strong> {child.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interests Card */}
              {child.interests && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-heading-bold text-school-blue mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Interests & Hobbies
                  </h2>
                  <p className="text-gray-700 font-paragraph">{child.interests}</p>
                </div>
              )}

              {/* Bio Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-heading-bold text-school-blue mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About {child.first_name}
                </h2>
                <div className="text-gray-700 font-paragraph whitespace-pre-line leading-relaxed">
                  {child.bio}
                </div>
              </div>
            </div>

            {/* Right Column - Donation Section */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Funding Progress Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-heading-bold text-school-blue mb-4">
                  Sponsorship Progress
                </h2>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-heading-medium text-gray-700 mb-2">
                    <span>Progress</span>
                    <span>{percentRaised.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentRaised, 100)}%`, backgroundColor: '#0D4723' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-paragraph mt-2">
                    <span>${child.amount_raised.toFixed(2)} raised</span>
                    <span>${child.amount_needed.toFixed(2)} goal</span>
                  </div>
                </div>

                {/* Remaining Amount */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 font-paragraph mb-1">Remaining Amount Needed:</p>
                  <p className="text-3xl font-heading-bold text-school-green">
                    ${remainingAmount.toFixed(2)}
                  </p>
                </div>

                {/* Show DonorBox Button */}
                {!showDonorBox && (
                  <button
                    onClick={() => setShowDonorBox(true)}
                    className="w-full bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-lg"
                  >
                    Sponsor {child.first_name} Now
                  </button>
                )}
              </div>

              {/* DonorBox Embedded Form */}
              {showDonorBox && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-heading-bold text-school-blue">
                      Make Your Donation
                    </h2>
                    <button
                      onClick={() => setShowDonorBox(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Close donation form"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* DonorBox Iframe */}
                  <div className="relative w-full" style={{ minHeight: '600px' }}>
                    <iframe
                      src={`https://donorbox.org/embed/${donorBoxCampaignId}?default_interval=m&amount=${remainingAmount}&designation=${encodeURIComponent(designation)}`}
                      name="donorbox"
                      seamless
                      frameBorder="0"
                      scrolling="no"
                      className="w-full"
                      style={{ 
                        minHeight: '600px',
                        maxWidth: '100%',
                      }}
                      allow="payment"
                    />
                  </div>
                </div>
              )}

              {/* Why Sponsor Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-lg font-heading-bold text-school-blue mb-4">
                  Your Sponsorship Provides:
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-school-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-paragraph">School tuition and fees</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-school-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-paragraph">School uniform</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-school-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-paragraph">Textbooks and learning materials</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-school-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-paragraph">School supplies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-school-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-paragraph">Educational support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Initially Empty, Shows DonorBox when clicked */}
            <div>
              {/* Moved to left column sticky section */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

