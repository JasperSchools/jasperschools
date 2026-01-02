'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProgramsPage() {
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
            Our Programs
          </motion.h1>
          <div className="text-green-100 text-sm sm:text-base max-w-3xl mx-auto font-paragraph">
            {['Comprehensive', 'education', 'programs', 'designed', 'to', 'nurture', 'every', 'child\'s', 'potential'].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + (index * 0.15),
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Education Section */}
      <PrimaryEducationSection />

      {/* Teacher Empowerment Section */}
      <TeacherEmpowermentSection />

      {/* ECD Education Section */}
      <ECDEducationSection />

      {/* Jasper Community Education Program Section */}
      <JCEPSection />

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-gray-900 mb-4">
            Support Our Programs
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 font-paragraph">
            Help us continue providing quality education and empowering teachers to transform lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
              style={{ padding: '16px 32px' }}
            >
              Donate Now
            </Link>
            <Link 
              href="/sponsor" 
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300 border border-black/20"
              style={{ padding: '16px 32px' }}
            >
              Sponsor a Child
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Primary Education Section Component
function PrimaryEducationSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content - Left Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              1. Primary Education
            </motion.h2>
            
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Jasper Primary School offers primary education for students from Primary One to Primary Six.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Jasper Primary School provides quality primary education for learners from Primary One to Primary Six. We offer a strong academic foundation that supports lifelong learning. Our program is designed to nurture literacy, numeracy and leadership development in a safe and supportive environment.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Through a balanced curriculum, dedicated teachers, and learner-centred teaching methods, we ensure that every child develops the skills, values, and confidence needed to succeed academically and socially. At Jasper Primary School, we are committed to holistic education that prepares pupils not only for the next level of schooling but also to become responsible and active members of their communities.
              </motion.p>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            >
              <Image
                src="/images/jps1.jpeg"
                alt="Primary education students at Jasper Primary School"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Teacher Empowerment Section Component
function TeacherEmpowermentSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image - Left Side */}
          <div className="lg:col-span-5 order-1">
            <motion.div 
              className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            >
              <Image
                src="/images/jps6.jpeg"
                alt="Teachers at Jasper Primary School"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Content - Right Side */}
          <div className="lg:col-span-7 order-2">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              2. Teacher Empowerment
            </motion.h2>
            
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                At Jasper, we believe that teacher empowerment is an important part of offering quality education. It is because of this belief that we used the opportunity offered by the ALforEducation apprenticeship program to empower our teachers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                The apprenticeship program empowered teachers to enhance their leadership, communication, and collaboration skills so they can be better mentors for each other, the community and their pupils. The teacher empowerment program entailed a series of workshops were the teachers learned to use virtual workspaces, shared digital devices and learned about communication in the workplace, leadership and teamwork.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ECD Education Section Component
function ECDEducationSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content - Left Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              3. Early Childhood Education (ECD)
            </motion.h2>
            
            <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Jasper Primary School offers a nurturing and well-structured Early Childhood Development (ECD) program designed to give young learners a strong start to their educational journey. Our ECD section consists of Baby Class, Middle Class, and Top Class, catering to the developmental needs of children in their formative years.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Through play-based learning, guided activities, and a caring environment, we focus on developing early literacy, numeracy, social skills, creativity, and confidence. Our dedicated teachers create a safe and stimulating space where children learn through interaction and fun, laying a solid foundation for a smooth transition into primary education.
              </motion.p>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
            >
              <Image
                src="/images/jps2.jpeg"
                alt="Early Childhood Development students at Jasper Primary School"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Jasper Community Education Program Section Component
function JCEPSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          4. Jasper Community Education Program
        </motion.h2>
        
        <div className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed font-paragraph">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The Jasper Community Education Program (JCEP) is a holistic community empowerment initiative designed by Jasper Primary School to strengthen the knowledge, skills, and socio-economic well-being of parents, youth, and community leaders in Nyairongo, Kikuube District. Built on the belief that sustainable rural development requires educated, informed, and economically resilient households, JCEP creates a bridge between school and community, addressing the root causes of educational underperformance, poverty, gender inequality, and low digital adoption.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              This carefully crafted initiative integrates adult literacy, digital skills, climate change awareness, sustainable development training, livelihood empowerment, gender equity education, and financial literacy. Through structured community learning sessions, mentorship, economic empowerment groups, and participatory community dialogues, JCEP aims to transform Nyairongo into a knowledgeable, self-reliant, and future-ready community.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              The program was born out of the challenges faced by rural families: low literacy, limited livelihoods, climate change threats, gender disparities, and weak parental engagement in education. By weaving together adult education, climate literacy, gender equity, financial living skills, and community leadership, JCEP turns Jasper Primary School into a dynamic engine for community empowerment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              The hallmark of this approach is its inclusivity—parents, youth, guardians, and village opinion leaders learn together, strengthening family and community bonds while actively supporting children's academic journeys. This collaborative model ensures that the entire community grows together, creating a sustainable foundation for long-term transformation.
            </motion.p>
          </div>
      </div>
    </section>
  )
}

