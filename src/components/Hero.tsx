'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Animated Counter Component for Hero (starts immediately with delay)
function AnimatedCounter({ end, duration = 2000, suffix = '', delay = 0 }: { end: number, duration?: number, suffix?: string, delay?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Start animation after specified delay
    const delayTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

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
  }, [end, duration, hasStarted])

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

// Slideshow Component
function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    '/images/jps1.jpeg',
    '/images/jps2.jpeg',
    // '/images/jps3.jpg',
    '/images/jps4.jpeg',
    '/images/jps5.jpg',
    '/images/jps6.jpeg',
    '/images/jps7.jpeg',
    '/images/jps8.jpeg',
    '/images/jps9.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide}
            alt="School slideshow"
            fill
            priority={index === 0}
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-75" />
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative text-white min-h-[100vh]">
      {/* Slideshow Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Slideshow />
      </div>
      
      {/* Main Content - Overlaid directly on background */}
      <div className="relative z-10 min-h-[100vh] flex items-center justify-center pb-56 sm:pb-36 lg:pb-40">
        {/* Centered Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl sm:max-w-4xl lg:max-w-5xl">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-light leading-[1.1] mb-4 sm:mb-6 text-left">
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Transformative
                </motion.span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Education
                </motion.span>
              </h1>
              
              {/* Descriptive Paragraph - Word by word animation */}
              <div className="text-sm sm:text-base text-white/90 font-paragraph leading-relaxed mb-6 sm:mb-8 max-w-2xl text-left">
                {['We', 'empower', 'children', 'in', 'rural', 'areas', 'through', 'access', 'to', 'quality', 'education,', 'nurturing', 'lifelong', 'learning,', 'innovation,', 'and', 'transformative', 'growth.'].map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 1.0 + (index * 0.08), // Fast, poetic stagger
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              
              {/* Call-to-Action Button */}
              <motion.a
                href="/sponsor"
                className="group inline-flex items-center justify-center bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300 z-50 relative mb-8 sm:mb-0"
                style={{ padding: '16px 32px' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>Sponsor a Student</span>
                {/* <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg> */}
              </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Stats Section - Positioned absolutely at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/85 backdrop-blur-sm border-t border-white/10 transform translate-y-4 sm:translate-y-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Left Column - Description */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white font-paragraph text-base sm:text-base leading-relaxed">
                Learn how Jasper Schools transforms lives in rural Uganda
              </p>
            </motion.div>
            
            {/* Middle Column - Statistics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.0, type: "spring", stiffness: 100 }}
              >
                <div className="text-3xl sm:text-3xl lg:text-4xl font-heading text-school-yellow mb-1">
                  <AnimatedCounter end={600} duration={2000} suffix="+" delay={3200} />
                </div>
                <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                  Students Impacted
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.2, type: "spring", stiffness: 100 }}
              >
                <div className="text-3xl sm:text-3xl lg:text-4xl font-heading text-school-yellow mb-1">
                  <AnimatedCounter end={15} duration={1800} suffix="+" delay={3400} />
                </div>
                <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                  Teachers
                </div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.4, type: "spring", stiffness: 100 }}
              >
                <div className="text-3xl sm:text-3xl lg:text-4xl font-heading text-school-yellow mb-1">
                  <AnimatedCounter end={1} duration={1600} suffix="" delay={3600} />
                </div>
                <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                  Year of Educational Excellence
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Action Buttons */}
            <motion.div 
              className="flex flex-col gap-3 justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="/about/our-story"
                className="group inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base"
              >
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/about/vision-mission"
                className="group inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base"
              >
                Our Vision
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
