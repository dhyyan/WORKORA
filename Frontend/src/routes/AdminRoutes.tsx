
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/auth/AdminLogin'
import AdminDashBoardLayout from '../pages/admin/DashBoard/AdminDashBoardLayout'
import Clients from '../components/admin/Dashboard/Clients'
import Freelancers from '../components/admin/Dashboard/Freelancers'
import EscrowList from '../components/admin/Dashboard/EscrowList'
import CategoryList from '../components/admin/Dashboard/CategoryList'

const AdminRoutes = () => {
  return (
    <>
      <Routes>

        <Route path='/login' element={<AdminLogin />} />
        <Route path='/dashboard' element={<AdminDashBoardLayout />}>
          <Route path='clients' element={<Clients />} />
          <Route path='freelancers' element={<Freelancers />} />
          <Route path='escrow' element={<EscrowList />} />
          <Route path='categories' element={<CategoryList />} />
        </Route>
      </Routes>

    </>
  )
}

export default AdminRoutes
