import { motion } from 'framer-motion'
import { Bell, Menu, MessageSquare, User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { removeFreelancer } from '../../../store/slice/freelancer/FreelanceSlice'
import { freelancerRemoveToken } from '../../../store/slice/freelancer/FreelancerToken'
// import FreelancerLandingPage from '../../../pages/freelancer/FreelancerLandingPage'

const Header = () => {

   const navigate=useNavigate()
  const dispatch =useDispatch()
  const handleLogout=()=>{
      navigate('/freelancer/login')
      dispatch(removeFreelancer())
      dispatch(freelancerRemoveToken())
    }
  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-transparent py-5' `}
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2 group">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 'bg-white text-workora-600' `}
                >
                  <span className="font-bold text-xl">W</span>
                </div>
                <span
                  className={`text-2xl font-bold tracking-tight transition-colors 'text-gray-900' : 'text-white'`}
                >
                  Workora
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                className={`p-2 rounded-full transition-colors hover:bg-white/10  'text-white/90 hover:text-white' `}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-full transition-colors hover:bg-white/10  'text-white/90 hover:text-white'}`}
                aria-label="Messages"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-300/30 mx-2"></div>
              {/* <button
              className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full transition-all hover:bg-white/10"
              aria-label="User Profile"
            >
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-workora-400 to-workora-600 flex items-center justify-center text-white shadow-md border-2 border-white/20">
                <User className="w-4 h-4" />
              </div>
               <NavLink
                to="/freelancer/dashboard"
              >
              Profile
              </NavLink>
            </button> */}

              <div className="relative group">
                {/* Profile Trigger */}
                <div
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full transition-all hover:bg-white/10 cursor-pointer"
                  aria-label="User Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-workora-400 to-workora-600 flex items-center justify-center text-white shadow-md border-2 border-white/20">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-white/90">Profile</span>
                </div>

                {/* Hover Dropdown */}
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transition-all duration-200 z-50"
                >
                  <NavLink
                    to="/freelancer/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl"
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              </div>


            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                //   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md'text-white' `}
              >
                {/* {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
            )} */}
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* <AnimatePresence> */}
        {/* {isMobileMenuOpen && ( */}
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: 'auto',
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="px-4 py-4 space-y-4">
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <Bell className="w-5 h-5 text-workora-600" />
              <span>Notifications</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <MessageSquare className="w-5 h-5 text-workora-600" />
              <span>Messages</span>
            </a>
            <NavLink
              to="/freelancer/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <User className="w-5 h-5 text-workora-600" />
              Profile
            </NavLink>
          </div>
        </motion.div>
        {/* )} */}
        {/* </AnimatePresence> */}
      </motion.header>
    </>
  )
}

export default Header
