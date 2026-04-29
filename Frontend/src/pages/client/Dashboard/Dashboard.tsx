import { useState } from 'react'
import LeftSideBar from '../../../components/client/dashboard/LeftSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar */}
      <LeftSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Right Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="min-h-[calc(100vh-64px)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
