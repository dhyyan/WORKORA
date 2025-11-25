import { Route, Routes } from "react-router-dom"
import Login from "../pages/client/auth/Login";
import SignUp from "../pages/client/auth/SignUp";
import ForgotPass from "../pages/client/auth/ForgotPass";



export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgotpassword" element={<ForgotPass/>}/>
      </Routes>
    </>
  );
}

 