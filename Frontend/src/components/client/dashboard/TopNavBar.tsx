import { Bell, Menu, MessageSquare } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"


const TopNavBar = () => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
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
          <span className="font-bold text-xl text-gray-800">Workora</span>
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

          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
            <div className="text-right hidden sm:block">
              <p className="text-lm font-semibold text-gray-700 leading-none">
                <h1>{userData?.name}</h1>
              </p>

            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
              <img src={userData?.profileImage}
                alt=""
                className="w-32 h-8.5 rounded-full  border-purple-200 shadow-lg"

              />
            </div>
          </button>
        </div>
      </header>
    </>
  )
}

export default TopNavBar
