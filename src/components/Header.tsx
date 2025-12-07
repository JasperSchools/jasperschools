'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [subMenuStack, setSubMenuStack] = useState<string[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigateToSubMenu = (menuName: string) => {
    setSubMenuStack(prev => [...prev, menuName])
    setActiveDropdown(menuName)
  }

  const navigateBack = () => {
    setSubMenuStack(prev => prev.slice(0, -1))
    setActiveDropdown(subMenuStack.length > 1 ? subMenuStack[subMenuStack.length - 2] : null)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setSubMenuStack([])
  }

  const aboutUsDropdown = [
    { name: 'About Us', href: '/#about'},
    { name: 'Vision & Mission', href: '/about/vision-mission'},
    { name: 'Our Story', href: '/about/our-story'},
    { name: 'Our Team', href: '/about/team'},
    { name: 'Partners', href: '/#partners'},
  ]

  const schoolsDropdown = [
    { name: 'Uganda', href: '/#school-uganda', icon: 'location'},
  ]

  const getInvolvedDropdown = [
    { name: 'Donate', href: '/donate'},
    { name: 'Sponsor a Student', href: '/sponsor'},
    { name: 'Visit Us', href: '/#visit'},
    { name: 'Careers', href: '/#careers'},
    { name: 'Newsletter', href: '/#newsletter'},
  ]

  const navigation = [
    { name: 'Programs', href: '/#programs' },
    { name: 'Our Impact', href: '/#impact' },
    { name: 'Contact', href: '/#contact' },
  ]

  const handleDropdownToggle = (dropdownName: string) => {
    if (dropdownName === 'about' || dropdownName === 'schools' || dropdownName === 'getInvolved') {
      navigateToSubMenu(dropdownName)
    } else {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
    }
  }

  const renderDropdownIcon = (iconName: string) => {
    const iconClass = "h-4 w-4 mr-3 flex-shrink-0"
    switch (iconName) {
      case 'info':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'book':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'map':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        )
      case 'handshake':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        )
      case 'document':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'location':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'heart':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'gift':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        )
      case 'calendar':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'briefcase':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v6a2 2 0 002 2h4a2 2 0 002-2V6" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3">
                  <Image
                    src="/images/jps_logo.jpg"
                    alt="Jasper Primary School Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-xl sm:text-2xl font-heading-bold text-black">
                    Jasper Primary School
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-4 xl:ml-10 flex items-baseline space-x-1 xl:space-x-4">
                {/* About Us Dropdown - First Position */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleDropdownToggle('about')}
                    className="text-gray-700 hover:text-school-green px-1 xl:px-3 py-2  text-sm xl:text-base font-heading-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    About Us
                    <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-56 bg-white shadow-xl border border-gray-100 overflow-hidden">
                        {aboutUsDropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold tracking-wide"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Navigation Links */}
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-school-green px-1 xl:px-3 py-2 text-sm xl:text-base font-heading-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ))}

                {/* Schools Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('schools')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleDropdownToggle('schools')}
                    className="text-gray-700 hover:text-school-green px-1 xl:px-3 py-2  text-sm xl:text-base font-heading-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    Schools
                    <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'schools' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-48 bg-white shadow-xl border border-gray-100 overflow-hidden">
                        {schoolsDropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold tracking-wide"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {'icon' in item && renderDropdownIcon(item.icon as string)}
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Get Involved Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('getInvolved')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleDropdownToggle('getInvolved')}
                    className="text-gray-700 hover:text-school-green px-1 xl:px-3 py-2  text-sm xl:text-base font-heading-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    Get Involved
                    <svg className="ml-1 h-3 w-3 xl:h-4 xl:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'getInvolved' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="w-56 bg-white shadow-xl border border-gray-100 overflow-hidden">
                        {getInvolvedDropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold tracking-wide"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Donate Button */}
                <Link
                  href="/donate"
                  className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-heading-semibold text-base px-4 xl:px-5 py-2 xl:py-2.5 transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap rounded-full"
                >
                  Donate
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-school-green p-2 transition-all duration-300 rounded-full border-2 border-gray-200 hover:border-school-green flex items-center justify-center w-10 h-10"
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu overlay backdrop */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden menu-backdrop"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Mobile menu sliding panel */}
          <div
            className={`fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 lg:hidden transform ${
              isMenuOpen ? 'menu-slide-in translate-x-0' : 'menu-slide-out translate-x-full'
            }`}
          >
            <div className="h-full overflow-y-auto">
              {/* Main Menu */}
              <div
                className={`absolute inset-0 menu-content ${
                  subMenuStack.length === 0 ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-school-green">
                  <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10 mr-3">
                      <Image
                        src="/images/jps_logo.jpg"
                        alt="Jasper Primary School Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-heading-bold text-white">Jasper Primary</h2>
                    </div>
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="text-white hover:text-gray-200 p-2 transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile menu content */}
                <div className="px-4 py-6">
                  {/* Mobile About Us - First Position */}
                  <div style={{ animation: `slideInUp 0.4s ease-out 0s both` }}>
                    <button
                      onClick={() => navigateToSubMenu('about')}
                      className="text-gray-700 hover:text-school-green hover:bg-gray-50 block px-4 py-3 text-base font-heading-bold transition-all duration-200 w-full text-left flex items-center justify-between uppercase tracking-wide"
                    >
                      About Us
                      <svg className="h-5 w-5 text-school-green transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="border-b border-gray-200"></div>
                  </div>

                  {/* Other Navigation Links */}
                  {navigation.map((item, index) => (
                    <div key={item.name} style={{ animation: `slideInUp 0.4s ease-out ${(index + 1) * 0.1}s both` }}>
                      <a
                        href={item.href}
                        className="text-gray-700 hover:text-school-green hover:bg-gray-50 block px-4 py-3 text-base font-heading-bold transition-all duration-200 uppercase tracking-wide"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </a>
                      <div className="border-b border-gray-200"></div>
                    </div>
                  ))}

                  {/* Mobile Schools */}
                  <div style={{ animation: `slideInUp 0.4s ease-out 0.5s both` }}>
                    <button
                      onClick={() => navigateToSubMenu('schools')}
                      className="text-gray-700 hover:text-school-green hover:bg-gray-50 block px-4 py-3 text-base font-heading-bold transition-all duration-200 w-full text-left flex items-center justify-between uppercase tracking-wide"
                    >
                      Schools
                      <svg className="h-5 w-5 text-school-green transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="border-b border-gray-200"></div>
                  </div>

                  {/* Mobile Get Involved */}
                  <div style={{ animation: `slideInUp 0.4s ease-out 0.6s both` }}>
                    <button
                      onClick={() => navigateToSubMenu('getInvolved')}
                      className="text-gray-700 hover:text-school-green hover:bg-gray-50 block px-4 py-3 text-base font-heading-bold transition-all duration-200 w-full text-left flex items-center justify-between uppercase tracking-wide"
                    >
                      Get Involved
                      <svg className="h-5 w-5 text-school-green transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="border-b border-gray-200"></div>
                  </div>

                  {/* Mobile Donate Button */}
                  <div style={{ animation: `slideInUp 0.4s ease-out 0.7s both` }}>
                    <Link
                      href="/donate"
                      className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-heading-semibold block px-4 py-3 text-base transition-all duration-200 rounded-full mx-4 mt-2 text-center"
                      onClick={closeMenu}
                    >
                      Donate
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sub Menu - About Us */}
              <div
                className={`absolute inset-0 menu-content ${
                  activeDropdown === 'about' ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex items-center p-4 border-b border-gray-200 bg-school-green" style={{ animation: `slideInUp 0.3s ease-out 0.1s both` }}>
                  <button
                    onClick={navigateBack}
                    className="text-white hover:text-gray-200 p-2 transition-colors duration-200 mr-3"
                    aria-label="Go back"
                  >
                    <svg className="h-6 w-6 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-heading-bold text-white">About Us</h2>
                </div>
                <div className="px-4 py-6">
                  {aboutUsDropdown.map((item, index) => (
                    <div key={item.name} style={{ animation: `slideInUp 0.4s ease-out ${index * 0.08}s both` }}>
                      <a
                        href={item.href}
                        className="flex items-center text-gray-700 hover:text-school-green hover:bg-gray-50 py-3 px-4 text-base font-heading-bold transition-all duration-200 tracking-wide"
                        onClick={closeMenu}
                      >
                        {'icon' in item && renderDropdownIcon(item.icon as string)}
                        {item.name}
                      </a>
                      <div className="border-b border-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub Menu - Schools */}
              <div
                className={`absolute inset-0 menu-content ${
                  activeDropdown === 'schools' ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex items-center p-4 border-b border-gray-200 bg-school-green" style={{ animation: `slideInUp 0.3s ease-out 0.1s both` }}>
                  <button
                    onClick={navigateBack}
                    className="text-white hover:text-gray-200 p-2 transition-colors duration-200 mr-3"
                    aria-label="Go back"
                  >
                    <svg className="h-6 w-6 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-heading-bold text-white">Schools</h2>
                </div>
                <div className="px-4 py-6">
                  {schoolsDropdown.map((item, index) => (
                    <div key={item.name} style={{ animation: `slideInUp 0.4s ease-out ${index * 0.08}s both` }}>
                      <a
                        href={item.href}
                        className="flex items-center text-gray-700 hover:text-school-green hover:bg-gray-50 py-3 px-4 text-base font-heading-bold transition-all duration-200 tracking-wide"
                        onClick={closeMenu}
                      >
                        {'icon' in item && renderDropdownIcon(item.icon as string)}
                        {item.name}
                      </a>
                      <div className="border-b border-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub Menu - Get Involved */}
              <div
                className={`absolute inset-0 menu-content ${
                  activeDropdown === 'getInvolved' ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex items-center p-4 border-b border-gray-200 bg-school-green" style={{ animation: `slideInUp 0.3s ease-out 0.1s both` }}>
                  <button
                    onClick={navigateBack}
                    className="text-white hover:text-gray-200 p-2 transition-colors duration-200 mr-3"
                    aria-label="Go back"
                  >
                    <svg className="h-6 w-6 transition-transform duration-200 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-heading-bold text-white">Get Involved</h2>
                </div>
                <div className="px-4 py-6 ">
                  {getInvolvedDropdown.map((item, index) => (
                    <div key={item.name} style={{ animation: `slideInUp 0.4s ease-out ${index * 0.08}s both` }}>
                      <a
                        href={item.href}
                        className="flex items-center text-gray-700 hover:text-school-green hover:bg-gray-50 py-3 px-4 text-base font-heading-bold transition-all duration-200 tracking-wide"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </a>
                      <div className="border-b border-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}