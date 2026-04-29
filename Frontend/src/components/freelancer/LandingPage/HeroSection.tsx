import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Professional workspace"
          className="w-full h-full object-cover"
        />
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-3xl">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-8"
          >
            <CheckCircle2 className="w-4 h-4 text-workora-400" />
            <span>Work with verified clients worldwide</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Find Work That <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-workora-400 via-workora-300 to-workora-100">
              Matches Your Skills
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed"
          >
            Browse high-quality projects and work with trusted clients. Apply,
            chat, and get paid securely — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate('/freelancer/jobs')}
              className="group relative px-8 py-4 bg-workora-600 hover:bg-workora-500 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-workora-600/20 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Browse Jobs</span>
              <Search className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>

            <button 
              onClick={() => navigate('/freelancer/dashboard')}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-white text-white rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Stats/Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-700 overflow-hidden shadow-lg"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-workora-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                +10k
              </div>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Join 10,000+ freelancers finding work daily
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
