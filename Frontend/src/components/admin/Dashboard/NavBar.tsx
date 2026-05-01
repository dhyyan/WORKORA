import { MenuIcon } from 'lucide-react'

const NavBar = () => {
  return (
   <>
   <div>
    <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
               
                className="md:hidden"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
          
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@freelancehub.com</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>
   </div>
   </>
  )
}

export default NavBar
