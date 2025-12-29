'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Animated Counter Component with InView trigger
function AnimatedCounter({ end, duration = 2000, suffix = '', inView }: { end: number, duration?: number, suffix?: string, inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, inView])

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

// About Section Component with Modern Animations
function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-school-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-school-yellow/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-heading text-gray-900 mb-6 sm:mb-8 lg:mb-10 leading-tight"
              >
                Transforming Lives Through Education
              </h2>
            </motion.div>
            
            <div className="space-y-5 sm:space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
              <motion.p
                className="text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Our vision is to champion community building through innovative, inclusive, and resilient learning.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                We exist to nurture potential, create opportunity, and strengthen the fabric of our community through
                learning experiences that are accessible, practical, and future-ready.
              </motion.p>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                While this content is placeholder and will be refined, our commitment remains the same: empowering
                children in Nyairongo with quality education and a supportive environment to thrive.
              </motion.p>
            </div>

            <motion.div 
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                href="/about/vision-mission" 
                className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300" 
                style={{ padding: '16px 32px' }}
              >
                Read our Vision & Mission
              </Link>
              <Link 
                href="/about/our-story" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300 border border-black/20"
                style={{ padding: '16px 32px' }}
              >
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Sidebar Card - Right Side with Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              className="relative bg-white rounded-2xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image Section */}
              <div className="relative h-64 sm:h-80 lg:h-80 overflow-hidden">
                <Image
                  src="/images/jps2.jpeg"
                  alt="Students at Jasper Primary School"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-heading-bold text-white mb-2">What guides us</h3>
                  <p className="text-white/90 font-paragraph text-sm">Our core values and principles</p>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 lg:p-8">
                <ul className="space-y-4 text-gray-700 font-paragraph">
                  {[
                    'Inclusive learning that welcomes every child.',
                    'Resilience through community and care.',
                    'Innovation grounded in local context.',
                    'Accountability and partnership.'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-school-green/10 flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Section */}
        <StatisticsSection />
      </div>
    </section>
  )
}

// Statistics Section Component
function StatisticsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const stats = [
    { end: 600, suffix: '+', label: 'Students', description: 'Empowered through education', duration: 2500, delay: 0.2 },
    { end: 15, suffix: '+', label: 'Teachers', description: 'Dedicated educators', duration: 2000, delay: 0.4 },
    { end: 1, suffix: '', label: 'Year', description: 'Of educational excellence', duration: 1800, delay: 0.6 }
  ]

  return (
    <div ref={sectionRef} className="mt-20 pt-16 border-t border-gray-200">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4"
          >
            Making a Real Difference
          </h3>
        </motion.div>
        <motion.p 
          className="text-gray-600 text-sm sm:text-base font-paragraph max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Numbers that reflect our commitment to education and community transformation
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-8 bg-white rounded-2xl border border-gray-100"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
            transition={{ 
              duration: 0.7, 
              delay: stat.delay, 
              ease: [0.22, 1, 0.36, 1],
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl font-heading bg-gradient-to-br from-school-green to-green-600 bg-clip-text text-transparent mb-3">
              <AnimatedCounter end={stat.end} duration={stat.duration} suffix={stat.suffix} inView={isInView} />
            </div>
            <div className="text-xl font-heading-semibold text-gray-900 mb-2">{stat.label}</div>
            <div className="text-gray-600 font-paragraph">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Impact Section Component
function ImpactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  return (
    <section id="impact" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.1 } : { scale: 1.2, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-heading mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Impact
        </motion.h2>
        <motion.p 
          className="text-sm sm:text-base text-green-100 max-w-3xl mx-auto leading-relaxed font-paragraph"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          See how we&apos;re transforming lives and building a brighter future for our community.
        </motion.p>
      </div>
    </section>
  )
}

// Get Involved Section Component
function GetInvolvedSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  const words = ['Join', 'us', 'in', 'making', 'a', 'difference.', 'There', 'are', 'many', 'ways', 'to', 'support', 'our', 'mission.']

  return (
    <section id="get-involved" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-heading text-school-blue mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Get Involved
        </motion.h2>
        <div className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-paragraph">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-[0.3em] ${word === 'difference.' ? 'font-semibold text-gray-900' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + (index * 0.05),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Donate Section for Homepage
function DonateSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section id="donate" ref={sectionRef} className="py-20 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.1 } : { scale: 1.2, opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading mb-6">
              Help Us Transform Lives
            </h2>
            <p className="text-sm sm:text-base text-green-100 font-paragraph mb-8 leading-relaxed">
              Your donation provides quality education, nutritious meals, and a brighter future for children in rural Uganda. Every contribution makes a lasting impact.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { amount: '$20', impact: 'provides one month of meals for a child' },
                { amount: '$50', impact: 'buys textbooks for a student for one year' },
                { amount: '$300', impact: 'sponsors a child\'s full education for one year' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <svg className="w-6 h-6 text-school-yellow flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-heading-semibold text-school-yellow">{item.amount}</span>
                    <span className="text-green-100 font-paragraph"> {item.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
                style={{ padding: '16px 32px' }}
              >
                Donate Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/sponsor"
                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-school-green text-white font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
                style={{ padding: '16px 32px' }}
              >
                Sponsor a Child
              </Link>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { value: 98, suffix: '%', label: 'Goes to Programs' },
              { value: 600, suffix: '+', label: 'Students Supported' },
              { value: 200, suffix: '', label: 'Students Sponsored' },
              { value: 15, suffix: '+', label: 'Teachers Employed' },
              { value: 1, suffix: '', label: 'Year of Impact' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
              >
                <div className="text-4xl font-heading text-school-yellow mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-green-100 font-paragraph">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Us Section */}
      <AboutSection />

      {/* Impact Section */}
      <ImpactSection />

      {/* Get Involved Section */}
      <GetInvolvedSection />

      {/* Donate Section */}
      <DonateSection />

      <Footer />
    </main>
  )
}
