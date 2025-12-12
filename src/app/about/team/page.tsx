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
      ]
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
    }
  ]

  const staff: TeamMember[] = [
    {
      name: 'Dalious',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/dalious .jpg'
    },
    {
      name: 'Emmanuel',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/emmanuel.jpg'
    },
    {
      name: 'Eria',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/eria.jpg'
    },
    {
      name: 'Evelyn',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/evelyn.JPG'
    },
    {
      name: 'Evelyne',
      role: 'Bursar',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/evelyne bursar.jpg'
    },
    {
      name: 'Jakisa',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/jakisa.JPG'
    },
    {
      name: 'Seputa',
      role: 'Cook',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/seputa cook.jpg'
    },
    {
      name: 'Shillah',
      role: 'Staff Member',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/shillah.jpg'
    },
    {
      name: 'Yedidiya',
      role: 'P3 Teacher',
      education: '',
      profile: '',
      achievements: [],
      imageSrc: '/images/staff/yedidiya p3.jpg'
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

  const renderCollage = (members: TeamMember[], sectionTitle: string) => {
    return (
      <section className={`py-8 sm:py-10 lg:py-12 ${sectionTitle === 'Board Members' ? 'bg-white' : sectionTitle === 'Leadership and Management Team' ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Title and Description */}
          <div className="max-w-3xl mx-auto mb-8 lg:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading-bold text-school-blue mb-6">
              {sectionTitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-paragraph">
              {sectionTitle === 'Board Members' 
                ? "Our team brings a wealth of experience from leading educational institutions, international organizations, and community development initiatives, driving transformative education in rural Uganda."
                : sectionTitle === 'Leadership and Management Team'
                ? "Our leadership team brings together diverse expertise and shared commitment to advancing Jasper's mission of providing quality education in rural Uganda."
                : "Our dedicated staff bring passion, expertise, and commitment to creating an inspiring learning environment for every student at Jasper Primary School."}
            </p>
          </div>
        </div>

        {/* Mobile Stack Layout */}
        <div className="lg:hidden w-full px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-md mx-auto">
            {members.map((member, index) => {
              const content = (
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
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
                  {/* Overlay with name - always visible on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                    <div className="w-full p-2 sm:p-3">
                      <h3 className="text-white font-heading-bold text-xs sm:text-sm mb-0.5">{member.name}</h3>
                      <p className="text-white/90 font-paragraph text-[10px] sm:text-xs line-clamp-1">{member.role}</p>
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
                  whileHover={{ scale: 1.05, zIndex: 100 }}
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
          <div className="hidden lg:flex w-full items-center justify-center py-8">
            <div className="flex items-center justify-center gap-8 xl:gap-12">
              {members.map((member, index) => {
                const position = getTrophyPosition(index)
                return (
                  <motion.div
                    key={member.name}
                    className="relative cursor-pointer group"
                    style={{
                      width: 'clamp(180px, 20vw, 220px)',
                      height: 'clamp(240px, 26vw, 280px)',
                      transform: `rotate(${position.rotate}deg)`,
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
                            <span className="text-2xl sm:text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
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
          <div className="hidden lg:block w-full py-8">
            <div className="flex flex-col items-center gap-8">
              {/* First row - 5 items */}
              <div className="flex items-center justify-center gap-6 xl:gap-8">
                {members.slice(0, 5).map((member, index) => {
                  const content = (
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
                          <span className="text-2xl sm:text-4xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
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
                        width: 'clamp(140px, 15vw, 180px)',
                        height: 'clamp(180px, 20vw, 240px)',
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, zIndex: 100 }}
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
                <div className="flex items-center justify-center gap-6 xl:gap-8">
                  {members.slice(5).map((member, index) => {
                    const content = (
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
                            <span className="text-2xl sm:text-4xl font-bold text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
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
                          width: 'clamp(140px, 15vw, 180px)',
                          height: 'clamp(180px, 20vw, 240px)',
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
                        whileHover={{ scale: 1.05, zIndex: 100 }}
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
          <div className="hidden lg:flex w-full items-center justify-center overflow-visible py-8">
            <div className="relative flex items-center justify-center" style={{ minHeight: '550px', width: '100%', maxWidth: '1200px' }}>
                {members.map((member, index) => {
                  const position = getPosition(index, members.length)
                  // Convert percentage-based left positioning to centered flexbox with overlap
                  // Parse the left percentage (e.g., '-35%' -> -35)
                  const leftPercent = position.left ? parseFloat(position.left) : 0
                  // Convert to viewport-based offset for better centering
                  const leftOffset = `${leftPercent * 0.6}vw` // Scale down spread for better centering
                  return (
                    <motion.div
                      key={member.name}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `calc(50% + ${leftOffset})`,
                        top: position.top,
                        width: `clamp(100px, ${18 * (position.scale || 1)}vw, ${200 * (position.scale || 1)}px)`,
                        height: `clamp(120px, ${22 * (position.scale || 1)}vw, ${250 * (position.scale || 1)}px)`,
                        transform: `translateX(-50%) rotate(${position.rotate}deg) scale(${position.scale || 1})`,
                        zIndex: position.zIndex || (members.length - index)
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: (position.scale || 1) * 1.05, rotate: 0, zIndex: 100 }}
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
                              <span className="text-2xl sm:text-4xl font-bold text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
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

      {/* Board Members Section with Collage */}
      {renderCollage(boardMembers, 'Board Members')}

      {/* Leadership and Management Team Section */}
      {renderCollage(leadershipTeam, 'Leadership and Management Team')}

      {/* Staff Section */}
      {renderCollage(staff, 'Staff')}

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
