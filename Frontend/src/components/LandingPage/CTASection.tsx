import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';

export function CTASection() {
  return (
    <div className="w-full py-24 bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8"
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Join our growing community today</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Join thousands of freelancers
            <br className="hidden sm:block" />
            and clients making work happen
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Whether you're looking to hire or get hired, start your journey with
            Workora today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="group px-8 py-4 bg-white text-teal-700 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="px-8 py-4 bg-transparent text-white border-2 border-white/50 hover:border-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              Explore Talent
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.4 }} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          >
            <div className="text-center p-4 border-b border-white/10 sm:border-b-0 sm:border-r">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-white/70 text-sm sm:text-base">Active Users</div>
            </div>
            <div className="text-center p-4 border-b border-white/10 sm:border-b-0 sm:border-r">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-white/70 text-sm sm:text-base">Projects Completed</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/70 text-sm sm:text-base">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}