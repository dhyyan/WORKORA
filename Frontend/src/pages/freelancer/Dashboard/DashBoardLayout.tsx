import Navbar from '../../../components/freelancer/DashBoard/Navbar'
import Sidebar from '../../../components/freelancer/DashBoard/Sidebar'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 mt-16 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default DashBoardLayout
