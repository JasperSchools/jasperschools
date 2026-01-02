import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Identity & Social Media */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="mb-6">
              <h3 className="text-2xl font-heading-bold text-white mb-1">Jasper</h3>
              <p className="text-sm text-gray-300 font-paragraph">PRIMARY SCHOOL</p>
            </div>
            <p className="text-gray-300 text-sm font-paragraph mb-6 leading-relaxed">
              Creating bright paths together through quality education in Nyairongo, Uganda.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/company/jasper-primaryschool-nyairongo/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.666H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433c-1.144 0-2.067-.925-2.067-2.067C3.27 4.225 4.193 3.3 5.337 3.3c1.142 0 2.066.925 2.066 2.066 0 1.142-.924 2.067-2.066 2.067zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1DPcABmkH9/"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.326C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.765v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.676 0" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jasperprimary?igsh=MXg5OHdybmxjbTBrNg=="
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm8.75 2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                </svg>
              </a>
              <a
                href="https://x.com/JasperPrimary"
                aria-label="X (formerly Twitter)"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.406l-5.02-6.545-5.743 6.545H1.922l7.73-8.81L1.5 2.25h6.594l4.533 5.988 5.617-5.988zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* School Navigation */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h4 className="text-lg font-heading-semibold text-white mb-4">School</h4>
            <ul className="space-y-3">
              <li><Link href="/about/our-story" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">About Us</Link></li>
              <li><Link href="/about/vision-mission" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Vision & Mission</Link></li>
              <li><Link href="/about/team" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Our Team</Link></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Contact Us</a></li>
              <li><a href="#get-involved" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Get Involved</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h4 className="text-lg font-heading-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Primary Education</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Early Childhood</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Special Needs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Community Outreach</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Teacher Training</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h4 className="text-lg font-heading-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/donate" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Donate</Link></li>
              <li><Link href="/volunteer" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Volunteer</Link></li>
              <li><Link href="/sponsor" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Sponsor a Child</Link></li>
              <li><Link href="/about/partners" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Partnerships</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Newsletter</a></li>
            </ul>
          </div>
        </div>

        {/* Call to Action - Own Row */}
        <div className="mt-8 lg:mt-12">
          <div className="max-w-6xl mx-auto">
             <div className="rounded-xl p-6 sm:p-8 lg:p-10" style={{ backgroundColor: '#0A0A0A' }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1 text-center lg:text-left">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-heading-bold text-white mb-3 sm:mb-4 leading-tight">
                    Make a<br />
                    <span className="text-school-yellow">Difference</span>
                  </h4>
                  <p className="text-gray-300 text-base sm:text-lg font-paragraph leading-relaxed">
                    Join us in creating brighter futures for children in Nyairongo through quality education and community support.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0 justify-center lg:justify-end">
                  <Link href="/donate" className="group inline-flex items-center justify-center px-6 py-3 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base">
                    <span>Support Our Mission</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/sponsor" className="group inline-flex items-center justify-center px-6 py-3 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base">
                    <span>Sponsor a Student</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-paragraph">Terms & Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-paragraph">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-paragraph">Complaints Policy</a>
        </div>
            <p className="text-gray-400 text-sm font-paragraph">
          © 2024 Jasper Primary School. All rights reserved.
        </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
