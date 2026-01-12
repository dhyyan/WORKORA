import { motion } from 'framer-motion';
import { Bell, MessageCircle, User } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const Headder = () => {
  return (
    <motion.header
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10 bg-slate-900/20 backdrop-blur-md"
    >
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold tracking-tight text-white">
          Workora<span className="text-emerald-400">.</span>
        </a>
      </div>

      <nav className="flex items-center gap-6">
        <NavIcon icon={<Bell className="w-5 h-5" />} label="Notifications" />
        <NavIcon
          icon={<MessageCircle className="w-5 h-5" />}
          label="Messages"
        />
        <div className="h-8 w-px bg-white/20 mx-2 hidden md:block" />
        <button className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
              <NavLink
                to={"/client/profile"}
              >
              <User className="w-5 h-5 text-emerald-100" />
              </NavLink>
            </div>
          </div>
        </button>
      </nav>
    </motion.header>
  )
}
function NavIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        color: '#34d399',
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="text-slate-200 transition-colors hover:text-emerald-400 relative group"
      aria-label={label}
    >
      {icon}
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  )
}


export default Headder
