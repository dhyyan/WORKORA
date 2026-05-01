
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/auth/AdminLogin'
import AdminDashBoardLayout from '../pages/admin/DashBoard/AdminDashBoardLayout'
import Clients from '../components/admin/Dashboard/Clients'
import Freelancers from '../components/admin/Dashboard/Freelancers'
import EscrowList from '../components/admin/Dashboard/EscrowList'
import CategoryList from '../components/admin/Dashboard/CategoryList'
import ConcernList from '../components/admin/Dashboard/ConcernList'
import SubscriptionList from '../components/admin/Dashboard/SubscriptionList'
import AdminProtectRoute from './ProtectRoute/AdminProtectRoute'
import AdminPublicRoute from './ProtectRoute/AdminPublicRoute'

const AdminRoutes = () => {
  return (
    <>
      <Routes>

        <Route path='/login' element={<AdminPublicRoute><AdminLogin /></AdminPublicRoute>} />
        <Route path='/dashboard' element={<AdminProtectRoute><AdminDashBoardLayout /></AdminProtectRoute>}>
          <Route path='clients' element={<Clients />} />
          <Route path='freelancers' element={<Freelancers />} />
          <Route path='escrow' element={<EscrowList />} />
          <Route path='categories' element={<CategoryList />} />
          <Route path='concerns' element={<ConcernList />} />
          <Route path='subscriptions' element={<SubscriptionList />} />
        </Route>
      </Routes>

    </>
  )
}

export default AdminRoutes
