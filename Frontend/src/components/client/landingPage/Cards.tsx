import { motion } from 'framer-motion'
import { Shield, Users } from 'lucide-react'


const Cards = () => {

    const features = [
  {
    title: 'Hire Top Talent',
    description:
      'Access the top 1% of freelance professionals vetted for quality.',
    icon: Users,
    delay: 0.2,
  },
  {
    title: 'Verified Professionals',
    description:
      'Every freelancer identity and skill set is manually verified.',
    icon: Shield,
    delay: 0.3,
  },
  {
    title: 'Secure Payments',
    description: 'Funds are held safely in escrow until you approve the work.',
    icon: Lock,
    delay: 0.4,
  },
]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-6 -mt-24 relative z-20">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: feature.delay,
            ease: 'easeOut',
          }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl hover:bg-white/15 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-300">
            {/* <feature.icon className="w-6 h-6" /> */}
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            {feature.title}
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}


export default Cards
