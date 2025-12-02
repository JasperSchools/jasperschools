'use client'

import Link from 'next/link'
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
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold text-school-blue mb-4 sm:mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              About Us
            </motion.h2>
            
            <div className="space-y-4 sm:space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed font-paragraph">
              <motion.p
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
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                While this content is placeholder and will be refined, our commitment remains the same: empowering
                children in Nyairongo with quality education and a supportive environment to thrive.
              </motion.p>
            </div>

            <motion.div 
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/about/vision-mission" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-school-green text-white font-heading-medium hover:bg-green-700 transition-colors text-base">
                Read our Vision & Mission
              </Link>
              <Link href="/about/our-story" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-gray-900 font-heading-medium hover:bg-gray-50 transition-colors border-2 border-gray-200 text-base">
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Sidebar Card - Right Side */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              className="bg-white rounded-2xl shadow-md p-6 lg:p-8 border border-gray-100"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-heading-medium text-school-blue mb-3">What guides us</h3>
              <ul className="space-y-2 text-gray-700 font-paragraph">
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
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg className="w-5 h-5 text-school-green mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
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
    { end: 500, suffix: '+', label: 'Students', description: 'Empowered through education', duration: 2500, delay: 0.2 },
    { end: 15, suffix: '+', label: 'Teachers', description: 'Dedicated educators', duration: 2000, delay: 0.4 },
    { end: 10, suffix: '+', label: 'Years', description: 'Of educational excellence', duration: 1800, delay: 0.6 }
  ]

  return (
    <div ref={sectionRef} className="mt-16 pt-12 border-t border-gray-200">
      <div className="text-center mb-12">
        <motion.h3 
          className="text-2xl sm:text-3xl font-heading-semibold text-school-blue mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Impact
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg font-paragraph"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Numbers that reflect our commitment to education
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center"
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
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-school-green mb-2">
              <AnimatedCounter end={stat.end} duration={stat.duration} suffix={stat.suffix} inView={isInView} />
            </div>
            <div className="text-lg font-heading-medium text-gray-700 mb-1">{stat.label}</div>
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
    <section id="impact" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-school-green text-white relative overflow-hidden">
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
          className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Impact
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg lg:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed font-paragraph"
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
          className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold text-school-blue mb-4 sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Get Involved
        </motion.h2>
        <div className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-paragraph">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold mb-6">
              Help Us Transform Lives
            </h2>
            <p className="text-lg text-green-100 font-paragraph mb-8 leading-relaxed">
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
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-bold text-lg transition-all duration-300"
              >
                Donate Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/sponsor"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-school-green font-heading-semibold text-lg transition-all duration-300"
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
            className="grid grid-cols-2 gap-6"
          >
            {[
              { value: 98, suffix: '%', label: 'Goes to Programs' },
              { value: 500, suffix: '+', label: 'Students Supported' },
              { value: 15, suffix: '+', label: 'Teachers Employed' },
              { value: 10, suffix: '+', label: 'Years of Impact' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: "spring" }}
              >
                <div className="text-4xl font-heading-bold text-school-yellow mb-2">
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
