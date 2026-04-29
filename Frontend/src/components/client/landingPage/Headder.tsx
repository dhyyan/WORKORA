import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageCircle, User, Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeClient } from '../../../store/slice/client/clientSlice';
import { removeToken } from '../../../store/slice/client/clientTokenSlice';

const Headder = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    navigate('/client/login')
    dispatch(removeClient())
    dispatch(removeToken())
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/10 bg-slate-900/40 backdrop-blur-md"
    >
      <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/client" className="text-2xl font-bold tracking-tight text-white">
            Workora<span className="text-emerald-400">.</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavIcon icon={<Bell className="w-5 h-5" />} label="Notifications" />
          <NavLink to="/client/chat">
            <NavIcon icon={<MessageCircle className="w-5 h-5" />} label="Messages" />
          </NavLink>
          <div className="h-8 w-px bg-white/20 mx-2" />
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-lg group-hover:shadow-emerald-500/20 transition-all">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-emerald-100" />
                </div>
              </div>
            </div>
            {/* Hover Dropdown */}
            <div className="absolute right-0 mt-3 w-44 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <NavLink to="/client/profile" className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-t-xl transition-colors">
                Profile
              </NavLink>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 rounded-b-xl transition-colors">
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-200 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <NavLink 
                to="/client/chat" 
                className="flex items-center gap-3 px-4 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Messages</span>
              </NavLink>
              <NavLink 
                to="/client/profile" 
                className="flex items-center gap-3 px-4 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavLink>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg text-left"
              >
                <Bell className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, color: '#34d399' }}
      whileTap={{ scale: 0.95 }}
      className="text-slate-200 transition-colors hover:text-emerald-400 relative group cursor-pointer"
      title={label}
    >
      {icon}
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

export default Headder
