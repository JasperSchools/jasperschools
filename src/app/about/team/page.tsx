'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Eric Ayamba',
      role: 'Co-Founder & Educator',
      education: 'United States International University Africa (USIU-Africa)',
      profile: `Eric Ayamba is an educator and visionary leader passionate about harnessing education as a catalyst for transforming rural communities into self-reliant and sustainable societies. He holds a Bachelor of Science in Finance with a concentration in Economics from United States International University-Africa and has cultivated expertise in economics, econometrics, and rural education transformation. In 2022, Eric expanded his global perspective by studying Economics for Developing Countries at Sciences Po, France, where he deepened his understanding of policy formulation for low-income and developing nations.

As the Co-Founder of Jasper Schools Uganda, established in 2025, Eric leads the organization's flagship institution, Jasper Primary School in Nyairongo-Uganda where he has strengthened community partnerships, implemented efficient administrative systems, and enhanced the school's community profile. Under his leadership, Jasper has built partnerships with leading institutions such as the African Leadership Academy, advancing its mission to eliminate barriers to quality education in rural areas.

He was awarded the Little Bets Challenge by ALforEducation during the 2024 gathering in Johannesburg, South Africa, which supported his establishment of community hubs promoting gender equity in education, leading to increased school enrolment for young girls in Nyairongo. He was also part of the inaugural cohort of the Edupreneur Growth Lab in 2021 and the Cohort 4 Apprenticeship Program under ALforEducation, experiences that built his understanding of Africa's state of education and strengthened his commitment to designing education solutions across the continent and the Global South at large.

Guided by the belief that "no child should be denied education because of gender or location," Eric continues to champion transformative educational models that empower communities and inspire sustainable development.`,
      achievements: [
        'Awarded Little Bets Challenge by ALforEducation',
        'Co-founder, Jasper Schools Uganda',
        'Edupreneur Growth Lab Cohort 2021'
      ]
    },
    {
      name: 'Byaruhanga Erisha',
      role: 'Co-Founder & Community Developer',
      education: 'United States International University–Africa (USIU-Africa)',
      profile: `Erisha is a passionate student at United States International University–Africa, pursuing a Bachelor's degree in International Business Administration. He is deeply driven by a commitment to education, community empowerment, and youth development.

As the Co-founder of Jasper Primary School- Nyairongo, Erisha plays a key role in improving access to quality education for children in underserved communities. His vision for the school is rooted in his belief that education is a powerful tool for breaking cycles of poverty and unlocking potential among young learners.

Before joining university, Erisha volunteered with Save the Children International for about two years as a Community Learning Facilitator in Kyangwali Refugee Settlement. In this role, he worked with children from diverse backgrounds to strengthen their literacy and numeracy skills, create inclusive learning spaces, and support teachers in delivering effective lessons. This experience not only deepened his love for education but also strengthened his leadership, communication, and mentorship abilities.

Through his academic journey and community work, Erisha continues to seek innovative ways to bridge educational gaps, nurture young minds, and inspire change within his community and beyond.`,
      achievements: [
        'Community Learning Facilitator, Save the Children International',
        '2+ years of refugee community engagement',
        'Co-founder, Jasper Primary School'
      ]
    },
    {
      name: 'Milton Edodi',
      role: 'Co-Founder & Strategic Leader',
      education: 'United States International University Africa (USIU-A)',
      profile: `Milton Edodi is a Mastercard Foundation Scholar pursuing a Bachelor of Science in International Business Administration (Management) at the United States International University-Africa (USIU-Africa) and the Co-Founder of Jasper Primary School in western Uganda. Driven by a strong commitment to educational transformation, strategic leadership, mentorship, and evidence-informed decision-making, he seeks to shape progressive education systems that foster innovation, inclusion, and sustainable development across Africa.

Through his leadership at Jasper Primary School, Milton has played a pivotal role in strengthening community partnerships, enhancing school management systems, and promoting inclusive learning opportunities for children in rural Uganda. His extensive volunteer experience with the World Food Programme (WFP), World Vision, Save the Children, Lutheran World Federation (LWF), and Alight has deepened his understanding of the link between education, child protection, and community development.

Guided by integrity, excellence, empathy, and resilience, Milton continues to champion education as a powerful driver of social and economic transformation, envisioning a future where every child regardless of background, has access to quality learning and the opportunity to thrive.`,
      achievements: [
        'Mastercard Foundation Scholar',
        'Volunteer with WFP, World Vision, and Save the Children',
        'Co-founder, Jasper Primary School'
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D4723' }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-green-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Meet the dedicated leaders driving transformative education in rural Uganda
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 lg:p-10 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex lg:gap-8 lg:items-start`}
              >
                {/* Image Section */}
                <div className="lg:w-1/3 mb-6 lg:mb-0">
                  <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-[#0D4723] rounded-full flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3">
                  <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h2>
                    <p className="text-lg text-[#0D4723] font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.education}</p>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {member.profile.split('\n\n')[0]}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {member.profile.split('\n\n').slice(1).join('\n\n')}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      Key Achievements
                    </h3>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-[#0D4723] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Together, we can empower communities and transform lives through quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#donate" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#0D4723] text-white font-semibold hover:bg-green-800 transition-colors text-lg"
            >
              Donate Now
            </a>
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-gray-900 font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200 text-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
