'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// About Section Component with Modern Animations
function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
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
          <div className="lg:col-span-6 order-2 lg:h-[500px] flex flex-col justify-between">
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
                className="group inline-flex items-center text-school-green/80 font-heading-semibold hover:text-school-green transition-colors sm:justify-center sm:border sm:border-gray-900 sm:rounded-full sm:px-6 sm:py-3 sm:bg-gray-900 sm:text-white sm:hover:bg-transparent sm:hover:text-gray-900 sm:hover:border-black sm:transition-all sm:duration-300 text-base sm:text-lg"
              >
                Find out more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      title: 'Early Childhood Education (ECD)',
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

// Stories of Impact Section
function StoriesOfImpact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false)

  const stories = [
    {
      quote: "Thanks to Jasper Schools, my daughter can now read and write. She dreams of becoming a teacher and helping other children like her. This has been invaluable for her, and we can tell she's been inspired by the quality education she's receiving.",
      author: "Grace M.",
      role: "Parent",
      image: "/images/jps2.jpeg"
    },
    {
      quote: "The meals program changed everything. Now students can focus on learning instead of hunger. Attendance has improved significantly, and we see more engagement in the classroom.",
      author: "Teacher John",
      role: "Primary Teacher",
      image: "/images/jps3.jpeg"
    },
    {
      quote: "I never thought I'd go to school. Now I'm top of my class. Thank you to everyone who donated and believed in us! When we speak with her, we hear how much more confident and at ease she's become.",
      author: "Samuel, 12",
      role: "Student",
      image: "/images/jps4.jpeg"
    },
    {
      quote: "The teacher training program has transformed how I teach. I now use innovative methods that make learning fun and effective. It's been great having access to quality professional development.",
      author: "Teacher Mary",
      role: "ECD Teacher",
      image: "/images/jps5.jpg"
    },
    {
      quote: "Through the community education program, I learned to read and write. Now I can help my children with their homework. This has empowered our entire family.",
      author: "Sarah K.",
      role: "Community Member",
      image: "/images/jps8.jpeg"
    },
    {
      quote: "Jasper Primary School gave me hope. I want to become a doctor and help my community. Education is the key to our future, and I'm grateful for this opportunity.",
      author: "Esther, 10",
      role: "Student",
      image: "/images/jps9.jpg"
    }
  ]

  const currentStory = stories[currentStoryIndex]

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length)
    // Pause auto-play when user manually navigates
    setIsAutoPlayPaused(true)
    // Resume auto-play after 5 seconds
    setTimeout(() => {
      setIsAutoPlayPaused(false)
    }, 5000) 
  }

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length)
    // Pause auto-play when user manually navigates
    setIsAutoPlayPaused(true)
    // Resume auto-play after 5 seconds
    setTimeout(() => {
      setIsAutoPlayPaused(false)
    }, 5000)
  }

  // Auto-advance carousel
  useEffect(() => {
    if (!isInView || isAutoPlayPaused) return

    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % stories.length)
    }, 5000) // Change story every 5 seconds

    return () => clearInterval(interval)
  }, [isInView, isAutoPlayPaused, stories.length])

  return (
    <section id="impact" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4">
            Stories of Impact
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-paragraph max-w-2xl mx-auto">
            Real stories from students, parents, teachers, and community members whose lives have been transformed
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Image Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full order-2 lg:order-1"
          >
            <div className="bg-white overflow-hidden border border-gray-200 rounded-tl-[2rem] sm:rounded-tl-[3rem] lg:rounded-tl-[4rem]">
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src="/images/jps8.jpeg"
                  alt="Jasper Primary School impact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Testimonial Carousel Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[120%] order-1 lg:order-2 flex flex-col gap-4 sm:gap-6"
          >
            {/* Review Content Card with Curved Border */}
            <div className="bg-white rounded-br-[2rem] sm:rounded-br-[3rem] lg:rounded-br-[4rem] p-5 sm:p-6 lg:p-8 xl:p-10 border border-gray-200 flex flex-col">
              {/* Testimonial Content */}
              <div className="flex-grow relative overflow-hidden min-h-[200px] sm:min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStoryIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <blockquote className="text-sm sm:text-base lg:text-lg text-gray-600 font-paragraph leading-relaxed mb-4 sm:mb-6">
                      &ldquo;{currentStory.quote}&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-school-green/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-base sm:text-lg lg:text-xl font-heading-semibold text-school-green">
                          {currentStory.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-heading-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                          {currentStory.author}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 font-paragraph">
                          {currentStory.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Review Summary with Navigation - Separate from review card */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200 relative">
              {/* Progress Indicator - Green dash on the border line */}
              <motion.div
                className="absolute top-[-1px] left-0 h-[2px] w-10 sm:w-12 bg-school-green"
                initial={{ left: 0 }}
                animate={{ left: `${(currentStoryIndex / (stories.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'translateX(-50%)' }}
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs sm:text-sm lg:text-base font-heading-semibold text-gray-900 whitespace-nowrap">
                      Read our {stories.length} impact stories
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={prevStory}
                    className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-school-green hover:bg-school-green text-school-green hover:text-white flex items-center justify-center transition-all duration-300 touch-manipulation"
                    aria-label="Previous story"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextStory}
                    className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-school-green hover:bg-school-green text-school-green hover:text-white flex items-center justify-center transition-all duration-300 touch-manipulation"
                    aria-label="Next story"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
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
      link: '/volunteer',
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

// Contact Section Component
function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section id="contact" ref={sectionRef} className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 border-t border-gray-200 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-school-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-school-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-4 sm:mb-6">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-paragraph">
            Get in touch with us. We'd love to hear from you and answer any questions you may have.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading-semibold text-gray-900 mb-4">
                Jasper Primary School
              </h3>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Our Address</h4>
                <p className="text-gray-600 font-paragraph">
                  Nyairongo village, Kikuube District, Western Uganda
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Our Email</h4>
                <a 
                  href="mailto:jasperschoolsuganda@gmail.com" 
                  className="text-school-green hover:text-school-green/80 font-paragraph transition-colors"
                >
                  jasperschoolsuganda@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-school-green/10 flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-school-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading-semibold text-gray-900 mb-1">Contacts</h4>
                <p className="text-gray-600 font-paragraph">
                  <a href="tel:+256770799066" className="text-school-green hover:text-school-green/80 transition-colors">
                    +256 770 799 066
                  </a>
                  {' / '}
                  <a href="tel:+256782972117" className="text-school-green hover:text-school-green/80 transition-colors">
                    +256 782 972 117
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/where-we-work"
            className="inline-flex items-center text-school-green font-heading-semibold hover:text-school-green/80 transition-colors group"
          >
            Learn more about where we work
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
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

      {/* Stories of Impact Section */}
      <StoriesOfImpact />

      {/* Get Involved Section */}
      <GetInvolvedSection />

      {/* Contact Section */}
      <ContactSection />

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}
