'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
}

export default function TeamPage() {
  const topManagement: TeamMember[] = [
    {
      name: 'Eric Ayamba',
      role: 'Co-Founder & Educator',
      education: 'United States International University Africa (USIU-Africa)',
      profile: `Eric Ayamba is an educator and visionary leader passionate about harnessing education as a catalyst for transforming rural communities into self-reliant and sustainable societies. He holds a Bachelor of Science in Finance with a concentration in Economics from United States International University-Africa and has cultivated expertise in economics, econometrics, and rural education transformation.`,
      achievements: [
        'Awarded Little Bets Challenge by ALforEducation',
        'Co-founder, Jasper Schools Uganda',
        'Edupreneur Growth Lab Cohort 2021'
      ],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Byaruhanga Erisha',
      role: 'Co-Founder & Community Developer',
      education: 'United States International University–Africa (USIU-Africa)',
      profile: `Erisha is a passionate student at United States International University–Africa, pursuing a Bachelor's degree in International Business Administration. He is deeply driven by a commitment to education, community empowerment, and youth development.`,
      achievements: [
        'Community Learning Facilitator, Save the Children International',
        '2+ years of refugee community engagement',
        'Co-founder, Jasper Primary School'
      ],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Milton Edodi',
      role: 'Co-Founder & Strategic Leader',
      education: 'United States International University Africa (USIU-A)',
      profile: `Milton Edodi is a Mastercard Foundation Scholar pursuing a Bachelor of Science in International Business Administration (Management) at the United States International University-Africa and the Co-Founder of Jasper Primary School in western Uganda.`,
      achievements: [
        'Mastercard Foundation Scholar',
        'Volunteer with WFP, World Vision, and Save the Children',
        'Co-founder, Jasper Primary School'
      ],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Erick Mulindi',
      role: 'Executive Director',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    }
  ]

  const teachers: TeamMember[] = [
    {
      name: 'Jane Mukasa',
      role: 'Mathematics Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Peter Kato',
      role: 'Science Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Sarah Nakato',
      role: 'English Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'David Ochieng',
      role: 'Social Studies Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Mary Achieng',
      role: 'Arts Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'James Okello',
      role: 'Physical Education Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Grace Akello',
      role: 'Primary Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    },
    {
      name: 'Robert Ssemwogerere',
      role: 'Primary Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/eddie.jpg'
    }
  ]

  // Positioning for overlapping collage effect - centered with natural overlap
  const getPosition = (index: number, total: number) => {
    // Using pixel offsets from center to create natural overlap with more spacing
    const positions = [
      { top: '5%', left: '-240px', rotate: -8, zIndex: 7 },
      { top: '0%', left: '-80px', rotate: 5, zIndex: 6 },
      { top: '8%', left: '80px', rotate: -3, zIndex: 8 },
      { top: '3%', left: '240px', rotate: 7, zIndex: 5 },
      { top: '45%', left: '-270px', rotate: -6, zIndex: 4 },
      { top: '50%', left: '-110px', rotate: 4, zIndex: 9 },
      { top: '55%', left: '30px', rotate: -5, zIndex: 7 },
      { top: '52%', left: '210px', rotate: 6, zIndex: 6 }
    ]
    return positions[index % positions.length]
  }

  const renderCollage = (members: TeamMember[], sectionTitle: string) => {
    return (
      <section className={`py-8 sm:py-10 lg:py-12 ${sectionTitle === 'Top Management' ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Title and Description */}
          <div className="max-w-3xl mx-auto mb-8 lg:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-bold text-school-blue mb-6">
              {sectionTitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-paragraph">
              {sectionTitle === 'Top Management' 
                ? "Our team brings a wealth of experience from leading educational institutions, international organizations, and community development initiatives, driving transformative education in rural Uganda."
                : "Our dedicated teachers bring passion, expertise, and commitment to creating an inspiring learning environment for every student at Jasper Primary School."}
            </p>
          </div>

          {/* Centered Collage */}
          <div className="flex items-center justify-center w-full">
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]" style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
              {members.map((member, index) => {
                const position = getPosition(index, members.length)
                return (
                  <motion.div
                    key={member.name}
                    className="absolute cursor-pointer group"
                    style={{
                      top: position.top,
                      left: `calc(50% + ${position.left})`,
                      width: '200px',
                      height: '250px',
                      transform: `translateX(-50%) rotate(${position.rotate}deg)`,
                      zIndex: position.zIndex || (members.length - index)
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                  >
                    <Link href={`/about/team/${createSlug(member.name)}`}>
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
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
                            <span className="text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        {/* Overlay with name on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
                          <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-heading-bold text-lg mb-1">{member.name}</h3>
                            <p className="text-white/90 font-paragraph text-sm">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D4723' }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-heading-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Team
          </motion.h1>
          <div className="text-green-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-paragraph">
            {['Meet', 'the', 'dedicated', 'leaders', 'driving', 'transformative', 'education', 'in', 'rural', 'Uganda'].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + (index * 0.2),
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Top Management Section with Collage */}
      {renderCollage(topManagement, 'Top Management')}

      {/* Teachers Section with Collage */}
      {renderCollage(teachers, 'Teachers')}

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-paragraph">
            Together, we can empower communities and transform lives through quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-school-green text-white font-heading-semibold hover:bg-green-800 transition-colors text-lg"
            >
              Donate Now
            </Link>
            <Link 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-heading-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200 text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
