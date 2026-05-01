import { User, Wallet, Lock, LogOut, ShieldCheck, X } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const userdata = useSelector(
    (state: RootState) => state.freelancerAuth.freelancer
  );

  const menuItems = [
    { id: "/freelancer/dashboard", label: "Profile", icon: User },
    { id: "/freelancer/dashboard/wallet", label: "Wallet", icon: Wallet },
    { id: "/freelancer/dashboard/password", label: "Change Password", icon: Lock },
    { id: "/freelancer/subscription", label: "Subscription", icon: ShieldCheck },
  ].filter(item => {
    if (item.id.includes("password") && userdata?.googleId) return false
    return true
  })

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-[#f8fafc] border-r border-gray-200 px-6 py-6 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto md:min-h-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      {/* Mobile Close Button */}
      <button 
        className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
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
            end={id === "/freelancer/dashboard"}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
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
