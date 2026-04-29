import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/freelancer/auth/signUp'
import Login from '../pages/freelancer/auth/Login'
import ForgotPass from '../pages/freelancer/auth/ForgotPass'
import Profile from '../components/freelancer/DashBoard/Profile'
import Wallet from '../components/freelancer/DashBoard/Wallet'
import DashBoardLayout from '../pages/freelancer/Dashboard/DashBoardLayout'
import FreelancerLandingPage from '../pages/freelancer/FreelancerLandingPage'
import EditProfilePage from '../components/freelancer/DashBoard/EditProfilePage'
import ChangePassword from '../components/freelancer/DashBoard/ChangePassword'
import FreelancerProtectRoute from './ProtectRoute/FreelancerProtectRoute'
import FreelancerPublicRoute from './ProtectRoute/FreelancerPublicRoute'
import FreelancerLayout from '../components/layout/FreelancerLayout'

import FreelancerJobListing from '../pages/freelancer/Jobs/JobList'
import ErrorBoundary from '../components/common/ErrorBoundary';
import JobDetails from '../pages/freelancer/Jobs/JobDetails';
import ChatPage from '../pages/common/ChatPage'
import MessageTemplate from '../components/common/chat/MessageTemplate'
import MessageContainer from "../components/common/chat/MessageContainer"
import SubscriptionPage from '../pages/common/SubscriptionPage'
import SubscriptionSuccess from '../pages/common/SubscriptionSuccess'
import SubscriptionCancel from '../pages/common/SubscriptionCancel'


const FreelancerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='signup' element={<FreelancerPublicRoute> <SignUp /> </FreelancerPublicRoute>} />
        <Route path='login' element={<FreelancerPublicRoute> <Login /> </FreelancerPublicRoute>} />
        <Route path='forgotpassword' element={<FreelancerPublicRoute> <ForgotPass /> </FreelancerPublicRoute>} />

        <Route element={<FreelancerLayout />}>
          <Route path='' element={<FreelancerLandingPage />} />

          <Route path='dashboard' element={<FreelancerProtectRoute><DashBoardLayout /></FreelancerProtectRoute>}>
            <Route index element={<Profile />} />
            <Route path='editprofile' element={<EditProfilePage />} />
            <Route path='wallet' element={<Wallet />} />
            <Route path='password' element={<ChangePassword />} />
            <Route path='subscription' element={<SubscriptionPage role="freelancer" showNavbar={false} />} />
          </Route>

          <Route path='jobs' element={
            <FreelancerProtectRoute>
              <ErrorBoundary>
                <FreelancerJobListing />
              </ErrorBoundary>
            </FreelancerProtectRoute>
          } />
          <Route path='jobs/:id' element={
            <FreelancerProtectRoute>
              <ErrorBoundary>
                <JobDetails />
              </ErrorBoundary>
            </FreelancerProtectRoute>
          } />

          <Route path='subscription-success' element={<SubscriptionSuccess role="freelancer" />} />
          <Route path='subscription-cancel' element={<SubscriptionCancel role="freelancer" />} />

          <Route path='chat' element={<FreelancerProtectRoute><ChatPage /></FreelancerProtectRoute>} >
            <Route index element={<MessageTemplate />} />
            <Route path=':freelancerId/:clientId' element={<MessageContainer />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default FreelancerRoutes
