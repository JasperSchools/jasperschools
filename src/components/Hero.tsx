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

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-school-green via-green-700 to-green-800 text-white overflow-hidden">
      {/* Background Image/Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full blur-sm"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full blur-sm"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full blur-sm"></div>
      </div>
      
      {/* Dark Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Professional Content Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
              Creating Bright Paths
              <span className="block text-yellow-300 mt-1">Together</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6 text-green-100 max-w-2xl mx-auto lg:mx-0">
              Empowering children in rural Uganda through quality education, 
              nurturing their potential, and building a brighter future for our community.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-300 mb-1">
                  <AnimatedCounter end={500} duration={2500} suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-green-200">Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-300 mb-1">
                  <AnimatedCounter end={15} duration={2000} suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-green-200">Teachers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-300 mb-1">
                  <AnimatedCounter end={10} duration={1800} suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-green-200">Years</div>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#donate"
                className="group bg-school-red hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center"
              >
                <span>Support Our Mission</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#about"
                className="group bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 border-2 border-white border-opacity-30 hover:border-opacity-60 backdrop-blur-sm flex items-center justify-center"
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>

          {/* Professional Logo Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white border-opacity-20 shadow-2xl">
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
                  <div className="bg-white bg-opacity-10 rounded-2xl p-4 border border-white border-opacity-20">
                    <h4 className="font-medium mb-3 text-yellow-300 text-base">Our Mission</h4>
                    <p className="text-sm leading-relaxed text-green-100">
                      To provide quality education that empowers children to reach their full potential 
                      and contribute meaningfully to their community and the world.
                    </p>
                  </div>
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
