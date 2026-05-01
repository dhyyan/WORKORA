import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Menu, MessageSquare, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { removeFreelancer } from '../../../store/slice/freelancer/FreelanceSlice'
import { freelancerRemoveToken } from '../../../store/slice/freelancer/FreelancerToken'
import { getUserDetails } from '../../../service/freelancer/Dashboard/profileService'
import type { IProfile } from '../../../types/freelancer/Dashboard/IProfile'
import type { RootState } from "../../../store/store";

interface HeaderProps {
  alwaysSolid?: boolean;
  onMenuClick?: () => void;
}

const Header = ({ alwaysSolid = false, onMenuClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userdata = useSelector(
    (state: RootState) => state.freelancerAuth.freelancer
  );

  const [data, setData] = useState<IProfile | null>(null);
  
  useEffect(() => {
    const userId = userdata?._id;
    if (!userId) return;
    
    const fetchUser = async () => {
      try {
        const response = await getUserDetails({ userId });
        setData(response.data.userDetails);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUser();
  }, [userdata?._id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    navigate('/freelancer/login')
    dispatch(removeFreelancer())
    dispatch(freelancerRemoveToken())
  }

  const isSolid = alwaysSolid || scrolled || isMobileMenuOpen;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className={`p-2 mr-2 rounded-lg transition-colors md:hidden ${
                  isSolid ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <NavLink to="/freelancer" className="flex items-center gap-2 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isSolid ? 'bg-workora-600' : 'bg-white'
              }`}>
                <span className={`text-2xl font-bold tracking-tighter ${
                  isSolid ? 'text-white' : 'text-workora-600'
                }`}>
                  W
                </span>
              </div>
              <span className={`text-2xl font-bold tracking-tight transition-colors ${
                isSolid ? 'text-gray-900' : 'text-white'
              }`}>
                Workora
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              className={`p-2 rounded-full transition-colors ${
                isSolid ? 'text-gray-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <NavLink
              to="/freelancer/chat"
              className={`p-2 rounded-full transition-colors ${
                isSolid ? 'text-gray-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </NavLink>
            
            <div className={`h-6 w-px mx-2 ${isSolid ? 'bg-gray-200' : 'bg-white/20'}`}></div>

            <div className="relative group">
              <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-all hover:bg-black/5 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-workora-400 to-workora-600 flex items-center justify-center text-white shadow-sm overflow-hidden">
                  {data?.profileImage ? (
                    <img src={data.profileImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <span className={`font-medium ${isSolid ? 'text-gray-700' : 'text-white'}`}>{data?.name || 'Profile'}</span>
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                <NavLink to="/freelancer/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Dashboard
                </NavLink>
                <hr className="my-1 border-gray-100" />
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled || isMobileMenuOpen ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2">
              <NavLink
                to="/freelancer/notifications"
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-workora-50 text-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-workora-100 flex items-center justify-center text-workora-600">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium">Notifications</span>
              </NavLink>
              
              <NavLink
                to="/freelancer/chat"
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-workora-50 text-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-workora-100 flex items-center justify-center text-workora-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-medium">Messages</span>
              </NavLink>

              <NavLink
                to="/freelancer/dashboard"
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-workora-50 text-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-workora-100 flex items-center justify-center text-workora-600">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-medium">Profile</span>
              </NavLink>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 font-semibold"
                >
                  <X className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
