'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { FEATURES } from '@/config/features'

const partners = [
  {
    name: 'African Leadership Academy',
    logo: '/images/partners/ala_logo.png',
    alt: 'African Leadership Academy Logo',
  },
  {
    name: 'SOLFA',
    logo: '/images/partners/solfa_logo.png',
    alt: 'SOLFA Logo',
  },
  {
    name: 'ACN',
    logo: '/images/partners/acn-logo.svg',
    alt: 'ACN Logo',
  },
]

export default function PartnersPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Partners
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-green-100 max-w-3xl mx-auto leading-relaxed font-paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building strong partnerships to transform education and create lasting impact in our communities
          </motion.p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-gray-900 mb-6">
              Working Together for Impact
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-paragraph leading-relaxed mb-8">
              At Jasper Primary School, we believe that meaningful change happens through collaboration. Our partnerships with leading organizations enable us to deliver quality education, build capacity, and create sustainable solutions that transform lives in Nyairongo and beyond.
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed">
              Through these strategic partnerships, we leverage expertise, resources, and shared vision to eliminate barriers to quality education and empower communities to thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Logos */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm flex items-center justify-center min-h-[160px] sm:min-h-[180px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative w-48 sm:w-56 h-24 sm:h-28">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 192px, 224px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-gray-900 mb-4">
              How Partnerships Drive Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-paragraph max-w-2xl mx-auto">
              Our collaborative approach amplifies our impact and creates opportunities for growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Resource Sharing',
                description: 'Access to expertise, funding, and educational resources that enhance our programs and infrastructure.',
                icon: '📚',
              },
              {
                title: 'Capacity Building',
                description: 'Training and development opportunities for our teachers and staff to improve educational delivery.',
                icon: '👥',
              },
              {
                title: 'Innovation & Research',
                description: 'Collaborative research initiatives that inform best practices and drive educational innovation.',
                icon: '💡',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-heading-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-school-green to-[#1a5c34]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-white mb-4 sm:mb-6">
              Interested in Partnering With Us?
            </h2>
            <p className="text-base sm:text-lg text-green-100 font-paragraph mb-8 max-w-2xl mx-auto">
              We're always looking for organizations and individuals who share our vision of transforming education in rural communities. Let's explore how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {FEATURES.ENABLE_CONTACT ? (
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-school-green font-heading-semibold rounded-full text-base sm:text-lg transition-all duration-300 px-8 py-4"
                >
                  Get in Touch
                </Link>
              ) : FEATURES.ENABLE_VOLUNTEER ? (
                <Link
                  href="/volunteer"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-school-green font-heading-semibold rounded-full text-base sm:text-lg transition-all duration-300 px-8 py-4"
                >
                  Volunteer With Us
                </Link>
              ) : (
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-school-green font-heading-semibold rounded-full text-base sm:text-lg transition-all duration-300 px-8 py-4"
                >
                  Our Programs
                </Link>
              )}
              <Link
                href="/about/our-story"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-heading-semibold rounded-full text-base sm:text-lg transition-all duration-300 border-2 border-white px-8 py-4"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

