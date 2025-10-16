import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Placeholder sections for future development */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-school-blue mb-4 sm:mb-6 lg:mb-8">
            About Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn more about our mission, values, and the impact we're making in the Nyairongo community.
          </p>
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