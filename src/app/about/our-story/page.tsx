'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Animated Counter Component with Scroll Trigger
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

// Story Introduction Section - Phase 3 Scrollytelling
function StoryIntroSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Animated Background Transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading - Fades in with scale */}
        <motion.h3
          className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          The Story Behind Our Mission
        </motion.h3>

        {/* Subtitle - Fades in slightly after heading */}
        <motion.p
          className="text-sm sm:text-base text-gray-600 leading-relaxed font-paragraph max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Understanding the challenges that drive our commitment to rural education in Uganda
        </motion.p>
      </div>
    </section>
  )
}

// Impact Section Component with Phase 2 Scrollytelling
function ImpactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Animated Background Color Transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content - Left Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Heading - Slide in from left */}
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A Legacy of Educational Impact
            </motion.h2>
            
            {/* Paragraphs - Stagger fade in */}
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Founded with a vision to transform rural education in Uganda, Jasper Schools Uganda has been at the forefront of addressing educational inequity in Nyairongo and surrounding communities.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Our commitment to providing quality education has created lasting change, empowering children to break the cycle of poverty through learning and opportunity.
              </motion.p>
            </div>
            
            {/* Impact Figures - Scale up and reveal */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              {/* Stat 1 - Students */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-[#0D4723] mb-2">
                  <AnimatedCounter end={600} duration={2500} suffix="+" inView={isInView} />
                </div>
                <div className="text-gray-600 font-heading-medium">Students Impacted</div>
              </motion.div>
              
              {/* Stat 2 - Teachers */}
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
                transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 100 }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading-bold text-[#0D4723] mb-2">
                  <AnimatedCounter end={15} duration={2000} suffix="+" inView={isInView} />
                </div>
                <div className="text-gray-600 font-heading-medium">Qualified Teachers</div>
              </motion.div>
            </div>
          </div>

          {/* Logo Section - Right Side - Slide in from right */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            >
              <motion.div 
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-2xl p-8 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/images/jps_logo.jpg"
                  alt="Jasper Primary School Logo"
                  width={300}
                  height={300}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OurStory() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Story
          </motion.h1>
          <div className="text-green-100 text-sm sm:text-base max-w-3xl mx-auto font-paragraph">
            {['What', 'inspired', 'Jasper', 'Schools', 'Uganda'].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + (index * 0.3), // Staggered delay for each word
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Phase 2 Scrollytelling */}
      <ImpactSection />

      {/* Transition Section - Phase 3 Scrollytelling */}
      <StoryIntroSection />

      {/* Main Content */}
      <article className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Opening Statement */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-base sm:text-lg leading-relaxed text-gray-800 font-paragraph">
              Access to quality education remains a significant challenge for children in rural areas of Uganda, where systemic and socio-economic barriers create a cycle of educational inequity.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/images/jps1.jpeg"
              alt="Students at Jasper Primary School"
              fill
              className="object-cover"
            />
          </div>

          {/* The Challenge */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">The Challenges</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-paragraph">
                Nyairongo is a rural community whose education system faces the cliche challenges in education that majority of rural Africa faces. Though the challenges faced by children in rural Nyairongo are similar to most rural communities in Africa, they are made unique by their intensity. The challenges are:
              </p>
            </div>
          </section>

          {/* Lack of learning materials in schools */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">Lack of learning materials in schools</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
                Nyairongo has no learning centre for easy access to learning materials. This shortage deprives students of the tools necessary for effective learning, contributing to a widening gap in educational outcomes between rural and urban students. Further to this, the poor infrastructure of many rural schools with inadequate facilities, including dilapidated buildings and a lack of basic amenities, creates an environment that is not conducive to learning, further discouraging student attendance and engagement.
              </p>
            </div>
          </section>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/jps2.jpeg"
                alt="Students learning at Jasper Primary School"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/jps4.jpeg"
                alt="School activities and facilities"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Accessibility Barriers */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">Accessibility barriers</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
                In addition to these material deficiencies, the inaccessibility of schools poses a major hurdle. Many children in rural areas must travel long distances to reach school, a daily journey that is both physically exhausting and unsafe. This challenge not only limits regular attendance but also negatively impacts students&apos; academic performance and overall well-being.
              </p>
            </div>
          </section>

          {/* Teacher Shortage Section */}
          <section className="bg-gray-50 rounded-2xl p-8 sm:p-10 lg:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">The teacher shortage</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
                    The shortage of qualified teachers in rural areas is another significant barrier. Many educators are reluctant to work in these remote regions due to the lack of amenities and professional opportunities. As a result, students in rural schools often receive a lower quality of education, with larger class sizes and less individualised attention, further exacerbating educational disparities.
                  </p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                <Image
                  src="/images/jps6.jpeg"
                  alt="Teachers and students at Jasper Primary School"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Technology & Digital Divide */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">The digital divide</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
                Technology barriers also play a critical role in this educational inequity. The lack of access to digital tools and resources in rural areas prevents students from developing the technological skills essential for success in the modern world. This digital divide not only limits their current educational experiences but also hinders their future opportunities in an increasingly technology-driven global economy.
              </p>
            </div>
          </section>

          {/* Featured Image */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-16">
            <Image
              src="/images/jps5.jpg"
              alt="Jasper Primary School students and teachers"
              fill
              className="object-cover"
            />
          </div>

          {/* Cultural Barriers */}
          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">Cultural and economic barriers</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-paragraph">
                In addition, there is a widespread lack of awareness in rural communities about the long-term benefits of education, especially for girls. Cultural norms and gender biases often prioritize short-term economic contributions over schooling, leading to high dropout rates and limiting girls&apos; opportunities to achieve their full potential.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
                Most households face the challenge of poverty as many families in rural areas depend on seasonal crop farming, which provides an unstable and insufficient income. This economic instability forces families to make difficult choices, often prioritizing immediate survival over long-term educational goals, leading to high dropout rates and perpetuating the cycle of poverty.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-16"></div>

          {/* The Solution */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-heading text-gray-900 mb-6">Our Solution</h2>
              <div className="w-20 h-1 bg-[#0D4723] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 lg:p-12 border-2 border-gray-100">
                <p className="text-base sm:text-lg leading-relaxed text-gray-800 mb-6 font-paragraph">
                  Due to these systemic failures in rural education, Jasper Schools Uganda is establishing Jasper Primary School-Nyirongo to transform the educational landscape for children in rural areas.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-paragraph">
                  By addressing the root causes of educational inequity, the school aims to provide a supportive, high-quality learning environment where all students, regardless of their socioeconomic background, can thrive and achieve their full potential.
                </p>
              </div>
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/jps7.jpeg"
                  alt="Jasper Primary School transforming education"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Additional Images Gallery */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/jps8.jpeg"
                  alt="School community and activities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/jps9.jpg"
                  alt="Students engaged in learning"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden sm:col-span-2 lg:col-span-1">
                <Image
                  src="/images/jps2.jpeg"
                  alt="Jasper Primary School impact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
                style={{ padding: '16px 32px' }}
              >
                Support Our Mission
              </Link>
              <Link
                href="/about/vision-mission"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300 border border-black/20"
                style={{ padding: '16px 32px' }}
              >
                Read Our Vision & Mission
              </Link>
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  )
}
