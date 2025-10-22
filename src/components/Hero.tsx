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
    <section className="relative text-white overflow-hidden min-h-screen">
      {/* Slideshow Background */}
      <Slideshow />
      
      {/* Content */}
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[70vh]">
          {/* Card moved to left */}
          <div className="lg:col-span-4 order-1 lg:order-1">
            <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white border-opacity-30 shadow-2xl">
              {/* School Logo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl p-4">
                  <Image
                    src="/school-logo.png"
                    alt="Jasper Primary School Logo"
                    fill
                    className="object-contain p-4"
                    priority
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Jasper Primary School</h3>
                  <p className="text-green-200 mb-4 text-sm sm:text-base">Nyairongo, Uganda</p>
                  
                  {/* Mission Statement Card */}
                  <div className="bg-white bg-opacity-10 rounded-2xl p-4 border border-white border-opacity-20 mb-6">
                    <p className="text-sm leading-relaxed text-green-100">
                      Elevating children in rural areas through access to quality education, nurturing lifelong learning, innovation, and transformative growth.
                    </p>
                  </div>


                  {/* Call-to-Action Button */}
                  <a
                    href="#donate"
                    className="group bg-school-red hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center w-full"
                  >
                    <span>Support Our Mission</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Professional Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 sm:h-20 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  )
}