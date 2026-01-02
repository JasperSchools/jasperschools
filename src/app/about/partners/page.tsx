'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const partners = [
  {
    name: 'African Leadership Academy',
    acronym: 'ALA',
    logo: '/images/partners/ala_logo.png',
    description: 'African Leadership Academy is a pan-African institution that develops the next generation of African leaders. Through our partnership, we collaborate on educational initiatives, leadership development programs, and student exchange opportunities that empower young leaders across the continent.',
    focus: ['Leadership Development', 'Educational Excellence', 'Pan-African Collaboration'],
    website: 'https://www.africanleadershipacademy.org',
  },
  {
    name: 'United States International University',
    acronym: 'USIU',
    logo: '/images/partners/usiu_logo.png',
    description: 'USIU-Africa is a premier institution of higher learning in East Africa. Our partnership focuses on teacher training, curriculum development, and research initiatives that enhance educational quality and access in rural communities.',
    focus: ['Teacher Training', 'Curriculum Development', 'Research & Innovation'],
    website: 'https://www.usiu.ac.ke',
  },
  {
    name: 'SOLFA',
    acronym: 'SOLFA',
    logo: '/images/partners/solfa_logo.png',
    description: 'SOLFA partners with us to provide comprehensive support for educational programs, community development, and capacity building initiatives. Together, we work to create sustainable educational solutions that transform communities.',
    focus: ['Community Development', 'Capacity Building', 'Sustainable Solutions'],
    website: '#',
  },
  {
    name: 'ACN',
    acronym: 'ACN',
    logo: '/images/partners/acn-logo.svg',
    description: 'ACN collaborates with Jasper Primary School to advance educational opportunities for children in underserved communities. Our partnership focuses on resource mobilization, program support, and advocacy for quality education.',
    focus: ['Resource Mobilization', 'Program Support', 'Educational Advocacy'],
    website: '#',
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

      {/* Partners Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.name} partner={partner} index={index} />
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
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-school-green font-heading-semibold rounded-full text-base sm:text-lg transition-all duration-300 px-8 py-4"
              >
                Get in Touch
              </Link>
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

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}

function PartnerCard({ partner, index }: { partner: typeof partners[0]; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Logo */}
      <div className="mb-6">
        <div className="relative w-32 h-24 sm:w-40 sm:h-28">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 128px, 160px"
          />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-heading-semibold text-gray-900 mb-3">
        {partner.name}
      </h3>
      {partner.acronym !== partner.name && (
        <p className="text-sm text-gray-500 font-paragraph-medium mb-4 uppercase tracking-wide">
          {partner.acronym}
        </p>
      )}
      
      <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed mb-6">
        {partner.description}
      </p>

      {/* Focus Areas */}
      <div className="mb-6">
        <h4 className="text-sm font-heading-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Focus Areas
        </h4>
        <div className="flex flex-wrap gap-2">
          {partner.focus.map((area) => (
            <span
              key={area}
              className="inline-block px-3 py-1 bg-school-green/10 text-school-green text-xs font-paragraph-medium rounded-full"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Website Link */}
      {partner.website !== '#' && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-school-green font-heading-semibold hover:text-school-green/80 transition-colors text-sm sm:text-base"
        >
          Visit Website
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </motion.div>
  )
}

