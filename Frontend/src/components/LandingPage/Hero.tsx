import { motion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Hero() {
  return <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
    {/* Decorative background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center">
        {/* Badge */}
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-8">
          <SparklesIcon className="w-4 h-4" />
          <span>Trusted by 100,000+ professionals worldwide</span>
        </motion.div>
        {/* Headline */}
        <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Find the perfect freelancer
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
            or your next great client
          </span>
        </motion.h1>
        {/* Subheadline */}
        <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Connect, collaborate, and grow — all in one place.
        </motion.p>
        {/* CTA Buttons */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to='/client/login'>
            <button className="group relative px-8 py-4 bg-teal-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-teal-600 w-full sm:w-auto">
              <span className="relative z-10">I'm a Client</span>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link to="/freelancer/login">
            <button className="group px-8 py-4 bg-white text-teal-600 border-2 border-teal-500 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              I'm a Freelancer
            </button>
          </Link>
        </motion.div>
        {/* Trust indicators */}
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.7
        }} className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>;
}