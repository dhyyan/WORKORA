import { Bell, Menu, MessageSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { removeFreelancer } from '../../../store/slice/freelancer/FreelanceSlice'
import { freelancerRemoveToken } from '../../../store/slice/freelancer/FreelancerToken'
import { getUserDetails } from '../../../service/freelancer/Dashboard/profileService'
import { useEffect, useState } from 'react'
import type { IProfile } from '../../../types/freelancer/Dashboard/IProfile'
import type { RootState } from "../../../store/store";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
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

  const handleLogout = () => {
    navigate('/freelancer/login', { replace: true })
    dispatch(removeFreelancer())
    dispatch(freelancerRemoveToken())
  }

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-20 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            <NavLink to="/freelancer">
              Workora
            </NavLink>
          </span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

        <div className="relative group">
          <div className="flex items-center space-x-3 p-1 cursor-pointer hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium text-sm border-2 border-white shadow-sm overflow-hidden">
              <img src={data?.profileImage} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 pr-2">
             {data?.name}
            </span>
          </div>

          {/* Hover Dropdown */}
          <div
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg
             opacity-0 invisible group-hover:opacity-100 group-hover:visible
             transition-all duration-150 z-50"
          >
            <div className="p-3 border-b border-gray-50 md:hidden text-xs font-semibold text-gray-500">
              {data?.name}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
