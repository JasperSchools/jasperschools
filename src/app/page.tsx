import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* About Us Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-school-blue mb-4 sm:mb-6 lg:mb-8">
                About Us
              </h2>
              <div className="space-y-4 sm:space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Our vision is to champion community building through innovative, inclusive, and resilient learning.
                </p>
                <p>
                  We exist to nurture potential, create opportunity, and strengthen the fabric of our community through
                  learning experiences that are accessible, practical, and future-ready.
                </p>
                <p>
                  While this content is placeholder and will be refined, our commitment remains the same: empowering
                  children in Nyairongo with quality education and a supportive environment to thrive.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/about/vision-mission" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-school-green text-white font-semibold hover:bg-green-700 transition-colors">
                  Read our Vision & Mission
                </a>
                <a href="#programs" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-white transition-colors">
                  Explore Programs
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-school-blue mb-3">What guides us</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Inclusive learning that welcomes every child.</li>
                  <li>Resilience through community and care.</li>
                  <li>Innovation grounded in local context.</li>
                  <li>Accountability and partnership.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            Our Programs
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the educational programs and initiatives that help our students thrive.
          </p>
        </div>
      </section>

      <section id="impact" className="py-12 sm:py-16 lg:py-20 bg-school-green text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">
            Our Impact
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            See how we're transforming lives and building a brighter future for our community.
          </p>
        </div>
      </section>

      <section id="get-involved" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            Get Involved
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join us in making a difference. There are many ways to support our mission.
          </p>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us to learn more or find out how you can help.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}