'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function VolunteerPage() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Volunteer With Us
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Share your time and skills to help us create meaningful change in the lives of children and families. Your contribution makes a lasting impact on our community.
          </motion.p>
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
                style={{ background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '0.5rem', minHeight: '533px' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

