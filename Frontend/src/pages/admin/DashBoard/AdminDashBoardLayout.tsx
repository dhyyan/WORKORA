import { Outlet } from "react-router-dom"
import NavBar from "../../../components/admin/Dashboard/NavBar"
import SideBar from "../../../components/admin/Dashboard/SideBar"

const AdminDashBoardLayout = () => {
  return (
    <>
      <div className="min-h-screen flex bg-[#F7FAF9]">
        {/* Left Sidebar */}
        <SideBar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <NavBar />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[calc(100vh-96px)]">

              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminDashBoardLayout
