import TopNavBar from '../../../components/client/dashboard/TopNavBar'
import LeftSideBar from '../../../components/client/dashboard/LeftSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <LeftSideBar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="min-h-[calc(100vh-96px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
