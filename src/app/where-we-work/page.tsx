'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function WhereWeWorkPage() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where We Work
          </motion.h1>
          <motion.p
            className="text-green-100 text-base sm:text-lg max-w-3xl mx-auto font-paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering communities through education in Western Uganda
          </motion.p>
        </div>
      </section>

      {/* Location Details Section */}
      <LocationSection />

      {/* Our Impact in Uganda Section */}
      <ImpactSection />

      {/* Contact Section */}
      <ContactSection />

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}

// Location Section Component
function LocationSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-school-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-school-yellow/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div 
              className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-tr-[3rem] overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/teampage/team_a.jpg"
                alt="Jasper Primary School in Nyairongo village"
                fill
                className="object-cover"
                style={{ objectPosition: 'center center' }}
              />
            </motion.div>
          </div>

          {/* Right Side - Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left mb-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
                Nyairongo Village, Kikuube District
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 font-paragraph">
                Western Uganda
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed font-paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>
                Jasper Primary School is located in Nyairongo village, Kikuube District, Western Uganda. This rural community is where we focus our efforts to provide quality education and empower children and families.
              </p>
              <p>
                Western Uganda is known for its rich cultural heritage and agricultural communities. In this region, we work to bridge the educational gap and create opportunities for children who might not otherwise have access to quality learning environments.
              </p>
              <p>
                Our school serves not just as an educational institution, but as a community hub that supports families, empowers teachers, and transforms lives through comprehensive education programs.
              </p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-heading-semibold text-gray-900 mb-2">
                    Our Location
                  </h3>
                  <p className="text-gray-600 font-paragraph">
                    Nyairongo village, Kikuube District<br />
                    Western Uganda
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Impact Section Component
function ImpactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const impactPoints = [
    {
      title: 'Community-Centered',
      description: 'We work closely with local communities to ensure our programs meet their specific needs and cultural context.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Sustainable Development',
      description: 'Our programs are designed for long-term impact, building capacity within the community for generations to come.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Local Partnership',
      description: 'We collaborate with local leaders, parents, and educators to ensure our work is relevant and impactful.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Holistic Approach',
      description: 'Beyond education, we address broader community needs through teacher training, adult literacy, and community programs.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ]

  return (
    <section ref={sectionRef} className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Our Impact in Uganda
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-paragraph">
            Through our work in Nyairongo village, we are creating lasting change that extends beyond the classroom.
          </p>
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {impactPoints.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-12 h-12 rounded-full bg-school-green/10 text-school-green flex items-center justify-center mb-4">
                {point.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-heading-semibold text-gray-900 mb-3">
                {point.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} id="contact" className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Contact Us
          </h2>
        </motion.div>

        <motion.div
          className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading-semibold text-gray-900 mb-2">
                Jasper Primary School
              </h3>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Our Address</h4>
                <p className="text-gray-600 font-paragraph">
                  Nyairongo village, Kikuube District, Western Uganda
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Our Email</h4>
                <a 
                  href="mailto:jasperschoolsuganda@gmail.com" 
                  className="text-school-green hover:text-school-green/80 font-paragraph transition-colors"
                >
                  jasperschoolsuganda@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Contacts</h4>
                <p className="text-gray-600 font-paragraph">
                  <a href="tel:+256770799066" className="text-school-green hover:text-school-green/80 transition-colors">
                    +256 770 799 066
                  </a>
                  {' / '}
                  <a href="tel:+256782972117" className="text-school-green hover:text-school-green/80 transition-colors">
                    +256 782 972 117
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/donate"
            className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-base sm:text-lg px-8 py-3 transition-all duration-300"
          >
            Support Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

