'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FEATURES } from '@/config/features'

export default function VolunteerPage() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  if (!FEATURES.ENABLE_VOLUNTEER) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="py-24 sm:py-32 bg-gray-50 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-school-green/10 text-school-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-4">
              Volunteer Applications Closed
            </h1>
            <p className="text-gray-600 font-paragraph mb-8 leading-relaxed">
              We are not currently onboarding new volunteers at this time. If you would like to learn more about our school, please explore our story and educational programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about/our-story"
                className="bg-school-green hover:bg-green-700 text-white font-heading-semibold px-6 py-3 rounded-full transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/programs"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-heading-semibold px-6 py-3 rounded-full transition-colors"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Volunteer With Us
          </motion.h1>
          <div className="text-green-100 text-sm sm:text-base max-w-3xl mx-auto font-paragraph">
            {['Share', 'your', 'time', 'and', 'skills', 'to', 'help', 'us', 'create', 'meaningful', 'change', 'in', 'the', 'lives', 'of', 'children', 'and', 'families.'].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + (index * 0.15),
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl font-heading text-gray-900 mb-6">
              Get Started
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-paragraph mb-8 leading-relaxed">
              Fill out the form below to express your interest in volunteering with us. We'll get back to you soon!
            </p>
            
            {/* Airtable Form Embed */}
            <div className="w-full">
              <iframe
                className="airtable-embed"
                src="https://airtable.com/embed/appcsNKvpmgQ8XxBt/pagL6cTxkqbZSI54s/form"
                frameBorder="0"
                width="100%"
                height="533"
                style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: '0.5rem' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}

