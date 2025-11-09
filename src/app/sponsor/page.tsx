'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Child } from '@/types/database.types'
import Image from 'next/image'

export default function SponsorPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [modal, setModal] = useState<{
    isOpen: boolean
    type: 'error' | 'info'
    title: string
    message: string
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  })

  const CLASS_OPTIONS = [
    { value: 'all', label: 'All Classes' },
    { value: 'Baby Class', label: 'Baby Class (KG)' },
    { value: 'Middle Class', label: 'Middle Class (KG)' },
    { value: 'Top Class', label: 'Top Class (KG)' },
    { value: 'P1', label: 'Primary 1' },
    { value: 'P2', label: 'Primary 2' },
    { value: 'P3', label: 'Primary 3' },
    { value: 'P4', label: 'Primary 4' },
    { value: 'P5', label: 'Primary 5' },
    { value: 'P6', label: 'Primary 6' },
    { value: 'P7', label: 'Primary 7' },
  ]

  const AGE_RANGES = [
    { value: 'all', label: 'All Ages' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-8', label: '6-8 years' },
    { value: '9-11', label: '9-11 years' },
    { value: '12-14', label: '12-14 years' },
    { value: '15+', label: '15+ years' },
  ]

  useEffect(() => {
    fetchChildren()
  }, [])

  const showModal = (type: 'error' | 'info', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message })
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const fetchChildren = async () => {
    try {
      const res = await fetch('/api/children')
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()
      
      // Check if data needs migration
      if (data.length > 0 && !data[0].hasOwnProperty('first_name')) {
        console.error('⚠️ DATABASE MIGRATION REQUIRED!')
        console.error('Please run database-migration-2024.sql in your Supabase SQL Editor')
        showModal('error', 'Database Migration Required', 'Please run database-migration-2024.sql in Supabase. Check the browser console for details.')
        setLoading(false)
        return
      }
      
      // Only show non-archived children on public page
      setChildren(data.filter((child: Child) => !child.archived))
    } catch (error) {
      console.error('Error fetching children:', error)
      showModal('error', 'Error Loading Children', 'Failed to load children. Please check the console for details.')
    } finally {
      setLoading(false)
    }
  }

  const filterByAge = (child: Child) => {
    if (ageFilter === 'all' || !child.age) return true
    
    const age = child.age
    if (ageFilter === '3-5') return age >= 3 && age <= 5
    if (ageFilter === '6-8') return age >= 6 && age <= 8
    if (ageFilter === '9-11') return age >= 9 && age <= 11
    if (ageFilter === '12-14') return age >= 12 && age <= 14
    if (ageFilter === '15+') return age >= 15
    return true
  }

  const filteredChildren = children
    .filter(child => classFilter === 'all' || child.class_year === classFilter)
    .filter(filterByAge)


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
          <div className="flex flex-wrap items-center gap-4">
              {/* Age Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-heading-medium text-gray-700">Age:</label>
                <div className="relative">
                  <select
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="appearance-none bg-white text-gray-900 pl-3 pr-10 py-2 border border-gray-300 rounded-lg font-paragraph text-sm focus:ring-2 focus:ring-school-green focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors"
                    style={{ color: '#111827' }}
                  >
                    {AGE_RANGES.map((range) => (
                      <option key={range.value} value={range.value} className="bg-white text-gray-900 py-2">
                        {range.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-heading-medium text-gray-700">Class:</label>
                <div className="relative">
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="appearance-none bg-white text-gray-900 pl-3 pr-10 py-2 border border-gray-300 rounded-lg font-paragraph text-sm focus:ring-2 focus:ring-school-green focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors"
                    style={{ color: '#111827' }}
                  >
                    {CLASS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-white text-gray-900 py-2">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

            {/* Results Count */}
            <div className="ml-auto text-sm text-gray-600 font-paragraph">
              {filteredChildren.length} children need sponsorship
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
                          alt={child.first_name ? `${child.first_name} ${child.last_name}` : (child as any).name || 'Student'}
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
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-2xl font-heading-bold text-school-blue mb-2">
                          {child.first_name ? `${child.first_name} ${child.last_name}` : (child as any).name || 'Student'}
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

                      <p className="text-gray-700 font-paragraph mb-6 line-clamp-1">
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

                      {/* Learn More & Sponsor Button */}
                      <a
                        href={`/sponsor/${child.id}`}
                        className="w-full bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-center block"
                      >
                        Learn More & Sponsor {child.first_name || (child as any).name?.split(' ')[0] || 'Student'}
                      </a>
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

      {/* Custom Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scale-in">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4" style={{
                backgroundColor: modal.type === 'error' ? '#FDE8E8' : '#E0E7FF'
              }}>
                {modal.type === 'error' ? (
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-heading-bold text-gray-900 mb-2">
                  {modal.title}
                </h3>
                <p className="text-sm text-gray-600 font-paragraph whitespace-pre-line">
                  {modal.message}
                </p>
              </div>

              {/* Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded-lg font-heading-medium transition-colors text-white hover:bg-green-700"
                  style={{ backgroundColor: '#0D4723' }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </main>
  )
}

