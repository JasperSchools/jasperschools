'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JobStats from '@/components/careers/JobStats'
import JobCard from '@/components/careers/JobCard'
import { Job, JobStats as Stats } from '@/types/careers'
import { motion } from 'framer-motion'

export default function CareersPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchFeaturedJobs()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/careers/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchFeaturedJobs = async () => {
    try {
      const res = await fetch('/api/careers/jobs?featured=true&limit=3&status=active')
      if (res.ok) {
        const data = await res.json()
        setFeaturedJobs(data.jobs || [])
      }
    } catch (error) {
      console.error('Error fetching featured jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-school-green via-[#1a5c34] to-school-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/jps2.jpeg')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold mb-6">
              Discover Your Dream <span className="text-school-yellow">Career</span>
            </h1>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto font-paragraph">
              Join a community of innovators and find opportunities that match your passion and skills.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by job title, keyword, or location..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        window.location.href = `/careers/browse?search=${(e.target as HTMLInputElement).value}`
                      }
                    }}
                  />
                </div>
                <Link
                  href="/careers/browse"
                  className="bg-school-yellow text-gray-900 px-8 py-4 rounded-lg font-heading-semibold hover:bg-yellow-400 transition-colors whitespace-nowrap"
                >
                  Search Jobs
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers/browse"
                className="inline-flex items-center justify-center bg-school-yellow text-gray-900 px-8 py-4 rounded-lg font-heading-semibold hover:bg-yellow-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v6a2 2 0 002 2h4a2 2 0 002-2V6" />
                </svg>
                Explore Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-12 bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <JobStats stats={stats} />
          </div>
        </section>
      )}

      {/* Featured Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Featured Opportunities
              </h2>
              <p className="text-gray-600 text-lg">
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

