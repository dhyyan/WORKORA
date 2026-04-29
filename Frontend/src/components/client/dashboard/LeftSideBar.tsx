import { NavLink } from "react-router-dom"
import {
  Briefcase,
  LogOut,
  User,
  Wallet,
  Lock,
  ShieldCheck,
  X
} from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"

interface LeftSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeftSideBar = ({ isOpen, onClose }: LeftSideBarProps) => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const menuItems = [
    { id: "/client/profile", label: "Profile", icon: User },
    { id: "/client/profile/projects", label: "My Projects", icon: Briefcase },
    { id: "/client/profile/wallet", label: "Wallet", icon: Wallet },
    { id: "/client/profile/password", label: "Change Password", icon: Lock },
    { id: "/client/profile/subscription", label: "Subscription", icon: ShieldCheck },
  ].filter(item => {
    if (item.id.includes("password") && userData?.googleId) return false
    return true
  })

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-[#f8fafc] border-r border-gray-200 px-6 py-6 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-full
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      {/* Mobile Close Button */}
      <button 
        className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <NavLink
            key={id}
            to={id}
            end={id === "/client/profile"}
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
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
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}

export default LeftSideBar
