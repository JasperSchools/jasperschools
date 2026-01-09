'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { teamMembers, createSlug } from '@/data/teamMembers'

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
        <PartnersLogoCarousel />
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
                        priority
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 33vw"
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
