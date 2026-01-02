'use client'

import { useState, useRef, useEffect, ReactElement } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PartnersLogoCarousel from '@/components/PartnersLogoCarousel'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Donation purpose options
const DONATION_PURPOSES = [
  {
    id: 'general',
    title: 'General Fund',
    description: 'Support where it\'s needed most',
    icon: '🎓',
    impact: 'Covers operational costs, teacher salaries, and daily needs'
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Build classrooms and facilities',
    icon: '🏫',
    impact: 'Every $500 builds one desk, $5,000 constructs a classroom'
  },
  {
    id: 'materials',
    title: 'Learning Materials',
    description: 'Books, supplies, and technology',
    icon: '📚',
    impact: '$50 provides a year of textbooks for one student'
  },
  {
    id: 'meals',
    title: 'School Meals',
    description: 'Nutritious meals for students',
    icon: '🍎',
    impact: '$20 feeds a child for one month'
  },
  {
    id: 'scholarships',
    title: 'Scholarships',
    description: 'Full sponsorship for students',
    icon: '🎖️',
    impact: '$300/year covers tuition, meals, and materials'
  },
]

// Preset donation amounts
const DONATION_TIERS = [
  { amount: 20, label: '$20', impact: 'Feeds a child for 1 month' },
  { amount: 50, label: '$50', impact: 'Books for 1 student/year' },
  { amount: 100, label: '$100', impact: '2 desks for classrooms' },
  { amount: 300, label: '$300', impact: 'Full scholarship for 1 year' },
  { amount: 500, label: '$500', impact: '1 teacher monthly salary' },
  { amount: 1000, label: '$1,000', impact: 'Complete classroom upgrade' },
]

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', inView }: { 
  end: number, duration?: number, suffix?: string, prefix?: string, inView: boolean 
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, inView])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Hero Section
function DonateHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </motion.div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-28 lg:py-32 text-center">
        <motion.h1 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform Lives Through Education
        </motion.h1>
        
        <div className="text-green-100 text-sm sm:text-base max-w-3xl mx-auto font-paragraph mb-8">
          {['Your', 'donation', 'empowers', 'children', 'in', 'rural', 'Uganda', 'with', 'quality', 'education.'].map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.6,
                delay: 0.6 + (index * 0.1),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <a 
            href="#donation-form" 
            className="inline-flex items-center bg-school-yellow hover:bg-yellow-500 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300"
            style={{ padding: '16px 32px' }}
          >
            Donate Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Impact Statistics Section
function ImpactStats() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const stats = [
    { value: 600, suffix: '+', label: 'Students Supported', duration: 2500 },
    { value: 200, suffix: '', label: 'Students Sponsored', duration: 2200 },
    { value: 15, suffix: '+', label: 'Teachers Employed', duration: 2000 },
    { value: 98, suffix: '%', label: 'Funds to Programs', duration: 2200 },
    { value: 50000, prefix: '$', suffix: '+', label: 'Raised This Year', duration: 3000 },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl sm:text-4xl font-heading text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Your Impact By The Numbers
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading text-school-green mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={stat.duration} 
                  suffix={stat.suffix || ''} 
                  prefix={stat.prefix || ''}
                  inView={isInView} 
                />
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-paragraph">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Donation Form Section
function DonationFormSection() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [amount, setAmount] = useState<number | 'custom'>(50)
  const [customAmount, setCustomAmount] = useState('')
  const [purpose, setPurpose] = useState('general')
  const [showDonorBox, setShowDonorBox] = useState(false)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleDonate = () => {
    setShowDonorBox(true)
    // Scroll to the DonorBox iframe
    setTimeout(() => {
      document.getElementById('donorbox-embed')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <section id="donation-form" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-center text-gray-900 mb-4">
            Make Your Donation
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 font-paragraph mb-12">
            Every contribution makes a lasting difference
          </p>
        </motion.div>

        <motion.div 
          className="bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!showDonorBox ? (
            <>
              {/* Frequency Toggle */}
              <div className="mb-8">
                <label className="block text-sm font-heading-semibold text-gray-700 mb-3">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFrequency('once')}
                    className={`py-3 px-6 rounded-lg font-heading-medium transition-all ${
                      frequency === 'once'
                        ? 'bg-school-green text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-6 rounded-lg font-heading-medium transition-all relative ${
                      frequency === 'monthly'
                        ? 'bg-school-green text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Monthly
                    <span className="absolute -top-2 -right-2 bg-school-yellow text-xs px-2 py-1 rounded-full text-gray-900 font-bold">
                      2x Impact
                    </span>
                  </button>
                </div>
              </div>

              {/* Donation Amounts */}
              <div className="mb-8">
                <label className="block text-sm font-heading-semibold text-gray-700 mb-3">
                  Select Amount (USD)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                  {DONATION_TIERS.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => setAmount(tier.amount)}
                      className={`py-3 sm:py-4 px-2 sm:px-4 rounded-lg font-heading-semibold transition-all touch-manipulation ${
                        amount === tier.amount
                          ? 'bg-school-green text-white ring-2 ring-school-green ring-offset-2'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="text-lg sm:text-xl">{tier.label}</div>
                      <div className="text-xs mt-1 opacity-90 hidden sm:block">{tier.impact.split(' ').slice(0, 3).join(' ')}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => setAmount('custom')}
                    className={`flex-shrink-0 py-3 px-6 rounded-lg font-heading-medium transition-all touch-manipulation ${
                      amount === 'custom'
                        ? 'bg-school-green text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    Custom Amount
                  </button>
                  {amount === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex-1 w-full"
                    >
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-heading-semibold text-lg">
                          $
                        </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph bg-white text-gray-900"
                      min="1"
                      inputMode="numeric"
                    />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Purpose Selection */}
              <div className="mb-8">
                <label className="block text-sm font-heading-semibold text-gray-700 mb-3">
                  Donation Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-school-green focus:border-transparent font-paragraph bg-white text-gray-900"
                >
                  {DONATION_PURPOSES.map((p) => (
                    <option key={p.id} value={p.id} className="text-gray-900 bg-white">
                      {p.title} - {p.description}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-600 font-paragraph">
                  {DONATION_PURPOSES.find(p => p.id === purpose)?.impact}
                </p>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={amount === 'custom' && !customAmount}
                className="w-full py-4 px-6 sm:px-8 rounded-lg bg-school-yellow hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-heading-bold text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
              >
                <span className="truncate">Donate ${amount === 'custom' ? customAmount || '0' : amount} {frequency === 'monthly' && '/month'}</span>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="mt-4 text-center text-xs text-gray-500 font-paragraph">
                🔒 Secure payment processing via DonorBox. Tax-deductible in the US.
              </p>
            </>
          ) : (
            <>
              {/* DonorBox Embedded */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-heading-semibold text-gray-900">
                  Complete Your Donation
                </h3>
                <button
                  onClick={() => setShowDonorBox(false)}
                  className="text-gray-500 hover:text-gray-700 active:text-gray-900 transition-colors p-2 touch-manipulation"
                  aria-label="Go back to donation form"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div id="donorbox-embed" className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: '600px' }}>
                <iframe
                  src={`https://donorbox.org/embed/${process.env.NEXT_PUBLIC_DONORBOX_CAMPAIGN_ID}?amount=${amount === 'custom' ? customAmount : amount}&frequency=${frequency}&designation=${purpose}`}
                  name="donorbox"
                  seamless
                  frameBorder="0"
                  scrolling="yes"
                  className="w-full rounded-lg"
                  style={{ 
                    maxWidth: '100%',
                    minWidth: '100%',
                    maxHeight: 'none',
                    minHeight: '600px',
                    height: '800px',
                  }}
                  allow="payment"
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

// Where Your Money Goes Section
function FundAllocation() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const allocations = [
    { category: 'Education Programs', percentage: 70, color: '#2E8B57' },
    { category: 'Teacher Salaries', percentage: 15, color: '#F4D03F' },
    { category: 'Infrastructure', percentage: 10, color: '#000080' },
    { category: 'Administrative', percentage: 5, color: '#95a5a6' },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-4">
            Where Your Money Goes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-paragraph">
            We&apos;re committed to transparency. Here&apos;s how we allocate every dollar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Pie Chart Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {allocations.reduce((acc, item, index) => {
                  const prevTotal = allocations.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                  const dashArray = `${item.percentage} ${100 - item.percentage}`
                  const dashOffset = -prevTotal
                  
                  acc.push(
                    <motion.circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="15.915"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="31.831"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      initial={{ strokeDasharray: '0 100' }}
                      animate={isInView ? { strokeDasharray: dashArray } : { strokeDasharray: '0 100' }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                    />
                  )
                  return acc
                }, [] as ReactElement[])}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-heading text-gray-900">98%</div>
                  <div className="text-sm text-gray-600 font-paragraph">to programs</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Breakdown List */}
          <div className="space-y-6">
            {allocations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-heading-semibold text-gray-900">{item.category}</span>
                    <span className="font-heading text-lg text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-12 border-t border-gray-200 text-center"
        >
          <p className="text-sm text-gray-600 font-paragraph mb-4">
            Trusted by donors worldwide
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <div className="text-sm sm:text-base text-gray-500 font-paragraph">🔒 Secure Payment</div>
            <div className="text-sm sm:text-base text-gray-500 font-paragraph">✓ Tax Deductible</div>
            <div className="text-sm sm:text-base text-gray-500 font-paragraph">📊 Full Transparency</div>
            <div className="text-sm sm:text-base text-gray-500 font-paragraph">💯 100% Nonprofit</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Impact Stories Section
function ImpactStories() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const stories = [
    {
      quote: "Thanks to Jasper Schools, my daughter can now read and write. She dreams of becoming a teacher.",
      author: "Grace M.",
      role: "Parent",
      image: "/images/jps2.jpeg"
    },
    {
      quote: "The meals program changed everything. Now students can focus on learning instead of hunger.",
      author: "Teacher John",
      role: "Primary Teacher",
      image: "/images/jps3.jpeg"
    },
    {
      quote: "I never thought I'd go to school. Now I'm top of my class. Thank you to everyone who donated!",
      author: "Samuel, 12",
      role: "Student",
      image: "/images/jps4.jpeg"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-4">
            Stories of Impact
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-paragraph max-w-2xl mx-auto">
            See how your donations are changing lives in rural Uganda
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-4 sm:mb-6 mx-auto border-4 border-white">
                <Image
                  src={story.image}
                  alt={story.author}
                  fill
                  className="object-cover"
                />
              </div>
              <blockquote className="text-sm sm:text-base text-gray-700 font-paragraph text-center mb-4 sm:mb-6 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <div className="text-center">
                <div className="font-heading-semibold text-gray-900">{story.author}</div>
                <div className="text-sm text-gray-600 font-paragraph">{story.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Donate Page Component
export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DonateHero />
      <ImpactStats />
      <DonationFormSection />
      <FundAllocation />
      <ImpactStories />
      
      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-school-green via-[#1a5c34] to-school-green text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-sm sm:text-base text-green-100 font-paragraph mb-6 sm:mb-8">
            Every donation, no matter the size, transforms lives.
          </p>
          <a 
            href="#donation-form"
            className="inline-flex items-center bg-school-yellow hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-heading-semibold rounded-full text-base sm:text-lg lg:text-xl transition-all duration-300 touch-manipulation"
            style={{ padding: '16px 32px' }}
          >
            Donate Now
            <svg className="w-5 h-5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </section>

      <PartnersLogoCarousel />
      <Footer />
    </main>
  )
}

