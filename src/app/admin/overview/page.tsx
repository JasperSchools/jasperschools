'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FEATURES } from '@/config/features'

export default function AdminOverview() {
  const router = useRouter()

  if (!FEATURES.ENABLE_ADMIN) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-heading-bold text-gray-900 mb-2">Admin Portal Disabled</h1>
          <p className="text-gray-600 font-paragraph text-sm mb-6">
            The admin management portal is currently disabled.
          </p>
          <Link
            href="/"
            className="inline-block bg-school-green hover:bg-green-700 text-white font-heading-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    )
  }

  useEffect(() => {
    const adminPassword = sessionStorage.getItem('adminPassword')
    if (!adminPassword) {
      router.push('/admin')
    }
  }, [router])

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 font-paragraph max-w-2xl">
            Manage Jasper Schools content and review job applications from a single place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/admin/dashboard"
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-heading-bold text-gray-900 mb-1">
              Children & Sponsorship
            </h2>
            <p className="text-sm text-gray-600 font-paragraph">
              Manage sponsored children profiles, photos, and sponsorship details.
            </p>
          </Link>

          <Link
            href="/admin/applications"
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-heading-bold text-gray-900 mb-1">
              Job Applications
            </h2>
            <p className="text-sm text-gray-600 font-paragraph">
              Review applications submitted through the careers portal.
            </p>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}

