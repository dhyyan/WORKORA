import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/freelancer/auth/signUp'
import Login from '../pages/freelancer/auth/Login'
import ForgotPass from '../pages/freelancer/auth/ForgotPass'

const FreelancerRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotpassword' element={<ForgotPass/>}/>
    </Routes>
    </>
  )
}

export default FreelancerRoutes
