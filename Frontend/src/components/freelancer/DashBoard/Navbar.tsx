import { Bell, Menu, MessageSquare, Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { removeFreelancer } from '../../../store/slice/freelancer/FreelanceSlice'
import { freelancerRemoveToken } from '../../../store/slice/freelancer/FreelancerToken'

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const handleLogout=()=>{
      navigate('/freelancer/login',{replace:true})
      dispatch(removeFreelancer())
      dispatch(freelancerRemoveToken())
    }
  return (
    <>
        <nav className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-20 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md">
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

      {/* Center: Search (Optional visual filler) */}
      <div className="hidden md:flex max-w-md w-full mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="Search projects..."
          />
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

        {/* <button className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium text-sm border-2 border-white shadow-sm">
            SJ
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700 pr-2">
            Sarah J.
          </span>
        </button> */}

    <div className="relative group">
  <div className="flex items-center space-x-3 p-1 cursor-pointer hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200">
    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium text-sm border-2 border-white shadow-sm">
      SJ
    </div>
    <span className="hidden md:block text-sm font-medium text-gray-700 pr-2">
      Sarah J.
    </span>
  </div>

  {/* Hover Dropdown */}
  <div
    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transition-all duration-150 z-50"
  >
    

    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
    >
      Logout
    </button>
  </div>
</div>


      </div>
    </nav>
    </>
  )
}

export default Navbar
