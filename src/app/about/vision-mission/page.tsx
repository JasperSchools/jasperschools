import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function VisionMissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D4723' }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Vision & Mission</h1>
          <p className="text-green-100 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Our commitment to inclusive, innovative, and resilient learning drives everything we do.
          </p>
        </div>
      </section>

      {/* Vision and Mission Cards */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              A future where every community thrives through innovative, inclusive, and resilient learning.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Elevating children in rural areas through access to quality education, nurturing lifelong learning, innovation, and transformative growth.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Heading */}
      <section className="pt-2">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Our Values</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">The principles that guide how we learn, work, and serve.</p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Accessibility */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Accessibility</h4>
            <p className="text-gray-600">Making learning opportunities accessible to all students.</p>
          </div>
          {/* Integrity */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Integrity</h4>
            <p className="text-gray-600">Operating with transparency, honesty, and ethical principles.</p>
          </div>
          {/* Collaboration */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V4H2v16h5"/></svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Collaboration</h4>
            <p className="text-gray-600">Building strong partnerships among students, mentors, and community.</p>
          </div>
          {/* Empowerment */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#0D4723]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8"/></svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Empowerment</h4>
            <p className="text-gray-600">Helping students reach their full academic and life potential.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}


