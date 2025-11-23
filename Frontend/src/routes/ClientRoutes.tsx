import { Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"
import SignUp from "../pages/auth/SignUp";


export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

 