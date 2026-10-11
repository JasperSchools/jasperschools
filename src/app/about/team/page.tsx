'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { teamMembers, createSlug, TeamMember } from '@/data/teamMembers'
import { FEATURES } from '@/config/features'

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
      imageSrc: '/images/leadership/arjun_headshot.jpeg',
      slug: 'arjun-b-k'
    },
    {
      name: 'Erick Mulindi',
      role: 'Board Chair',
      education: 'Skidmore College - Computer Science',
      profile: `Erick grew up a refugee in Kyangwali refugee settlement in Western Uganda, where access to education was never guaranteed, and where most dreams were shaped by survival rather than opportunity. Growing up in a community of displacement taught him resilience, responsibility, and the belief that education is not just a path upward; it is a lifeline.

After graduating from secondary school, Erick earned a place at the African Leadership Academy (ALA) in South Africa, a school committed to developing the next generation of African Leaders. At ALA, Erick learned what education could become when it is rooted in purpose and empowerment. He later attended Skidmore College in New York, where he graduated with a degree in Computer Science. Erick is currently a software engineer at Amazon, working for Amazon Web Services (AWS). Each step of his journey reinforced a simple truth: talent is universal, but opportunity is not.

As a board member of Jasper, Erick brings strategic thinking, a deep understanding of community-centered development, and lived experience with the very barriers Jasper exists to address. His background in software development allows him to support Jasper's long-term systems planning and digital innovation in education, while his personal story keeps the school grounded in its mission. He knows what it means to grow up in a place where education can change everything. Erick's commitment is clear: to build schools where every child can see a future they did not know was possible, and to ensure that Jasper becomes a place where hope is not just imagined, but realized.`,
      achievements: [],
      imageSrc: '/images/leadership/erick_headshot.JPG',
      slug: 'erick-mulindi'
    },
    {
      name: 'Fineas Jackson',
      role: 'Board Member',
      education: 'Skidmore College - Computer Science; Fordham University - Master\'s in Quantitative Finance',
      profile: `Early on, Fineas became fascinated by systems—financial, technical, and social—and how they can be designed either to concentrate advantage or to widen it. That question has shaped his education, his work, and his commitment to Jasper.

Fineas studied Computer Science at Skidmore College in New York, where he spent as much time building projects and startups as he did in lectures. At Skidmore, he met classmates whose journeys began in places very different from his own. Their stories made something clear: talent is everywhere, but the systems that recognize and reward it are not. He is now pursuing a Master's in Quantitative Finance at Fordham University, deepening his understanding of how capital moves, who it serves, and how it can be redirected toward long-term, equitable outcomes.

As a board member at Jasper, Fineas brings a combination of technical expertise, financial discipline, and long-term thinking. His background in software and quantitative finance allows him to support Jasper's strategic planning, data systems, and economic model—from how the school raises money to how it stewards dollars. More importantly, he is driven by a simple belief: capital and technology should expand, not limit, who gets a real chance. At Jasper, his commitment is to help build an institution that is financially resilient, relentlessly student-centered, and capable of proving that when you design a school around those who are most often excluded, everyone's future gets bigger.`,
      achievements: [],
      imageSrc: '/images/leadership/fineas_headshot.jpg',
      slug: 'fineas-jackson'
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
      imageSrc: '/images/leadership/ayamba.jpeg',
      slug: 'eric-ayamba'
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
      imageSrc: '/images/leadership/milton.jpg',
      slug: 'milton-edodi'
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
      imageSrc: '/images/leadership/erisha.jpeg',
      slug: 'byaruhanga-erisha'
    },
    {
      name: 'Sunday Amon',
      role: 'Operations Manager',
      education: 'Makerere University - Bachelor\'s degree in Adult and Community Education (in progress)',
      profile: `Sunday Amon was born in 2003 in western Uganda's Kikuube District, where access to quality education and digital resources was limited. His determination pushed him to excel from Nyarugongo Primary Public School then through Kitara secondary public school, where he completed Senior Six in 2023 with a focus on HED-Math where he served as Head Prefect.

His path shifted when he joined Makerere University under the MasterCard Foundation Scholars Program, gaining exposure to community leadership, social innovation, and digital tools for development. At Makerere, he was elected President of the Scholars Association and later became a Baobab Ambassador and ACN Peer Coach, roles that strengthened his skills in organizing teams, coordinating programs, and supporting students from marginalized backgrounds.

As Operations Manager at Jasper, Sunday brings hands on experience in community education, leadership, and project coordination. He is currently pursuing a Bachelor's degree in Adult and Community Education, training in planning, management, ICTs, and participatory development skills he applies to streamline systems, support school leaders, and keep programs aligned with Jasper's mission of inclusive, high quality education.`,
      achievements: [
        'Head Prefect, Kitara Secondary School',
        'MasterCard Foundation Scholar',
        'President, Scholars Association at Makerere University',
        'Baobab Ambassador',
        'ACN Peer Coach'
      ],
      imageSrc: '/images/leadership/sunday.jpg',
      slug: 'sunday-amon'
    }
  ]





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
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={85}
                  sizes="50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render team section with clean grid, cards with names/roles below pictures, and no icons
  const renderTeamSection = (members: TeamMember[], sectionTitle: string) => {
    const isBoard = sectionTitle === 'Board Members'

    return (
      <section className={`py-12 sm:py-16 lg:py-20 ${isBoard ? 'bg-white' : 'bg-gray-50 border-t border-gray-100'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Title and Description */}
          <div className="max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 text-center px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-school-blue mb-4 sm:mb-6">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-paragraph">
              {isBoard 
                ? "Our board brings a wealth of experience from leading educational institutions, international organizations, and community development initiatives, guiding transformative education in rural Uganda."
                : "Our leadership team brings together diverse expertise and shared commitment to advancing Jasper's mission of providing quality education in rural Uganda."}
            </p>
          </div>

          {/* Clean Profile Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isBoard ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4 max-w-7xl'} gap-6 sm:gap-8 lg:gap-10 mx-auto`}>
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link 
                  href={`/about/team/${createSlug(member.name)}`} 
                  className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Picture (without icons and without overlay text) */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    {member.imageSrc ? (
                      <Image
                        src={member.imageSrc}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                        <span className="text-3xl sm:text-4xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Role below the picture */}
                  <div className="p-5 text-center flex-grow flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl font-heading-bold text-gray-900 mb-1.5 group-hover:text-school-green transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-paragraph">
                      {member.role}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Two-Panel Layout */}
      <TeamHeroSection />

      {/* Board Members Section */}
      {renderTeamSection(boardMembers, 'Board Members')}

      {/* Leadership and Management Team Section */}
      {renderTeamSection(leadershipTeam, 'Leadership and Management Team')}

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
            {FEATURES.ENABLE_DONATIONS ? (
              <Link 
                href="/donate" 
                className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Donate Now
              </Link>
            ) : FEATURES.ENABLE_VOLUNTEER ? (
              <Link 
                href="/volunteer" 
                className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Volunteer With Us
              </Link>
            ) : (
              <Link 
                href="/about/our-story" 
                className="inline-flex items-center justify-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Our Story
              </Link>
            )}
            {FEATURES.ENABLE_CONTACT ? (
              <Link 
                href="/#contact" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 border border-black/20 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Get in Touch
              </Link>
            ) : FEATURES.ENABLE_CHILDREN_SPONSORSHIP ? (
              <Link 
                href="/sponsor" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 border border-black/20 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Sponsor a Child
              </Link>
            ) : (
              <Link 
                href="/about/vision-mission" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-heading-semibold rounded-full text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 border border-black/20 w-full sm:w-auto touch-manipulation"
                style={{ padding: '14px 28px', minHeight: '48px' }}
              >
                Vision & Mission
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
