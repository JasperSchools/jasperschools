'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
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

export default function OurStory() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D4723' }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold text-white mb-4">Our Story</h1>
          <p className="text-green-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-paragraph">
            What inspired Jasper Schools Uganda
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Content */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold text-gray-900 mb-6">
                A Legacy of Educational Impact
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-paragraph">
                <p>
                  Founded with a vision to transform rural education in Uganda, Jasper Schools Uganda has been at the forefront of addressing educational inequity in Nyairongo and surrounding communities.
                </p>
                <p>
                  Our commitment to providing quality education has created lasting change, empowering children to break the cycle of poverty through learning and opportunity.
                </p>
              </div>
              
              {/* Impact Figures */}
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-[#0D4723] mb-2">
                    <AnimatedCounter end={500} duration={2500} suffix="+" />
                  </div>
                  <div className="text-gray-600 font-heading-medium">Students Impacted</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-[#0D4723] mb-2">
                    <AnimatedCounter end={15} duration={2000} suffix="+" />
                  </div>
                  <div className="text-gray-600 font-heading-medium">Qualified Teachers</div>
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-2xl p-8 flex items-center justify-center">
                  <Image
                    src="/school-logo.png"
                    alt="Jasper Primary School Logo"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="w-20 h-1 bg-[#0D4723] mx-auto mb-6"></div>
          <h3 className="text-2xl sm:text-3xl font-heading-semibold text-gray-900 mb-4">The Story Behind Our Mission</h3>
          <p className="text-lg text-gray-600 leading-relaxed font-paragraph">
            Understanding the challenges that drive our commitment to rural education in Uganda
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Opening Statement */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-800 font-paragraph">
              Access to quality education remains a significant challenge for children in rural areas of Uganda, where systemic and socio-economic barriers create a cycle of educational inequity.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-xl">
            <Image
              src="/images/istockphoto-1435346080-1024x1024_cleanup.jpg"
              alt="Rural education in Uganda"
              fill
              className="object-cover"
            />
          </div>

          {/* The Challenge */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">The Challenge</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 font-paragraph">
                These challenges are particularly pronounced in Nyairongo, where Jasper Schools Uganda has identified a critical need to intervene by establishing Jasper Primary School-Nyairongo.
              </p>
              <p className="text-gray-700 leading-relaxed font-paragraph">
                One of the pressing issues is the lack of learning materials in rural schools. For example, Nyairongo has no learning centre for easy access to learning materials. This shortage deprives students of the tools necessary for effective learning, contributing to a widening gap in educational outcomes between rural and urban students. Further to this, the poor infrastructure of many rural schools with inadequate facilities, including dilapidated buildings and a lack of basic amenities, creates an environment that is not conducive to learning, further discouraging student attendance and engagement.
              </p>
            </div>
          </section>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/istockphoto-1435346080-1024x1024_cleanup.jpg"
                alt="Students in rural school"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/istockphoto-1435346080-1024x1024_cleanup.jpg"
                alt="School facilities"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Accessibility Barriers */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">Accessibility Barriers</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed font-paragraph">
                In addition to these material deficiencies, the inaccessibility of schools poses a major hurdle. Many children in rural areas must travel long distances to reach school, a daily journey that is both physically exhausting and unsafe. This challenge not only limits regular attendance but also negatively impacts students&apos; academic performance and overall well-being.
              </p>
            </div>
          </section>

          {/* Teacher Shortage Section */}
          <section className="bg-gray-50 rounded-2xl p-8 sm:p-10 lg:p-12 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">The Teacher Shortage</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed font-paragraph">
                The shortage of qualified teachers in rural areas is another significant barrier. Many educators are reluctant to work in these remote regions due to the lack of amenities and professional opportunities. As a result, students in rural schools often receive a lower quality of education, with larger class sizes and less individualised attention, further exacerbating educational disparities.
              </p>
            </div>
          </section>

          {/* Technology & Digital Divide */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">The Digital Divide</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed font-paragraph">
                Technology barriers also play a critical role in this educational inequity. The lack of access to digital tools and resources in rural areas prevents students from developing the technological skills essential for success in the modern world. This digital divide not only limits their current educational experiences but also hinders their future opportunities in an increasingly technology-driven global economy.
              </p>
            </div>
          </section>

          {/* Featured Image */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-16 shadow-xl">
            <Image
              src="/images/istockphoto-1435346080-1024x1024_cleanup.jpg"
              alt="Education inequality"
              fill
              className="object-cover"
            />
          </div>

          {/* Cultural Barriers */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">Cultural & Economic Barriers</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 font-paragraph">
                In addition, there is a widespread lack of awareness in rural communities about the long-term benefits of education, especially for girls. Cultural norms and gender biases often prioritize short-term economic contributions over schooling, leading to high dropout rates and limiting girls&apos; opportunities to achieve their full potential.
              </p>
              <p className="text-gray-700 leading-relaxed font-paragraph">
                Most households face the challenge of poverty as many families in rural areas depend on seasonal crop farming, which provides an unstable and insufficient income. This economic instability forces families to make difficult choices, often prioritizing immediate survival over long-term educational goals, leading to high dropout rates and perpetuating the cycle of poverty.
              </p>
            </div>
          </section>

          {/* Student Motivation */}
          <section className="bg-gray-50 rounded-2xl p-8 sm:p-10 lg:p-12 mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-6">The Motivation Challenge</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed font-paragraph">
                Lastly, these adverse conditions contribute to a lack of self-motivation among students. Faced with numerous obstacles and limited support, many students in rural areas struggle to find the drive to pursue their education with vigor, which in turn affects their academic performances, especially in their national exams (PLE).
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-16"></div>

          {/* The Solution */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-heading-bold text-gray-900 mb-6">Our Solution</h2>
              <div className="w-20 h-1 bg-[#0D4723] mx-auto mb-8"></div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-gray-100">
              <p className="text-xl sm:text-2xl leading-relaxed text-gray-800 text-center mb-6 font-paragraph">
                Due to these systemic failures in rural education, Jasper Schools Uganda is establishing Jasper Primary School-Nyirongo to transform the educational landscape for children in rural areas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed text-center font-paragraph">
                By addressing the root causes of educational inequity, the school aims to provide a supportive, high-quality learning environment where all students, regardless of their socioeconomic background, can thrive and achieve their full potential.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/#donate"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#0D4723] text-white font-heading-semibold hover:bg-green-800 transition-colors text-lg"
              >
                Support Our Mission
              </Link>
              <a
                href="/about/vision-mission"
                className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-gray-900 font-heading-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200 text-lg"
              >
                Read Our Vision & Mission
              </a>
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  )
}
