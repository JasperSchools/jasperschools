'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  education?: string
  profile?: string
  achievements?: string[]
  imageSrc?: string
  slug: string
}

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: 'Eric Ayamba',
    role: 'Board Member, Executive Director',
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
    slug: 'eric-ayamba',
    imageSrc: '/images/leadership/ayamba.jpeg'
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
    slug: 'byaruhanga-erisha',
    imageSrc: '/images/leadership/erisha.jpeg'
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
    role: 'Board Member, Strategy and Innovation Director',
    education: 'Skidmore College - Computer Science',
    profile: `Erick grew up a refugee in Kyangwali refugee settlement in Western Uganda, where access to education was never guaranteed, and where most dreams were shaped by survival rather than opportunity. Growing up in a community of displacement taught him resilience, responsibility, and the belief that education is not just a path upward; it is a lifeline.

After graduating from secondary school, Erick earned a place at the African Leadership Academy (ALA) in South Africa, a school committed to developing the next generation of African Leaders. At ALA, Erick learned what education could become when it is rooted in purpose and empowerment. He later attended Skidmore College in New York, where he graduated with a degree in Computer Science. Erick is currently a software engineer at Amazon, working for Amazon Web Services (AWS). Each step of his journey reinforced a simple truth: talent is universal, but opportunity is not.

As a board member of Jasper, Erick brings strategic thinking, a deep understanding of community-centered development, and lived experience with the very barriers Jasper exists to address. His background in software development allows him to support Jasper's long-term systems planning and digital innovation in education, while his personal story keeps the school grounded in its mission. He knows what it means to grow up in a place where education can change everything. Erick's commitment is clear: to build schools where every child can see a future they did not know was possible, and to ensure that Jasper becomes a place where hope is not just imagined, but realized.`,
    achievements: [],
    imageSrc: '/images/leadership/erick_headshot.JPG',
    slug: 'erick-mulindi'
  },
  {
    name: 'Sunday Amon',
    role: 'Operations Manager',
    education: '',
    profile: '',
    achievements: [],
    slug: 'sunday-amon',
    imageSrc: '/images/leadership/sunday.jpg'
  },
  {
    name: 'Fineas Jackson',
    role: 'Co-founder, CFO, Board Member',
    education: 'Skidmore College - Computer Science; Fordham University - Master\'s in Quantitative Finance',
    profile: `Early on, Fineas became fascinated by systems—financial, technical, and social—and how they can be designed either to concentrate advantage or to widen it. That question has shaped his education, his work, and his commitment to Jasper.

Fineas studied Computer Science at Skidmore College in New York, where he spent as much time building projects and startups as he did in lectures. At Skidmore, he met classmates whose journeys began in places very different from his own. Their stories made something clear: talent is everywhere, but the systems that recognize and reward it are not. He is now pursuing a Master's in Quantitative Finance at Fordham University, deepening his understanding of how capital moves, who it serves, and how it can be redirected toward long-term, equitable outcomes.

As a board member at Jasper, Fineas brings a combination of technical expertise, financial discipline, and long-term thinking. His background in software and quantitative finance allows him to support Jasper's strategic planning, data systems, and economic model—from how the school raises money to how it stewards dollars. More importantly, he is driven by a simple belief: capital and technology should expand, not limit, who gets a real chance. At Jasper, his commitment is to help build an institution that is financially resilient, relentlessly student-centered, and capable of proving that when you design a school around those who are most often excluded, everyone's future gets bigger.`,
    achievements: [],
    imageSrc: '/images/leadership/fineas_headshot.jpg',
    slug: 'fineas-jackson'
  },
  {
    name: 'Jane Mukasa',
    role: 'Mathematics Teacher',
    education: '',
    profile: `Jane Mukasa is a dedicated Mathematics Teacher at Jasper Primary School, passionate about making mathematics accessible and engaging for all students.`,
    achievements: [],
    slug: 'jane-mukasa'
  },
  {
    name: 'Peter Kato',
    role: 'Science Teacher',
    education: '',
    profile: `Peter Kato is an enthusiastic Science Teacher committed to fostering curiosity and scientific thinking among students.`,
    achievements: [],
    slug: 'peter-kato'
  },
  {
    name: 'Sarah Nakato',
    role: 'English Teacher',
    education: '',
    profile: `Sarah Nakato is a passionate English Teacher dedicated to improving literacy and communication skills in her students.`,
    achievements: [],
    slug: 'sarah-nakato'
  },
  {
    name: 'David Ochieng',
    role: 'Social Studies Teacher',
    education: '',
    profile: `David Ochieng teaches Social Studies and helps students understand their community, history, and the world around them.`,
    achievements: [],
    slug: 'david-ochieng'
  },
  {
    name: 'Mary Achieng',
    role: 'Arts Teacher',
    education: '',
    profile: `Mary Achieng is an Arts Teacher who inspires creativity and self-expression through various artistic mediums.`,
    achievements: [],
    slug: 'mary-achieng'
  },
  {
    name: 'James Okello',
    role: 'Physical Education Teacher',
    education: '',
    profile: `James Okello is a Physical Education Teacher focused on promoting health, fitness, and teamwork through sports and physical activities.`,
    achievements: [],
    slug: 'james-okello'
  },
  {
    name: 'Grace Akello',
    role: 'Primary Teacher',
    education: '',
    profile: `Grace Akello is a Primary Teacher dedicated to providing quality foundational education to young learners.`,
    achievements: [],
    slug: 'grace-akello'
  },
  {
    name: 'Robert Ssemwogerere',
    role: 'Primary Teacher',
    education: '',
    profile: `Robert Ssemwogerere is a Primary Teacher committed to nurturing young minds and creating a positive learning environment.`,
    achievements: [],
    slug: 'robert-ssemwogerere'
  }
]

// Helper function to create slug from name
function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function TeamMemberPage() {
  const params = useParams()
  const slug = params?.slug as string

  const member = teamMembers.find(m => m.slug === slug || createSlug(m.name) === slug)

  if (!member) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-heading-bold text-gray-900 mb-4">Team Member Not Found</h1>
            <p className="text-gray-600 mb-8 font-paragraph">The team member you&apos;re looking for doesn&apos;t exist.</p>
            <Link 
              href="/about/team"
              className="inline-flex items-center bg-school-green hover:bg-green-700 text-white font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
              style={{ padding: '16px 32px' }}
            >
              Back to Team
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Back Button */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          <Link 
            href="/about/team"
            className="inline-flex items-center text-gray-600 hover:text-school-green transition-colors font-paragraph"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team
          </Link>
        </div>
      </section>

      {/* Team Member Detail Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 lg:p-10 lg:flex lg:gap-8 lg:items-start">
              {/* Image Section */}
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                    {member.imageSrc ? (
                      <Image
                        src={member.imageSrc}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-school-green to-school-blue">
                        <span className="text-5xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3">
                <div className="mb-4">
                  <h1 className="text-3xl sm:text-4xl font-heading-bold text-gray-900 mb-2">
                    {member.name}
                  </h1>
                  <p className="text-xl text-school-green font-heading-semibold mb-2">{member.role}</p>
                  {member.education && (
                    <p className="text-base text-gray-600 font-paragraph">{member.education}</p>
                  )}
                </div>

                {member.profile && (
                  <div className="prose prose-lg max-w-none mb-6">
                    {member.profile.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4 font-paragraph">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Achievements */}
                {member.achievements && member.achievements.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-heading-semibold text-gray-900 uppercase tracking-wide mb-4">
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-6 h-6 text-school-green mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-paragraph text-base">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

