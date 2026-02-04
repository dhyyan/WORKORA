import { Briefcase, User, Wallet, Lock, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const menuItems = [
    { id: "", label: "Profile", icon: User },
    { id: "projects", label: "My Projects", icon: Briefcase },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "password", label: "Change Password", icon: Lock },
  ]

  return (
    <aside className="hidden md:flex flex-col w-72 min-h-screen bg-[#f8fafc] border-r border-gray-200 px-6 py-6">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">W</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">
          Workora
        </span>
      </div>

      {/* Section title */}

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <NavLink
            key={id}
            to={id} // nested route
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all
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
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-gray-500 hover:bg-red-50 hover:text-red-600 transition mt-6">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}

export default Sidebar
