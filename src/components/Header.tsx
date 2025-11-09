'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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

  const topHeaderLinks = [
    { name: 'Careers', href: '/#careers' },
    { name: 'Visit Us', href: '/#visit' },
    { name: 'Newsletter', href: '/#newsletter' },
    { name: 'Sponsor a Student', href: '/sponsor' },
    { name: 'Donate', href: '/#donate' },
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jasper-primaryschool-nyairongo/posts/?feedView=all', icon: 'linkedin' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'X (Twitter)', href: '#', icon: 'x' },
  ]

  const aboutUsDropdown = [
    { name: 'About Us', href: '/#about'},
    { name: 'Vision & Mission', href: '/about/vision-mission'},
    { name: 'Our Story', href: '/about/our-story'},
    { name: 'Our Team', href: '/about/team'},
    { name: 'Partners', href: '/#partners'},
    { name: 'Newsletter', href: '/#newsletter'},
  ]

  const schoolsDropdown = [
    { name: 'Uganda', href: '/#school-uganda', icon: 'location'},
  ]

  const getInvolvedDropdown = [
    { name: 'Donate', href: '/#donate'},
    { name: 'Sponsor a Student', href: '/sponsor'},
    { name: 'Visit Us', href: '/#visit'},
    { name: 'Join Our Team', href: '/#careers'},  
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

  const renderSocialIcon = (iconName: string) => {
    const iconClass = "h-4 w-4"
    switch (iconName) {
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      case 'instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        )
      case 'x':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Top Header */}
      <div className="bg-school-green text-white py-3 sm:py-3 text-sm sm:text-base">
        <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-0">
            
            {/* Mobile & Tablet Layout - Social Icons on Left + Buttons on Right */}
            <div className="w-full lg:hidden">
              <div className="flex items-center justify-between">
                {/* Social Icons - Left Side */}
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  {socialLinks.slice(0, 3).map((social) => (
                    
                      <a
                        key={social.name}
                      href={social.href}
                      className="hover:text-gray-200 transition-colors duration-200 p-1.5"
                      aria-label={social.name}
                    >
                    <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon === 'linkedin' && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        )}
                        {social.icon === 'facebook' && (
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        )}
                        {social.icon === 'instagram' && (
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        )}
                      </svg>
                    </a>
                  ))}
                </div>
                
                {/* Action Buttons - Right Side */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => window.location.href = '/sponsor'}
                    className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-heading-semibold text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    Sponsor
                  </button>
                  <button
                    onClick={() => window.location.href = '#donate'}
                    className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-heading-semibold text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Full horizontal layout */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
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
              
              {/* Divider */}
              <div className="h-4 w-px bg-white bg-opacity-30"></div>
              
              {/* Contact Info */}
              <div className="flex items-center space-x-3 xl:space-x-4 text-sm font-paragraph">
                <span className="flex items-center whitespace-nowrap">
                  <svg className="w-4 h-4 text-white mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 17.65v3.2a1.15 1.15 0 0 1-1.25 1.15A20.16 20.16 0 0 1 3 5.25 1.15 1.15 0 0 1 4.15 4h3.21a1.15 1.15 0 0 1 1.14.99c.07.54.2 1.07.36 1.57a1.15 1.15 0 0 1-.26 1.19l-1.37 1.37a16.93 16.93 0 0 0 7.09 7.09l1.37-1.37a1.15 1.15 0 0 1 1.19-.26c.5.16 1.03.29 1.57.36a1.15 1.15 0 0 1 .99 1.14z"/>
                  </svg>
                  +256 XXX XXX XXX
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-white mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden xl:inline">jasperschoolsuganda@gmail.com</span>
                  <span className="xl:hidden">jasper...@gmail.com</span>
                </span>
              </div>
            </div>

            {/* Desktop Action Links */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {topHeaderLinks.map((link) => (
                link.name === 'Sponsor a Student' || link.name === 'Donate' ? (
                  <button
                    key={link.name}
                    onClick={() => window.location.href = link.href}
                    className="bg-school-yellow hover:bg-yellow-500 text-gray-800 font-heading-semibold text-base px-4 xl:px-5 py-2 xl:py-2.5  transition-all duration-200 border-0 cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                ) : (
                  
                    <a
                      key={link.name}
                    href={link.href}
                    className="hover:text-gray-200 transition-all duration-200 text-sm px-2 xl:px-3 py-1.5  whitespace-nowrap font-paragraph"
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
        <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
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
                  <h1 className="text-xl sm:text-2xl font-heading-bold text-school-blue">
                    Jasper Primary School
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 font-paragraph">Nyairongo, Uganda</p>
                </div>
              </a>
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
                      <div className="w-56 bg-white  shadow-xl border border-gray-100 overflow-hidden">
                        {aboutUsDropdown.map((item) => (
                          
                            <a
                              key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold  tracking-wide"
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
                    className="text-gray-700 hover:text-school-green px-1 xl:px-3 py-2  text-sm xl:text-base font-heading-bold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
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
                      <div className="w-48 bg-white  shadow-xl border border-gray-100 overflow-hidden">
                        {schoolsDropdown.map((item) => (
                          
                            <a
                              key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold  tracking-wide"
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
                      <div className="w-56 bg-white  shadow-xl border border-gray-100 overflow-hidden">
                        {getInvolvedDropdown.map((item) => (
                          
                            <a
                              key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm xl:text-base text-gray-700 hover:bg-school-green hover:text-white transition-all duration-200 border-b border-gray-50 last:border-b-0 font-heading-bold  tracking-wide"
                            onClick={() => setActiveDropdown(null)}
                          >
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
                className="text-gray-700 hover:text-school-green p-2  transition-all duration-300"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
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
                      <p className="text-xs text-gray-100 font-paragraph">Nyairongo, Uganda</p>
                    </div>
                  </a>
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
                        className="flex items-center text-gray-700 hover:text-school-green hover:bg-gray-50 py-3 px-4 text-base font-heading-bold transition-all duration-200  tracking-wide"
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
                        className="flex items-center text-gray-700 hover:text-school-green hover:bg-gray-50 py-3 px-4 text-base font-heading-bold transition-all duration-200  tracking-wide"
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