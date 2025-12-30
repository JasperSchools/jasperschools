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
    <section id="about" ref={sectionRef} className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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
    <div ref={sectionRef} className="mt-12 sm:mt-16 lg:mt-20 pt-12 sm:pt-16 border-t border-gray-200 pb-4 sm:pb-6">
      <div className="text-center mb-12 sm:mb-16">
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

// Get Involved Section Component
function GetInvolvedSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const waysToGetInvolved = [
    {
      title: 'Donate',
      description: 'Support our mission with a financial contribution. Every dollar makes a difference in transforming lives.',
      link: '/donate',
      linkText: 'Donate Now'
    },
    {
      title: 'Sponsor a Child',
      description: 'Make a lasting impact by sponsoring a child\'s education and providing them with opportunities for a brighter future.',
      link: '/sponsor',
      linkText: 'Learn More'
    },
    {
      title: 'Volunteer',
      description: 'Share your time and skills to help us create meaningful change in the lives of children and families.',
      link: '/contact',
      linkText: 'Get Started'
    }
  ]

  return (
    <section id="get-involved" ref={sectionRef} className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-white relative overflow-hidden">
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Get Involved
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-paragraph">
            Join us in making a difference. There are many ways to support our mission and transform lives through education.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {waysToGetInvolved.map((way, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-gray-400 p-8 transition-all duration-300 group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-heading text-gray-900 mb-3">
                {way.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed mb-6 flex-grow">
                {way.description}
              </p>

              {/* Link */}
              <Link
                href={way.link}
                className="inline-flex items-center text-school-green font-heading-semibold hover:text-school-green/80 transition-colors group/link mt-auto"
              >
                {way.linkText}
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          ))}
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

      {/* Get Involved Section */}
      <GetInvolvedSection />

      <Footer />
    </main>
  )
}
