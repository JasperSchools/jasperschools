'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [end, isVisible])

  useEffect(() => {
    if (!isVisible) return

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
  }, [end, duration, isVisible])

  return (
    <span id={`counter-${end}`}>
      {count}{suffix}
    </span>
  )
}

// Slideshow Component
function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    '/images/istockphoto-1435346080-1024x1024_cleanup.jpg',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=800&fit=crop',
    '/images/yie.jpg'
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
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden min-h-[85vh]">
      {/* Slideshow Background */}
      <Slideshow />
      
      {/* Main Content - Overlaid directly on background */}
      <div className="relative z-10 min-h-[85vh] flex flex-col">
        {/* Top Content */}
        <div className="flex-1 flex items-center pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-3xl sm:max-w-4xl lg:max-w-5xl">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-light leading-[1.1] mb-4 sm:mb-6 text-left">
                <span className="block">Transformative</span>
                <span className="block">Education</span>
              </h1>
              
              {/* Descriptive Paragraph */}
              <p className="text-sm sm:text-base text-white/90 font-paragraph leading-relaxed mb-6 sm:mb-8 max-w-2xl text-left">
                We empower children in rural areas through access to quality education, nurturing lifelong learning, innovation, and transformative growth.
              </p>
              
              {/* Call-to-Action Button */}
              <a
                href="#donate"
                className="group inline-flex items-center justify-center bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold rounded-full text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
                style={{ margin: '20px 0px 0px', padding: '16px 32px' }}
              >
                <span>Support Our Mission</span>
                {/* <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg> */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="bg-black/85 backdrop-blur-sm border-t border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              {/* Left Column - Description */}
              <div className="text-center lg:text-left">
                <p className="text-white font-paragraph text-base sm:text-base leading-relaxed">
                  Learn how Jasper Schools transforms lives in rural Uganda
                </p>
              </div>
              
              {/* Middle Column - Statistics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-3xl lg:text-4xl font-heading-bold text-school-yellow mb-1">
                    500+
                  </div>
                  <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                    Students Impacted
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-3xl lg:text-4xl font-heading-bold text-school-yellow mb-1">
                    15+
                  </div>
                  <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                    Teachers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-3xl lg:text-4xl font-heading-bold text-school-yellow mb-1">
                    97%
                  </div>
                  <div className="text-white/90 font-paragraph text-sm sm:text-sm">
                    Community Support
                  </div>
                </div>
              </div>
              
              {/* Right Column - Action Buttons */}
              <div className="flex flex-col gap-3 justify-center">
                <a
                  href="/about/our-story"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-gray-900 font-paragraph transition-all duration-300 text-sm"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/about/vision-mission"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-gray-900 font-paragraph transition-all duration-300 text-sm"
                >
                  Our Vision
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}