'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Us Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold text-school-blue mb-4 sm:mb-6 lg:mb-8">
                About Us
              </h2>
              <div className="space-y-4 sm:space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed font-paragraph">
                <p>
                  Our vision is to champion community building through innovative, inclusive, and resilient learning.
                </p>
                <p>
                  We exist to nurture potential, create opportunity, and strengthen the fabric of our community through
                  learning experiences that are accessible, practical, and future-ready.
                </p>
                <p>
                  While this content is placeholder and will be refined, our commitment remains the same: empowering
                  children in Nyairongo with quality education and a supportive environment to thrive.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/about/vision-mission" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-school-green text-white font-heading-medium hover:bg-green-700 transition-colors">
                  Read our Vision & Mission
                </a>
                <a href="/about/our-story" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-gray-900 font-heading-medium hover:bg-gray-50 transition-colors border-2 border-gray-200">
                  Our Story
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 border border-gray-100">
                <h3 className="text-xl font-heading-medium text-school-blue mb-3">What guides us</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 font-paragraph">
                  <li>Inclusive learning that welcomes every child.</li>
                  <li>Resilience through community and care.</li>
                  <li>Innovation grounded in local context.</li>
                  <li>Accountability and partnership.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-heading-semibold text-school-blue mb-4">Our Impact</h3>
              <p className="text-gray-600 text-lg font-paragraph">Numbers that reflect our commitment to education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-school-green mb-2">
                  <AnimatedCounter end={500} duration={2500} suffix="+" />
                </div>
                <div className="text-lg font-heading-medium text-gray-700 mb-1">Students</div>
                <div className="text-gray-600 font-paragraph">Empowered through education</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-school-green mb-2">
                  <AnimatedCounter end={15} duration={2000} suffix="+" />
                </div>
                <div className="text-lg font-heading-medium text-gray-700 mb-1">Teachers</div>
                <div className="text-gray-600 font-paragraph">Dedicated educators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-school-green mb-2">
                  <AnimatedCounter end={10} duration={1800} suffix="+" />
                </div>
                <div className="text-lg font-heading-medium text-gray-700 mb-1">Years</div>
                <div className="text-gray-600 font-paragraph">Of educational excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="py-12 sm:py-16 lg:py-20 bg-school-green text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold mb-4 sm:mb-6 lg:mb-8">
            Our Impact
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed font-paragraph">
            See how we're transforming lives and building a brighter future for our community.
          </p>
        </div>
      </section>

      <section id="get-involved" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            Get Involved
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-paragraph">
            Join us in making a difference. There are many ways to support our mission.
          </p>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-semibold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-paragraph">
            Get in touch with us to learn more or find out how you can help.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}