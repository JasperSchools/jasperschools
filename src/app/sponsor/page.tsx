'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Child } from '@/types/database.types'
import Image from 'next/image'

export default function SponsorPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'available' | 'partially_sponsored'>('all')

  useEffect(() => {
    fetchChildren()
  }, [])

  const fetchChildren = async () => {
    try {
      const res = await fetch('/api/children')
      const data = await res.json()
      // Don't show fully sponsored children on public page
      setChildren(data.filter((child: Child) => child.status !== 'fully_sponsored'))
    } catch (error) {
      console.error('Error fetching children:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredChildren = filter === 'all' 
    ? children 
    : children.filter(child => child.status === filter)

  const handleSponsor = (child: Child) => {
    // Construct DonorBox URL with child information
    const donorBoxCampaignId = process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID || 'YOUR_CAMPAIGN_ID'
    const donorBoxUrl = `https://donorbox.org/embed/${donorBoxCampaignId}?default_interval=m&amount=${child.amount_needed - child.amount_raised}&designation=${encodeURIComponent(child.name)}`
    
    // Open DonorBox in new window
    window.open(donorBoxUrl, '_blank', 'width=600,height=800')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D4723' }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold text-white mb-4">
            Sponsor a Child
          </h1>
          <p className="text-green-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-paragraph">
            Change a child&apos;s life through education. Your sponsorship provides tuition, books, 
            uniforms, and supplies to help a child reach their full potential.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-heading-medium text-gray-700">Filter:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  filter === 'all'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === 'all' ? { backgroundColor: '#0D4723' } : {}}
              >
                All Children
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  filter === 'available'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === 'available' ? { backgroundColor: '#0D4723' } : {}}
              >
                Available
              </button>
              <button
                onClick={() => setFilter('partially_sponsored')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  filter === 'partially_sponsored'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === 'partially_sponsored' ? { backgroundColor: '#0D4723' } : {}}
              >
                Partially Sponsored
              </button>
            </div>
            <div className="text-sm text-gray-600 font-paragraph">
              {filteredChildren.length} children available
            </div>
          </div>
        </div>
      </section>

      {/* Children Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0D4723' }}></div>
              <p className="mt-4 text-gray-600 font-paragraph">Loading children...</p>
            </div>
          ) : filteredChildren.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 font-paragraph">
                No children available at this time. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredChildren.map((child) => {
                const percentRaised = (child.amount_raised / child.amount_needed) * 100
                const remainingAmount = child.amount_needed - child.amount_raised

                return (
                  <div
                    key={child.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Photo */}
                    <div className="relative h-64 bg-gray-200">
                      {child.photo_url ? (
                        <Image
                          src={child.photo_url}
                          alt={child.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                          <svg
                            className="w-20 h-20 text-gray-400"
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
                      {/* Status Badge */}
                      {child.status === 'partially_sponsored' && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-heading-semibold">
                            Partially Sponsored
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-heading-bold text-school-blue mb-2">
                          {child.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 font-paragraph">
                          {child.age && <span>Age {child.age}</span>}
                          {child.age && <span>•</span>}
                          <span>{child.class_year}</span>
                          {child.location && (
                            <>
                              <span>•</span>
                              <span>{child.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {child.interests && (
                        <div className="mb-4">
                          <p className="text-sm font-heading-medium text-gray-700 mb-1">
                            Interests:
                          </p>
                          <p className="text-sm text-gray-600 font-paragraph">{child.interests}</p>
                        </div>
                      )}

                      <p className="text-gray-700 font-paragraph mb-6 line-clamp-3">
                        {child.bio}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm font-heading-medium text-gray-700 mb-2">
                          <span>Progress</span>
                          <span>{percentRaised.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(percentRaised, 100)}%`, backgroundColor: '#0D4723' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 font-paragraph mt-2">
                          <span>${child.amount_raised.toFixed(2)} raised</span>
                          <span>${child.amount_needed.toFixed(2)} goal</span>
                        </div>
                      </div>

                      {/* Sponsor Button */}
                      <button
                        onClick={() => handleSponsor(child)}
                        className="w-full bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Sponsor {child.name} - ${remainingAmount.toFixed(2)}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-school-blue mb-4">
              How Sponsorship Works
            </h2>
            <p className="text-lg text-gray-600 font-paragraph max-w-3xl mx-auto">
              Your support makes a direct impact on a child&apos;s education and future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-heading-bold" style={{ backgroundColor: '#0D4723' }}>
                1
              </div>
              <h3 className="text-xl font-heading-bold text-school-blue mb-2">
                Choose a Child
              </h3>
              <p className="text-gray-600 font-paragraph">
                Browse through the children and select one whose story touches your heart.
              </p>
            </div>

            <div className="text-center">
              <div className="text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-heading-bold" style={{ backgroundColor: '#0D4723' }}>
                2
              </div>
              <h3 className="text-xl font-heading-bold text-school-blue mb-2">
                Make a Donation
              </h3>
              <p className="text-gray-600 font-paragraph">
                Contribute any amount towards their education. You can give once or monthly.
              </p>
            </div>

            <div className="text-center">
              <div className="text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-heading-bold" style={{ backgroundColor: '#0D4723' }}>
                3
              </div>
              <h3 className="text-xl font-heading-bold text-school-blue mb-2">
                See the Impact
              </h3>
              <p className="text-gray-600 font-paragraph">
                Your contribution directly funds their tuition, books, uniforms, and school supplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

