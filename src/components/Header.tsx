'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const topHeaderLinks = [
    { name: 'Careers', href: '/#careers' },
    { name: 'Visit Us', href: '/#visit' },
    { name: 'Reports', href: '/#reports' },
    { name: 'Sponsor a Student', href: '/#sponsor' },
    { name: 'Donate', href: '/#donate' },
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jasper-primaryschool-nyairongo/posts/?feedView=all', icon: 'linkedin' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'X (Twitter)', href: '#', icon: 'x' },
  ]

  const aboutUsDropdown = [
    { name: 'About Us', href: '/#about', icon: 'info' },
    { name: 'Vision & Mission', href: '/about/vision-mission', icon: 'document' },
    { name: 'Our Journey', href: '/#journey', icon: 'map' },
    { name: 'Our Team', href: '/#team', icon: 'users' },
    { name: 'Partners', href: '/#partners', icon: 'handshake' },
    { name: 'Reports', href: '/#reports', icon: 'document' },
  ]

  const schoolsDropdown = [
    { name: 'Uganda', href: '/#school-uganda', icon: 'location' },
  ]

  const getInvolvedDropdown = [
    { name: 'Donate', href: '/#donate', icon: 'heart' },
    { name: 'Sponsor a Student', href: '/#sponsor', icon: 'gift' },
    { name: 'Visit Us', href: '/#visit', icon: 'calendar' },
    { name: 'Join Our Team', href: '/#careers', icon: 'briefcase' },
  ]

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: '/#programs' },
    { name: 'Our Impact', href: '/#impact' },
    { name: 'Contact', href: '/#contact' },
  ]

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        )
      default:
        return null
    }
  }

  const renderSocialIcon = (iconName: string) => {
    const iconClass = "h-5 w-5"
    switch (iconName) {
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        )
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
          </svg>
        )
      case 'instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        )
      case 'x':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Top Header */}
      <div className="bg-school-green text-white py-2.5 sm:py-3 text-base">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            
            {/* Mobile Layout - Single Row */}
            <div className="w-full md:hidden flex items-center justify-between">
              {/* Social Icons on left */}
              <div className="flex items-center space-x-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="hover:text-gray-200 transition-colors duration-200 p-1"
                    aria-label={social.name}
                  >
                    {renderSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
              
              {/* Action Buttons on right */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.location.href = '#sponsor'}
                  className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-md transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap"
                >
                  Sponsor
                </button>
                <button
                  onClick={() => window.location.href = '#donate'}
                  className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-md transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap"
                >
                  Donate
                </button>
              </div>
            </div>

            {/* Desktop Layout - Original horizontal layout */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="hover:text-gray-200 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {renderSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
              
              {/* Contact Info */}
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-white mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 17.65v3.2a1.15 1.15 0 0 1-1.25 1.15A20.16 20.16 0 0 1 3 5.25 1.15 1.15 0 0 1 4.15 4h3.21a1.15 1.15 0 0 1 1.14.99c.07.54.2 1.07.36 1.57a1.15 1.15 0 0 1-.26 1.19l-1.37 1.37a16.93 16.93 0 0 0 7.09 7.09l1.37-1.37a1.15 1.15 0 0 1 1.19-.26c.5.16 1.03.29 1.57.36a1.15 1.15 0 0 1 .99 1.14z"/>
                  </svg>
                  +256 XXX XXX XXX
                </span>
                <span>✉️ jasperschoolsuganda@gmail.com</span>
              </div>
            </div>

            {/* Desktop Action Links */}
            <div className="hidden md:flex items-center space-x-4">
              {topHeaderLinks.map((link) => (
                link.name === 'Sponsor a Student' || link.name === 'Donate' ? (
                  <button
                    key={link.name}
                    onClick={() => window.location.href = link.href}
                    className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-semibold text-sm px-4 py-2 rounded-md transition-all duration-200 border-0 cursor-pointer shadow-sm"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-gray-200 transition-all duration-200 text-sm px-4 py-2 rounded-md"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
           {/* Logo */}
           <div className="flex items-center flex-shrink-0">
             <div className="flex items-center">
               <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3">
                 <Image
                   src="/school-logo.png"
                   alt="Jasper Primary School Logo"
                   fill
                   className="object-contain"
                   priority
                 />
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
                    className="text-gray-700 hover:text-school-green px-2 xl:px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* About Us Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleDropdownToggle('about')}
                    className="text-gray-700 hover:text-school-green px-2 xl:px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    About Us
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                       <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                         {aboutUsDropdown.map((item) => (
                           <a
                             key={item.name}
                             href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {renderDropdownIcon(item.icon)}
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Schools Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('schools')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleDropdownToggle('schools')}
                    className="text-gray-700 hover:text-school-green px-2 xl:px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    Schools
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'schools' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                       <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                         {schoolsDropdown.map((item) => (
                           <a
                             key={item.name}
                             href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {renderDropdownIcon(item.icon)}
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
                    className="text-gray-700 hover:text-school-green px-2 xl:px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap flex items-center"
                  >
                    Get Involved
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'getInvolved' && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                       <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                         {getInvolvedDropdown.map((item) => (
                           <a
                             key={item.name}
                             href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {renderDropdownIcon(item.icon)}
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
                    className="text-gray-700 hover:text-school-green block px-3 py-3 rounded-md text-base font-bold uppercase tracking-wide transition-colors duration-200 hover:bg-white hover:bg-opacity-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
                
                {/* Mobile About Us */}
                <div className="px-3 py-2">
                  <div className="text-gray-700 font-bold uppercase tracking-wide mb-2">About Us</div>
                  <div className="ml-4 space-y-1">
                    {aboutUsDropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-gray-600 hover:text-school-green py-2 text-sm transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {renderDropdownIcon(item.icon)}
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile Schools */}
                <div className="px-3 py-2">
                  <div className="text-gray-700 font-bold uppercase tracking-wide mb-2">Schools</div>
                  <div className="ml-4 space-y-1">
                    {schoolsDropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-gray-600 hover:text-school-green py-2 text-sm transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      > 
                        {renderDropdownIcon(item.icon)}
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile Get Involved */}
                <div className="px-3 py-2">
                  <div className="text-gray-700 font-bold uppercase tracking-wide mb-2">Get Involved</div>
                  <div className="ml-4 space-y-1">
                    {getInvolvedDropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-gray-600 hover:text-school-green py-2 text-sm transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                        {renderDropdownIcon(item.icon)}
                        {item.name}
              </a>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}