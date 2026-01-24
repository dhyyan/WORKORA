import { Bell, Menu, MessageSquare } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import { NavLink, useNavigate } from "react-router-dom"
import { removeClient } from "../../../store/slice/client/clientSlice"
import { removeToken } from "../../../store/slice/client/clientTokenSlice"
// import { useState } from "react"


const TopNavBar = () => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const navigate=useNavigate()
  const dispatch =useDispatch()
  // const [open, setOpen] = useState(false)

  const handleLogout=()=>{
    navigate('/client/login',{replace:true})
    dispatch(removeClient())
    dispatch(removeToken())
  }
  return (
    <>
      <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-20 bg-white/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            //   onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            <NavLink to="/client">

            Workora
            </NavLink>
          </span>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <button className="relative p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50">
            <MessageSquare className="w-5 h-5" />
          </button>

          <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>


           <div className="relative group">
  <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
    <div className="text-right hidden sm:block">
      <p className="text-lm font-semibold text-gray-700 leading-none">
        <h1>{userData?.name}</h1>
      </p>
    </div>

    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
      <img
        src={userData?.profileImage}
        alt=""
        className="w-10 h-10 rounded-full object-cover shadow-lg"
      />
    </div>
  </button>

  {/* Hover Dropdown */}
  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 z-50">

   

    <button
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-xl"
      onClick={handleLogout}
      >
      Logout
    </button>
  </div>
</div>

{/* </div> */}


        </div>
      </header>
    </>
  )
}

export default TopNavBar
