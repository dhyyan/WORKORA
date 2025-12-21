import { Route, Routes } from "react-router-dom"
import Login from "../pages/client/auth/Login";
import SignUp from "../pages/client/auth/SignUp";
import ForgotPass from "../pages/client/auth/ForgotPass";
import ClientLandingPage from "../pages/client/ClientLandingPage";
import Dashboard from "../pages/client/Dashboard/Dashboard";
import ProfileView from "../components/client/dashboard/ProfileView";
import Wallet from "../components/client/dashboard/Wallet";
import ChangePassword from "../components/client/dashboard/ChangePassword";



export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgotpassword" element={<ForgotPass/>}/>
        <Route path="/clientLanding" element={<ClientLandingPage/>}/>
        <Route path="/profile" element={<Dashboard/>}>
            <Route path="profile" element={<ProfileView/>}/>
            <Route path="projects" element={<Wallet/>}/>
            <Route path="wallet" element={<Wallet/>}/>
            <Route path="password" element={<ChangePassword/>}/>

        </Route>
      </Routes>
    </>
  );
}

 