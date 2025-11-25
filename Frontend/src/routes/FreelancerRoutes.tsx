import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/freelancer/auth/signUp'
import Login from '../pages/freelancer/auth/Login'

const FreelancerRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default FreelancerRoutes
