'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function VolunteerPage() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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

