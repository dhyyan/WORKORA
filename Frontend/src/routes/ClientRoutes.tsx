import { Route, Routes } from "react-router-dom"
import Login from "../pages/auth/Login"

export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />\
        <Route path="/" element={<><h1>dfdfdddddddddddd</h1></>}/>
      </Routes>
    </>
  );
}

 