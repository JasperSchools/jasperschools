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
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-school-green transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* School Navigation */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h4 className="text-lg font-heading-semibold text-white mb-4">School</h4>
            <ul className="space-y-3">
              <li><a href="/about/our-story" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">About Us</a></li>
              <li><a href="/about/vision-mission" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Vision & Mission</a></li>
              <li><a href="/about/team" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Our Team</a></li>
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
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Donate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Volunteer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Sponsor a Child</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-paragraph">Partnerships</a></li>
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
                  <a href="#donate" className="group inline-flex items-center justify-center px-6 py-3 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base">
                    <span>Support Our Mission</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a href="#sponsor" className="group inline-flex items-center justify-center px-6 py-3 rounded-full border border-white text-white hover:shadow-lg hover:shadow-white/25 font-paragraph transition-all duration-300 text-base">
                    <span>Sponsor a Student</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
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
