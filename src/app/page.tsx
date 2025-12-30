'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Transforming Lives Through Education
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side - Single Image */}
          <div className="lg:col-span-6 order-1">
            <motion.div 
              className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-tr-[3rem] overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/jps2.jpeg"
                alt="Students at Jasper Primary School"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 30%' }}
              />
            </motion.div>
          </div>

          {/* Right Side - Text Content */}
          <div className="lg:col-span-6 order-2 h-80 sm:h-96 lg:h-[500px] flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xl sm:text-2xl font-heading text-gray-700 mb-6 sm:mb-8">
                  Empowering communities through innovative and inclusive learning
                </h3>
              </motion.div>
              
              <div className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed font-paragraph">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our vision is to champion community building through innovative, inclusive, and resilient learning. We exist to nurture potential, create opportunity, and strengthen the fabric of our community through learning experiences that are accessible, practical, and future-ready.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Through a balanced curriculum, dedicated teachers, and learner-centred teaching methods, we ensure that every child develops the skills, values, and confidence needed to succeed academically and socially. Our commitment remains the same: empowering children in Nyairongo with quality education and a supportive environment to thrive.
                </motion.p>
                
                {/* Bullet Points */}
                <motion.ul 
                  className="space-y-3 text-gray-600 font-paragraph"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {[
                    'Inclusive learning that welcomes every child',
                    'Resilience through community and care',
                    'Innovation grounded in local context',
                    'Accountability and partnership'
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
                </motion.ul>
              </div>
            </div>

            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link 
                href="/about/our-story" 
                className="inline-flex items-center justify-center border border-black rounded-full px-6 py-3 text-gray-900 font-heading-semibold hover:bg-gray-50 transition-all duration-300 text-base sm:text-lg"
              >
                Find out more
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}

// Programs Section Component
function ProgramsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const programs = [
    {
      number: 1,
      title: 'Primary Education',
      description: 'Jasper Primary School provides quality primary education for learners from Primary One to Primary Six. We offer a strong academic foundation that supports lifelong learning through a balanced curriculum, dedicated teachers, and learner-centred teaching methods.'
    },
    {
      number: 2,
      title: 'Teacher Empowerment',
      description: 'We believe that teacher empowerment is essential for quality education. Through workshops and training programs, we enhance teachers\' leadership, communication, and collaboration skills so they can be better mentors for students and the community.'
    },
    {
      number: 3,
      title: 'ECD Education',
      description: 'Our Early Childhood Development program consists of Baby Class, Middle Class, and Top Class. Through play-based learning and guided activities, we focus on developing early literacy, numeracy, social skills, creativity, and confidence.'
    },
    {
      number: 4,
      title: 'Jasper Community Education Program',
      description: 'A holistic community empowerment initiative designed to strengthen the knowledge, skills, and socio-economic well-being of parents, youth, and community leaders through adult literacy, digital skills, climate change awareness, and financial literacy.'
    }
  ]

  return (
    <section id="programs" ref={sectionRef} className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Our Programs
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side - Image */}
          <div className="lg:col-span-5 order-1">
            <motion.div 
              className="relative w-full h-96 sm:h-[500px] lg:h-[600px] rounded-tr-[3rem] overflow-hidden mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/jps1.jpeg"
                alt="Jasper Primary School programs"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center text-school-green font-heading-semibold hover:text-school-green/80 transition-colors group/link"
              >
                Learn More
                <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Numbered Cards Grid */}
          <div className="lg:col-span-7 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-school-green/10 text-school-green flex items-center justify-center mb-4">
                    <span className="text-xl font-heading-semibold">{program.number}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-heading-semibold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 font-paragraph leading-relaxed">
                    {program.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <section id="get-involved" ref={sectionRef} className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-gray-50 relative overflow-hidden">
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
              className="bg-white rounded-2xl border border-gray-200 p-8 transition-all duration-300 group flex flex-col h-full"
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

      {/* Programs Section */}
      <ProgramsSection />

      {/* Get Involved Section */}
      <GetInvolvedSection />

      <Footer />
    </main>
  )
}
