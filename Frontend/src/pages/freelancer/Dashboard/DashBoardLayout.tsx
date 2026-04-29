import { useState } from 'react'
import Header from '../../../components/freelancer/LandingPage/Header'
import Sidebar from '../../../components/freelancer/DashBoard/Sidebar'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <Header alwaysSolid={true} onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashBoardLayout
