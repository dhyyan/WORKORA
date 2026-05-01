import { Bell, Menu, MessageSquare } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import { NavLink, useNavigate } from "react-router-dom"
import { removeClient } from "../../../store/slice/client/clientSlice"
import { removeToken } from "../../../store/slice/client/clientTokenSlice"

interface TopNavBarProps {
  onMenuClick: () => void;
}

const TopNavBar = ({ onMenuClick }: TopNavBarProps) => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    navigate('/client/login', { replace: true })
    dispatch(removeClient())
    dispatch(removeToken())
  }

  return (
    <header className="h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 lg:border-none">
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <NavLink to="/client" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight hidden xs:block">
            Workora
          </span>
        </NavLink>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ml-auto">
        <button className="relative p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50">
          <NavLink to="/client/chat">
            <MessageSquare className="w-5 h-5" />
          </NavLink>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

        <div className="relative group">
          <button className="flex items-center gap-2 md:gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-700 leading-none">
                {userData?.name}
              </p>
            </div>

            <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm overflow-hidden">
              <img
                src={userData?.profileImage || "https://t3.ftcdn.net/jpg/07/95/95/14/360_F_795951406_h17eywwIo36DU2L8jXtsUcEXqPeScBUq.jpg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* Hover Dropdown */}
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-50 md:hidden bg-gray-50/50">
               <p className="text-sm font-bold text-gray-900 truncate">{userData?.name}</p>
               <p className="text-[10px] text-gray-500 truncate">{userData?.email}</p>
            </div>
            <NavLink to="/client/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              Profile Settings
            </NavLink>
            <button
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar
