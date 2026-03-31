import { BarChart3Icon, LogOutIcon, MenuIcon, UsersIcon, BadgeIndianRupee, LayoutGrid } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    const menuItems = [
        { id: "dashboard", icon: BarChart3Icon, label: "Dashboard" },
        { id: "clients", icon: UsersIcon, label: "Clients" },
        { id: "freelancers", icon: UsersIcon, label: "Freelancers" },
        { id: "escrow", icon: BadgeIndianRupee, label: "Escrow" },
        { id: "categories", icon: LayoutGrid, label: "Category" }
    ]
    return (
        <>

            <div>

                <aside
                    className={`md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Workora</h1>
                            <button className="md:hidden">
                                <MenuIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex-1 p-4 space-y-2">

                            {menuItems.map(({ id, icon: Icon, label }) => (
                                <NavLink
                                    key={id}
                                    to={id}

                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                            ${isActive
                                            ? "bg-emerald-100 text-emerald-700 font-semibold"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                                        }`
                                    }
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                            {/* <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg"
            >
              <BarChart3Icon className="w-5 h-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <UsersIcon className="w-5 h-5" />
              Clients
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <UsersIcon className="w-5 h-5" />
              Freelancers
            </a> */}
                        </nav>
                        <div className="p-4 border-t border-gray-200">
                            <button

                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOutIcon className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SideBar
