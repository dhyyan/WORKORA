import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 pt-20 pb-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-emerald-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Trusted by thousands of businesses worldwide
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
        >
          Build Your Team. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Get Work Done.
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Connect with skilled professionals and turn ideas into reality. Post
          projects, chat instantly, and hire with confidence.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate('/client/profile/projects')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group"
          >
            Post a Job
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
