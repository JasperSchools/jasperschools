export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-school-green via-school-green to-green-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white rounded-full"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-1/3 w-10 h-10 sm:w-20 sm:h-20 bg-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block bg-white bg-opacity-20 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Nonprofit Education
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
              Creating Bright Paths
              <span className="block text-yellow-300">Together</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8 text-green-100 max-w-2xl mx-auto lg:mx-0">
              Empowering children in rural Uganda through quality education, 
              nurturing their potential, and building a brighter future for our community.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">200+</div>
                <div className="text-xs sm:text-sm text-green-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">15+</div>
                <div className="text-xs sm:text-sm text-green-200">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">10+</div>
                <div className="text-xs sm:text-sm text-green-200">Years</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#donate"
                className="bg-school-red hover:bg-red-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                Donate Now
              </a>
              <a
                href="#about"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 border-2 border-white border-opacity-50 hover:border-opacity-80"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              {/* School Logo Representation */}
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-school-green rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-school-blue rounded-sm flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-school-red rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Jasper Primary School</h3>
                  <p className="text-green-200 mb-4 text-sm sm:text-base">Nyairongo, Uganda</p>
                  
                  {/* Mission Statement */}
                  <div className="bg-white bg-opacity-10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h4 className="font-semibold mb-2 sm:mb-3 text-yellow-300 text-sm sm:text-base">Our Mission</h4>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      To provide quality education that empowers children to reach their full potential 
                      and contribute meaningfully to their community and the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 sm:h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  )
}
