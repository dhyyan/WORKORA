import HeroSection from '../../components/freelancer/LandingPage/HeroSection'

const FreelancerLandingPage = () => {
  return (
    <>
         <div className="bg-gray-50 font-sans">
      <main>
        <HeroSection />
        {/* <FeatureCards /> */}

        {/* Additional Content Section Placeholder to show page flow */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recommended for You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your skills and profile, here are some opportunities you
              might be interested in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((job) => (
              <div
                key={job}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                    LOGO
                  </div>
                  <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Senior Product Designer
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  We are looking for an experienced product designer to help us
                  redesign our core mobile application...
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded">Remote</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    $60-80/hr
                  </span>
                </div>
                <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-workora-500 hover:text-workora-600 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

export default FreelancerLandingPage
