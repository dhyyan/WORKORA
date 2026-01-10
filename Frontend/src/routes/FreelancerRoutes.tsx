import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/freelancer/auth/signUp'
import Login from '../pages/freelancer/auth/Login'
import ForgotPass from '../pages/freelancer/auth/ForgotPass'
import Profile from '../components/freelancer/DashBoard/Profile'
import DashBoardLayout from '../pages/freelancer/Dashboard/DashBoardLayout'
import FreelancerLandingPage from '../pages/freelancer/FreelancerLandingPage'
import EditProfilePage from '../components/freelancer/DashBoard/EditProfilePage'

const FreelancerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPass />} />
        <Route path='/' element={<FreelancerLandingPage />} />
        <Route path='/dashboard' element={<DashBoardLayout />}>
          <Route index element={<Profile />} />
          <Route path='editprofile' element={<EditProfilePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default FreelancerRoutes
