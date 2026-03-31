import { Route, Routes } from "react-router-dom"
import Login from "../pages/client/auth/Login";
import SignUp from "../pages/client/auth/SignUp";
import ForgotPass from "../pages/client/auth/ForgotPass";
import ClientLandingPage from "../pages/client/ClientLandingPage";
import Dashboard from "../pages/client/Dashboard/Dashboard";
import ProfileView from "../components/client/dashboard/ProfileView";
import Wallet from "../components/client/dashboard/Wallet";
import ChangePassword from "../components/client/dashboard/ChangePassword";
import ProjectList from "../pages/client/project/ProjectList";
import ProjectDetails from "../pages/client/project/ProjectDetails";
import PaymentSuccess from "../pages/client/PaymentSuccess";
import ClientProtectRoute from "./ProtectRoute/ClientProtectRoute";
import ChatPage from "../pages/common/ChatPage";
import MessageTemplate from "../components/common/chat/MessageTemplate";
import MessageContainer from "../components/common/chat/MessageContainer";


export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<ClientProtectRoute><Login /></ClientProtectRoute>} />
        <Route path="/signup" element={<ClientProtectRoute><SignUp /></ClientProtectRoute>} />
        <Route path="/forgotpassword" element={<ClientProtectRoute><ForgotPass /></ClientProtectRoute>} />
        <Route path="/" element={<ClientLandingPage />} />
        <Route path="/profile" element={<Dashboard />}>
          <Route index element={<ProfileView />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="password" element={<ChangePassword />} />

        </Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/chat" element={<ChatPage />} > 
          <Route index element={<MessageTemplate />} />
          <Route path=":freelancerId/:clientId" element={<MessageContainer />} />
        </Route>
      </Routes>
    </>
  );
}

