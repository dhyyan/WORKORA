import TopNavBar from '../../../components/client/dashboard/TopNavBar'
import LeftSideBar from '../../../components/client/dashboard/LeftSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen flex bg-[#F7FAF9]">
        {/* Left Sidebar */}
        <LeftSideBar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <TopNavBar />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-96px)]">
              {/* dashboard content goes here */}
              {/* <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, Alex!
            </h1> */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>


    </>
  )
}

export default Dashboard
