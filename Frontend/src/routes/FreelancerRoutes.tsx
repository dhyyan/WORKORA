import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/freelancer/auth/signUp'
import Login from '../pages/freelancer/auth/Login'
import ForgotPass from '../pages/freelancer/auth/ForgotPass'
import Profile from '../components/freelancer/DashBoard/Profile'
import DashBoardLayout from '../pages/freelancer/Dashboard/DashBoardLayout'
import FreelancerLandingPage from '../pages/freelancer/FreelancerLandingPage'
import EditProfilePage from '../components/freelancer/DashBoard/EditProfilePage'
import FreelancerProtectRoute from './ProtectRoute/FreelancerProtectRoute'
import FreelancerJobListing from '../pages/freelancer/Jobs/JobList'
import ErrorBoundary from '../components/common/ErrorBoundary';
import JobDetails from '../pages/freelancer/Jobs/JobDetails';

const FreelancerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<FreelancerProtectRoute> <SignUp /> </FreelancerProtectRoute>} />
        <Route path='/login' element={<FreelancerProtectRoute> <Login /> </FreelancerProtectRoute>} />
        <Route path='/forgotpassword' element={<FreelancerProtectRoute> <ForgotPass /> </FreelancerProtectRoute>} />
        <Route path='/' element={<FreelancerLandingPage />} />

        {/* Standalone Job Listing Page */}
        <Route path='/dashboard' element={<DashBoardLayout />}>
          <Route index element={<Profile />} />
          <Route path='editprofile' element={<EditProfilePage />} />
        </Route>
        <Route path='/jobs' element={
          <ErrorBoundary>
            <FreelancerJobListing />
          </ErrorBoundary>
        } />
        <Route path='/jobs/:id' element={
          <ErrorBoundary>
            <JobDetails />
          </ErrorBoundary>
        } />
      </Routes>
    </>
  )
}

export default FreelancerRoutes
