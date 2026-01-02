'use client'

import Image from 'next/image'

const partners = [
  { name: 'ACN', logo: '/images/partners/acn-logo.svg', alt: 'ACN Logo' },
  { name: 'African Leadership Academy', logo: '/images/partners/ala_logo.png', alt: 'African Leadership Academy Logo' },
  { name: 'SOLFA', logo: '/images/partners/solfa_logo.png', alt: 'SOLFA Logo' },
  { name: 'USIU', logo: '/images/partners/usiu_logo.png', alt: 'USIU Logo' },
]

export default function PartnersLogoCarousel() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-heading-semibold text-gray-600 uppercase tracking-wide mb-2">
            Our Partners
          </h3>
          <p className="text-sm sm:text-base text-gray-500 font-paragraph">
            Trusted organizations working with us to transform education
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-8 sm:gap-12 lg:gap-16 overflow-x-hidden scrollbar-hide">
            {/* First set - visible */}
            <div className="flex gap-8 sm:gap-12 lg:gap-16 flex-shrink-0 partners-scroll">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-first-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-4"
                  style={{ width: '220px', height: '120px' }}
                >
                  <div className="relative w-full h-full transition-all duration-300 opacity-100 hover:opacity-90 hover:scale-105 filter-none">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      fill
                      className="object-contain"
                      sizes="220px"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Second set - for seamless loop */}
            <div className="flex gap-8 sm:gap-12 lg:gap-16 flex-shrink-0 partners-scroll">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-second-${index}`}
                  className="flex-shrink-0 flex items-center justify-center px-4"
                  style={{ width: '220px', height: '120px' }}
                >
                  <div className="relative w-full h-full transition-all duration-300 opacity-100 hover:opacity-90 hover:scale-105 filter-none">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      fill
                      className="object-contain"
                      sizes="220px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

