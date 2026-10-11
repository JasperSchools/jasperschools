'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JobCard from '@/components/careers/JobCard'
import { Job } from '@/types/careers'
import { motion } from 'framer-motion'
import { FEATURES } from '@/config/features'
import { sampleJobs } from '@/data/careers'

export default function CareersPage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedJobs()
  }, [])

  const fetchFeaturedJobs = async () => {
    if (!FEATURES.ENABLE_DATABASE) {
      setFeaturedJobs(sampleJobs.filter(j => j.featured && j.status === 'active'))
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/careers/jobs?featured=true&limit=3&status=active')
      if (res.ok) {
        const data = await res.json()
        setFeaturedJobs(data.jobs || [])
      } else {
        setFeaturedJobs(sampleJobs.filter(j => j.featured && j.status === 'active'))
      }
    } catch (error) {
      console.error('Error fetching featured jobs:', error)
      setFeaturedJobs(sampleJobs.filter(j => j.featured && j.status === 'active'))
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
            <div className="w-16 h-16 bg-school-green/10 text-school-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-4">
              Careers Portal Offline
            </h1>
            <p className="text-gray-600 font-paragraph mb-8 leading-relaxed">
              We do not currently have active job openings posted. If you are passionate about transformative rural education and would like to get involved, please explore our volunteer opportunities or contact us.
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

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold text-gray-900 mb-4 sm:mb-6">
              Discover Your Next Opportunity
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-paragraph">
              Join Jasper Schools and help shape transformative education in rural Uganda.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search by job title, keyword, or location"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-school-green focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          window.location.href = `/careers/browse?search=${encodeURIComponent((e.target as HTMLInputElement).value)}`
                        }
                      }}
                    />
                  </div>
                  <Link
                    href="/careers/browse"
                    className="inline-flex items-center justify-center bg-school-green text-white px-6 sm:px-8 py-3 rounded-lg font-heading-semibold text-sm sm:text-base hover:bg-green-800 transition-colors whitespace-nowrap"
                  >
                    Search Jobs
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-bold text-gray-900 mb-2">
                Featured Opportunities
              </h2>
              <p className="text-gray-600 text-sm sm:text-base font-paragraph">
                Discover positions that match your skills and aspirations.
              </p>
            </div>
            <Link
              href="/careers/browse"
              className="hidden sm:inline-flex items-center text-school-green font-heading-semibold hover:text-school-green/80 transition-colors"
            >
              View All Jobs
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-school-green"></div>
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p>No featured jobs available at the moment.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/careers/browse"
              className="inline-flex items-center bg-school-yellow text-gray-900 px-8 py-4 rounded-lg font-heading-semibold hover:bg-yellow-400 transition-colors"
            >
              Explore All Opportunities
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

