'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Helper function to create slug from name
function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

interface TeamMember {
  name: string
  role: string
  education?: string
  profile?: string
  achievements?: string[]
  imageSrc?: string
  email?: string
  linkedin?: string
  twitter?: string
}

export default function TeamPage() {
  const boardMembers: TeamMember[] = [
    {
      name: 'Arjun B K',
      role: 'Board Member',
      education: 'Skidmore College - Economics and Mathematics',
      profile: `Arjun's story begins where opportunity often does not: born into a low-income, low caste family in Nepal, where the system was not built for people like him. His parents, who could not write their own names, went to great lengths to give him a single asset: an education. He became the first in his family to graduate from high school and university, achieving both on full financial aid. Not as a privilege, but as a necessity.

His path was transformed when the Collaborative Schools Network arrived at his public school, Jana Uddhar, following the 2015 earthquake. For the first time, he experienced what happens when a system is truly designed for students like him: innovative curriculum, invested teachers, and strong leadership. Driven to give back, he returned to teach at Jana Uddhar before being selected to attend United World College Robert Bosch in Freiburg, Germany, for grades 11 and 12. There, surrounded by students from around the world, he saw how education could unite people and change lives. He went on to Skidmore College in New York, where he graduated with degrees in Economics and Mathematics, each step reinforcing his mission to pay this opportunity forward.

Now, as a board member, Arjun brings both analytical rigor and lived experience. His work as a Tax Associate gives him the skills to evaluate strategy, manage finances responsibly, and help with fundraising. But what drives his work is straightforward: he knows what transformative education looks like because he has lived it, and he is committed to ensuring that same opportunity is available to every child at Jasper.`,
      achievements: [],
      imageSrc: '/images/leadership/arjun_headshot.jpeg'
    },
    {
      name: 'Erick Mulindi',
      role: 'Board Chair',
      education: 'Skidmore College - Computer Science',
      profile: `Erick grew up a refugee in Kyangwali refugee settlement in Western Uganda, where access to education was never guaranteed, and where most dreams were shaped by survival rather than opportunity. Growing up in a community of displacement taught him resilience, responsibility, and the belief that education is not just a path upward; it is a lifeline.

After graduating from secondary school, Erick earned a place at the African Leadership Academy (ALA) in South Africa, a school committed to developing the next generation of African Leaders. At ALA, Erick learned what education could become when it is rooted in purpose and empowerment. He later attended Skidmore College in New York, where he graduated with a degree in Computer Science. Erick is currently a software engineer at Amazon, working for Amazon Web Services (AWS). Each step of his journey reinforced a simple truth: talent is universal, but opportunity is not.

As a board member of Jasper, Erick brings strategic thinking, a deep understanding of community-centered development, and lived experience with the very barriers Jasper exists to address. His background in software development allows him to support Jasper's long-term systems planning and digital innovation in education, while his personal story keeps the school grounded in its mission. He knows what it means to grow up in a place where education can change everything. Erick's commitment is clear: to build schools where every child can see a future they did not know was possible, and to ensure that Jasper becomes a place where hope is not just imagined, but realized.`,
      achievements: [],
      imageSrc: '/images/leadership/erick_headshot.JPG'
    },
    {
      name: 'Fineas Jackson',
      role: 'Board Member',
      education: 'Skidmore College - Computer Science; Fordham University - Master\'s in Quantitative Finance',
      profile: `Early on, Fineas became fascinated by systems—financial, technical, and social—and how they can be designed either to concentrate advantage or to widen it. That question has shaped his education, his work, and his commitment to Jasper.

Fineas studied Computer Science at Skidmore College in New York, where he spent as much time building projects and startups as he did in lectures. At Skidmore, he met classmates whose journeys began in places very different from his own. Their stories made something clear: talent is everywhere, but the systems that recognize and reward it are not. He is now pursuing a Master's in Quantitative Finance at Fordham University, deepening his understanding of how capital moves, who it serves, and how it can be redirected toward long-term, equitable outcomes.

As a board member at Jasper, Fineas brings a combination of technical expertise, financial discipline, and long-term thinking. His background in software and quantitative finance allows him to support Jasper's strategic planning, data systems, and economic model—from how the school raises money to how it stewards dollars. More importantly, he is driven by a simple belief: capital and technology should expand, not limit, who gets a real chance. At Jasper, his commitment is to help build an institution that is financially resilient, relentlessly student-centered, and capable of proving that when you design a school around those who are most often excluded, everyone's future gets bigger.`,
      achievements: [],
      imageSrc: '/images/leadership/fineas_headshot.jpg'
    },
    {
      name: 'Eric Ayamba',
      role: 'Board Member',
      education: 'United States International University-Africa - Bachelor of Science in Finance with concentration in Economics',
      profile: `Eric Ayamba is an educator and visionary leader passionate about harnessing education as a catalyst for transforming rural communities into self-reliant and sustainable societies. He holds a Bachelor of Science in Finance with a concentration in Economics from United States International University-Africa and has cultivated expertise in economics, econometrics, and rural education transformation. In 2022, Eric expanded his global perspective by studying Economics for Developing Countries at Sciences Po, France, where he deepened his understanding of policy formulation for low-income and developing nations.

As the Co-Founder of Jasper Schools Uganda, established in 2025, Eric leads the organization's flagship institution, Jasper Primary School in Nyairongo, Uganda, where he has strengthened community partnerships, implemented efficient administrative systems, and enhanced the school's community profile. Under his leadership, Jasper has built partnerships with leading institutions such as the African Leadership Academy, advancing its mission to eliminate barriers to quality education in rural areas.

He was awarded the Little Bets Challenge by ALforEducation during the 2024 gathering in Johannesburg, South Africa, which supported his establishment of community hubs promoting gender equity in education, leading to increased school enrolment for young girls in Nyairongo. He was also part of the inaugural cohort of the Edupreneur Growth Lab in 2021 and the Cohort 4 Apprenticeship Program under ALforEducation, experiences that built his understanding of Africa's state of education and strengthened his commitment to designing education solutions across the continent and the Global South at large.

Guided by the belief that "no child should be denied education because of gender or location," Eric continues to champion transformative educational models that empower communities and inspire sustainable development.`,
      achievements: [
        'Awarded Little Bets Challenge by ALforEducation',
        'Co-founder, Jasper Schools Uganda',
        'Edupreneur Growth Lab Cohort 2021'
      ],
      imageSrc: '/images/leadership/ayamba.jpeg'
    }
  ]

  const leadershipTeam: TeamMember[] = [
    {
      name: 'Eric Ayamba',
      role: 'Executive Director',
      education: 'United States International University-Africa - Bachelor of Science in Finance with concentration in Economics',
      profile: `Eric Ayamba is an educator and visionary leader passionate about harnessing education as a catalyst for transforming rural communities into self-reliant and sustainable societies. He holds a Bachelor of Science in Finance with a concentration in Economics from United States International University-Africa and has cultivated expertise in economics, econometrics, and rural education transformation. In 2022, Eric expanded his global perspective by studying Economics for Developing Countries at Sciences Po, France, where he deepened his understanding of policy formulation for low-income and developing nations.

As the Co-Founder of Jasper Schools Uganda, established in 2025, Eric leads the organization's flagship institution, Jasper Primary School in Nyairongo, Uganda, where he has strengthened community partnerships, implemented efficient administrative systems, and enhanced the school's community profile. Under his leadership, Jasper has built partnerships with leading institutions such as the African Leadership Academy, advancing its mission to eliminate barriers to quality education in rural areas.

He was awarded the Little Bets Challenge by ALforEducation during the 2024 gathering in Johannesburg, South Africa, which supported his establishment of community hubs promoting gender equity in education, leading to increased school enrolment for young girls in Nyairongo. He was also part of the inaugural cohort of the Edupreneur Growth Lab in 2021 and the Cohort 4 Apprenticeship Program under ALforEducation, experiences that built his understanding of Africa's state of education and strengthened his commitment to designing education solutions across the continent and the Global South at large.

Guided by the belief that "no child should be denied education because of gender or location," Eric continues to champion transformative educational models that empower communities and inspire sustainable development.`,
      achievements: [
        'Awarded Little Bets Challenge by ALforEducation',
        'Co-founder, Jasper Schools Uganda',
        'Edupreneur Growth Lab Cohort 2021'
      ],
      imageSrc: '/images/leadership/ayamba.jpeg'
    },
    {
      name: 'Milton Edodi',
      role: 'Programs Director',
      education: 'United States International University-Africa - Bachelor of Science in International Business Administration (Management)',
      profile: `Milton Edodi is a Mastercard Foundation Scholar pursuing a Bachelor of Science in International Business Administration (Management) at the United States International University-Africa (USIU-Africa) and the Co-Founder of Jasper Primary School in western Uganda. Driven by a strong commitment to educational transformation, strategic leadership, mentorship, and evidence-informed decision-making, he seeks to shape progressive education systems that foster innovation, inclusion, and sustainable development across Africa.

Through his leadership at Jasper Primary School, Milton has played a pivotal role in strengthening community partnerships, enhancing school management systems, and promoting inclusive learning opportunities for children in rural Uganda. His extensive volunteer experience with the World Food Programme (WFP), World Vision, Save the Children, Lutheran World Federation (LWF), and Alight has deepened his understanding of the link between education, child protection, and community development. Guided by integrity, excellence, empathy, and resilience, Milton continues to champion education as a powerful driver of social and economic transformation, envisioning a future where every child regardless of background, has access to quality learning and the opportunity to thrive.`,
      achievements: [
        'Mastercard Foundation Scholar',
        'Volunteer with WFP, World Vision, and Save the Children',
        'Co-founder, Jasper Primary School'
      ],
      imageSrc: '/images/leadership/milton.jpg'
    },
    {
      name: 'Byaruhanga Erisha',
      role: 'Finance Director',
      education: 'United States International University–Africa - Bachelor\'s degree in International Business Administration',
      profile: `Erisha is a passionate student at United States International University–Africa, pursuing a Bachelor's degree in International Business Administration. He is deeply driven by a commitment to education, community empowerment, and youth development.

As the Co-founder of Jasper Primary School- Nyairongo, Erisha plays a key role in improving access to quality education for children in underserved communities. His vision for the school is rooted in his belief that education is a powerful tool for breaking cycles of poverty and unlocking potential among young learners.

Before joining university, Erisha volunteered with Save the Children International for about two years as a Community Learning Facilitator in Kyangwali Refugee Settlement. In this role, he worked with children from diverse backgrounds to strengthen their literacy and numeracy skills, create inclusive learning spaces, and support teachers in delivering effective lessons. This experience not only deepened his love for education but also strengthened his leadership, communication, and mentorship abilities.

Through his academic journey and community work, Erisha continues to seek innovative ways to bridge educational gaps, nurture young minds, and inspire change within his community and beyond.`,
      achievements: [
        'Community Learning Facilitator, Save the Children International',
        '2+ years of refugee community engagement',
        'Co-founder, Jasper Primary School'
      ],
      imageSrc: '/images/leadership/erisha.jpeg'
    },
    {
      name: 'Erick Mulindi',
      role: 'Strategy and Innovation Director',
      education: 'Skidmore College - Computer Science',
      profile: `Erick grew up a refugee in Kyangwali refugee settlement in Western Uganda, where access to education was never guaranteed, and where most dreams were shaped by survival rather than opportunity. Growing up in a community of displacement taught him resilience, responsibility, and the belief that education is not just a path upward; it is a lifeline.

After graduating from secondary school, Erick earned a place at the African Leadership Academy (ALA) in South Africa, a school committed to developing the next generation of African Leaders. At ALA, Erick learned what education could become when it is rooted in purpose and empowerment. He later attended Skidmore College in New York, where he graduated with a degree in Computer Science. Erick is currently a software engineer at Amazon, working for Amazon Web Services (AWS). Each step of his journey reinforced a simple truth: talent is universal, but opportunity is not.

As a board member of Jasper, Erick brings strategic thinking, a deep understanding of community-centered development, and lived experience with the very barriers Jasper exists to address. His background in software development allows him to support Jasper's long-term systems planning and digital innovation in education, while his personal story keeps the school grounded in its mission. He knows what it means to grow up in a place where education can change everything. Erick's commitment is clear: to build schools where every child can see a future they did not know was possible, and to ensure that Jasper becomes a place where hope is not just imagined, but realized.`,
      achievements: [],
      imageSrc: '/images/leadership/erick_headshot.JPG'
    },
    {
      name: 'Sunday Amon',
      role: 'Operations Manager',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/leadership/sunday.jpg'
    }
  ]


  // Positioning for same-level row arrangement (Board Members only)
  const getTrophyPosition = (index: number) => {
    // All four at the same level in a row, centered horizontally
    const positions = [
      { top: '20%', left: '-27%', rotate: -2, zIndex: 2, scale: 1.0 }, // Left (Arjun)
      { top: '20%', left: '-9%', rotate: 0, zIndex: 3, scale: 1.0 },   // Left-center (Erick)
      { top: '20%', left: '9%', rotate: 0, zIndex: 3, scale: 1.0 },    // Right-center (Fineas)
      { top: '20%', left: '27%', rotate: 2, zIndex: 2, scale: 1.0 }   // Right (Eric)
    ]
    return positions[index] || positions[0]
  }

  // Positioning for overlapping collage effect - inspired by natural, organic layout
  const getPosition = (index: number, total: number) => {
    // Natural, spread-out arrangement with subtle corner overlaps
    // Varying sizes and positions for organic feel - ensuring all faces are visible
    const positions = [
      { top: '0%', left: '-35%', rotate: -5, zIndex: 1, scale: 1.0 },
      { top: '40%', left: '-30%', rotate: 4, zIndex: 2, scale: 0.95 },
      { top: '10%', left: '-10%', rotate: -3, zIndex: 3, scale: 1.05 },
      { top: '5%', left: '18%', rotate: 6, zIndex: 4, scale: 0.9 },
      { top: '45%', left: '8%', rotate: -4, zIndex: 5, scale: 1.0 },
      { top: '3%', left: '35%', rotate: -6, zIndex: 6, scale: 1.1 },
      { top: '42%', left: '33%', rotate: 5, zIndex: 7, scale: 0.95 },
      { top: '48%', left: '-12%', rotate: 3, zIndex: 8, scale: 1.0 }
    ]
    return positions[index % positions.length]
  }

  // Team Hero Section Component with Slideshow
  function TeamHeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const slides = [
      '/images/teampage/team_a.jpg',
      '/images/teampage/team_b.jpg',
      '/images/teampage/team_c.jpg',
      '/images/teampage/team_d.jpg',
    ]

    // Auto-advance slideshow
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)

      return () => clearInterval(interval)
    }, [slides.length])

    return (
      <section className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] flex flex-col lg:flex-row">
        {/* Left Panel - Text and Buttons */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-school-yellow/5 rounded-full blur-3xl" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto lg:mx-0 relative z-10"
          >
            <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-light text-white mb-4 sm:mb-6 leading-[1.1]">
              Know our Team
            </h1>
            <p className="text-sm sm:text-base text-white/90 font-paragraph leading-relaxed max-w-xl">
              Behind Jasper Primary School's work is a team of passionate and skilled professionals who are dedicated to fostering education, leadership, and growth for disadvantaged youth.
            </p>
          </motion.div>
        </div>

        {/* Right Panel - Image Slideshow */}
        <div className="w-full lg:w-1/2 relative bg-white min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-full overflow-hidden">
          {/* Slideshow Container */}
          <div className="relative w-full h-full bg-white">
            {slides.map((slide, index) => (
              <motion.div
                key={`slide-${index}`}
                initial={false}
                animate={{ 
                  opacity: index === currentSlide ? 1 : 0,
                }}
                transition={{ 
                  duration: 1.0,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="absolute inset-0 bg-white"
                style={{ 
                  zIndex: index === currentSlide ? 10 : 1
                }}
              >
                <Image
                  src={slide}
                  alt={`Team photo ${index + 1}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center center' }}
                  priority={index === 0}
                  unoptimized
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Helper function to render social media icons (responsive)
  const renderSocialIcons = (member: TeamMember) => (
    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-2.5 md:right-2.5 flex gap-1 sm:gap-1.5 z-10">
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm touch-manipulation"
          aria-label="Email"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      ) : (
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/60 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm touch-manipulation"
          aria-label="LinkedIn"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433c-1.144 0-2.067-.925-2.067-2.067C3.27 4.225 4.193 3.3 5.337 3.3c1.142 0 2.066.925 2.066 2.066 0 1.142-.924 2.067-2.066 2.067zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      ) : (
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/60 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433c-1.144 0-2.067-.925-2.067-2.067C3.27 4.225 4.193 3.3 5.337 3.3c1.142 0 2.066.925 2.066 2.066 0 1.142-.924 2.067-2.066 2.067zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      )}
      {member.twitter ? (
        <a
          href={member.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm touch-manipulation"
          aria-label="X (Twitter)"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.406l-5.02-6.545-5.743 6.545H1.922l7.73-8.81L1.5 2.25h6.594l4.533 5.988 5.617-5.988zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      ) : (
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/60 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.406l-5.02-6.545-5.743 6.545H1.922l7.73-8.81L1.5 2.25h6.594l4.533 5.988 5.617-5.988zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )}
    </div>
  )

  const renderCollage = (members: TeamMember[], sectionTitle: string) => {
    return (
      <section className={`py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 ${sectionTitle === 'Board Members' ? 'bg-white' : sectionTitle === 'Leadership and Management Team' ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Title and Description */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-school-blue mb-4 sm:mb-5 md:mb-6">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-paragraph">
              {sectionTitle === 'Board Members' 
                ? "Our team brings a wealth of experience from leading educational institutions, international organizations, and community development initiatives, driving transformative education in rural Uganda."
                : sectionTitle === 'Leadership and Management Team'
                ? "Our leadership team brings together diverse expertise and shared commitment to advancing Jasper's mission of providing quality education in rural Uganda."
                : "Our dedicated staff bring passion, expertise, and commitment to creating an inspiring learning environment for every student at Jasper Primary School."}
            </p>
          </div>
        </div>

        {/* Mobile and Tablet Stack Layout */}
        <div className="lg:hidden w-full px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl sm:max-w-4xl mx-auto">
            {members.map((member, index) => {
              const content = (
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border-2 md:border-[3px] lg:border-4 border-school-green">
                  {member.imageSrc ? (
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                      <span className="text-2xl sm:text-4xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  {/* Social Media Icons - Top Right */}
                  {renderSocialIcons(member)}
                  {/* Overlay with name - always visible on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                    <div className="w-full p-2 sm:p-3 md:p-4">
                      <h3 className="text-white font-heading-bold text-xs sm:text-sm md:text-base mb-0.5">{member.name}</h3>
                      <p className="text-white/90 font-paragraph text-[10px] sm:text-xs md:text-sm line-clamp-1">{member.role}</p>
                    </div>
                  </div>
                </div>
              )
              
              return (
                <motion.div
                  key={member.name}
                  className={`relative ${sectionTitle === 'Staff' ? 'group' : 'cursor-pointer group'}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {sectionTitle === 'Staff' ? content : (
                    <Link href={`/about/team/${createSlug(member.name)}`}>
                      {content}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Desktop Layout - Flexbox for Board Members, Collage for others */}
        {sectionTitle === 'Board Members' && members.length === 4 ? (
          <div className="hidden lg:flex w-full items-center justify-center py-6 lg:py-8 xl:py-10 overflow-x-auto px-4">
            <div className="flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
              {members.map((member, index) => {
                const position = getTrophyPosition(index)
                return (
                  <motion.div
                    key={member.name}
                    className="relative cursor-pointer group flex-shrink-0"
                    style={{
                      width: 'clamp(200px, 22vw, 280px)',
                      height: 'clamp(280px, 30vw, 380px)',
                      transform: `rotate(${position.rotate}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/about/team/${createSlug(member.name)}`}>
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border-4 border-school-green">
                        {member.imageSrc ? (
                          <Image
                            src={member.imageSrc}
                            alt={member.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                            <span className="text-2xl sm:text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        {/* Social Media Icons - Top Right */}
                        {renderSocialIcons(member)}
                        {/* Overlay with name - always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                          <div className="w-full p-2 sm:p-3 lg:p-4">
                            <h3 className="text-white font-heading-bold text-xs sm:text-sm lg:text-base mb-0.5">{member.name}</h3>
                            <p className="text-white/90 font-paragraph text-[10px] sm:text-xs lg:text-sm line-clamp-1">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : sectionTitle === 'Staff' || sectionTitle === 'Leadership and Management Team' ? (
          <div className="hidden lg:block w-full py-6 lg:py-8 xl:py-10 overflow-x-auto px-4">
            <div className="flex flex-col items-center gap-6 lg:gap-8 xl:gap-10">
              {/* First row - 5 items */}
              <div className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
                {members.slice(0, 5).map((member, index) => {
                  const content = (
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border-2 md:border-[3px] lg:border-4 border-school-green">
                      {member.imageSrc ? (
                        <Image
                          src={member.imageSrc}
                          alt={member.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                          <span className="text-2xl sm:text-4xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      {/* Social Media Icons - Top Right */}
                      {renderSocialIcons(member)}
                      {/* Overlay with name - always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                        <div className="w-full p-2 sm:p-3 lg:p-4">
                          <h3 className="text-white font-heading-bold text-xs sm:text-sm lg:text-base mb-0.5">{member.name}</h3>
                          <p className="text-white/90 font-paragraph text-[10px] sm:text-xs lg:text-sm line-clamp-1">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  )
                  
                  return (
                    <motion.div
                      key={member.name}
                      className={`relative ${sectionTitle === 'Staff' ? 'group' : 'cursor-pointer group'}`}
                      style={{
                        width: 'clamp(160px, 18vw, 240px)',
                        height: 'clamp(220px, 25vw, 320px)',
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {sectionTitle === 'Staff' ? content : (
                        <Link href={`/about/team/${createSlug(member.name)}`}>
                          {content}
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              {/* Second row - remaining items (4 items) */}
              {members.length > 5 && (
                <div className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
                  {members.slice(5).map((member, index) => {
                    const content = (
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border-2 md:border-[3px] lg:border-4 border-school-green">
                        {member.imageSrc ? (
                          <Image
                            src={member.imageSrc}
                            alt={member.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                            <span className="text-2xl sm:text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        {/* Social Media Icons - Top Right */}
                        {renderSocialIcons(member)}
                        {/* Overlay with name - always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                          <div className="w-full p-2 sm:p-3 lg:p-4">
                            <h3 className="text-white font-heading-bold text-xs sm:text-sm lg:text-base mb-0.5">{member.name}</h3>
                            <p className="text-white/90 font-paragraph text-[10px] sm:text-xs lg:text-sm line-clamp-1">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    )
                    
                    return (
                      <motion.div
                        key={member.name}
                        className={`relative ${sectionTitle === 'Staff' ? 'group' : 'cursor-pointer group'}`}
                        style={{
                          width: 'clamp(160px, 18vw, 240px)',
                          height: 'clamp(220px, 25vw, 320px)',
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
                      >
                        {sectionTitle === 'Staff' ? content : (
                          <Link href={`/about/team/${createSlug(member.name)}`}>
                            {content}
                          </Link>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex w-full items-center justify-center overflow-hidden py-6 lg:py-8 xl:py-10 px-4">
            <div className="relative flex items-center justify-center" style={{ minHeight: '500px', width: '100%', maxWidth: '1400px' }}>
                {members.map((member, index) => {
                  const position = getPosition(index, members.length)
                  // Convert percentage-based left positioning to centered flexbox with overlap
                  // Parse the left percentage (e.g., '-35%' -> -35)
                  const leftPercent = position.left ? parseFloat(position.left) : 0
                  // Convert to viewport-based offset for better centering - responsive scaling
                  const leftOffset = `${leftPercent * 0.5}vw` // Scale down spread for better centering
                  return (
                    <motion.div
                      key={member.name}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `calc(50% + ${leftOffset})`,
                        top: position.top,
                        width: `clamp(150px, ${20 * (position.scale || 1)}vw, ${260 * (position.scale || 1)}px)`,
                        height: `clamp(200px, ${26 * (position.scale || 1)}vw, ${340 * (position.scale || 1)}px)`,
                        transform: `translateX(-50%) rotate(${position.rotate}deg) scale(${position.scale || 1})`,
                        zIndex: position.zIndex || (members.length - index)
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/about/team/${createSlug(member.name)}`}>
                        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border-2 md:border-[3px] lg:border-4 border-school-green">
                          {member.imageSrc ? (
                            <Image
                              src={member.imageSrc}
                              alt={member.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                              <span className="text-2xl sm:text-4xl font-bold text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                          {/* Social Media Icons - Top Right */}
                          {renderSocialIcons(member)}
                          {/* Overlay with name - always visible */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                            <div className="w-full p-2 sm:p-3 lg:p-4">
                              <h3 className="text-white font-heading-bold text-xs sm:text-sm lg:text-base mb-0.5">{member.name}</h3>
                              <p className="text-white/90 font-paragraph text-[10px] sm:text-xs lg:text-sm line-clamp-1">{member.role}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Two-Panel Layout */}
      <TeamHeroSection />

      {/* Board Members Section with Collage */}
      {renderCollage(boardMembers, 'Board Members')}

      {/* Leadership and Management Team Section */}
      {renderCollage(leadershipTeam, 'Leadership and Management Team')}

      {/* Call to Action */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 mb-3 sm:mb-4 md:mb-5">
            Join Our Mission
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 font-paragraph px-2">
            Together, we can empower communities and transform lives through quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4">
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto touch-manipulation"
              style={{ padding: '14px 28px', minHeight: '48px' }}
            >
              Donate Now
            </Link>
            <Link 
              href="/#contact" 
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 border border-black/20 w-full sm:w-auto touch-manipulation"
              style={{ padding: '14px 28px', minHeight: '48px' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}
