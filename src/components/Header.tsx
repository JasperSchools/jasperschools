'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Our Impact', href: '#impact' },
    { name: 'Get Involved', href: '#get-involved' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-school-green rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-school-blue rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-4 sm:h-4 bg-school-red rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-lg sm:text-xl font-bold text-school-blue">
                  Jasper Primary School
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Nyairongo, Uganda</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-6 xl:ml-10 flex items-baseline space-x-2 xl:space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-school-green px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <a
              href="#donate"
              className="bg-school-red hover:bg-red-600 text-white font-bold py-2 px-4 xl:px-6 rounded-full transition-all duration-200  hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base"
            >
              Donate Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-school-green focus:outline-none focus:text-school-green p-1"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2 shadow-lg">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-school-green block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white hover:bg-opacity-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#donate"
                className="bg-school-red hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-200 block text-center mt-4 shadow-lg hover:shadow-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
