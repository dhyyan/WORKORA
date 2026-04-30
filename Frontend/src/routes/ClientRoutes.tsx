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
import ClientPublicRoute from "./ProtectRoute/ClientPublicRoute";
import ChatPage from "../pages/common/ChatPage";
import MessageTemplate from "../components/common/chat/MessageTemplate";
import MessageContainer from "../components/common/chat/MessageContainer";
import SubscriptionPage from "../pages/common/SubscriptionPage";
import SubscriptionSuccess from "../pages/common/SubscriptionSuccess";
import SubscriptionCancel from "../pages/common/SubscriptionCancel";
import ClientLayout from "../components/layout/ClientLayout";



export function ClientRoutes() {
  return (
    <>
      <Routes>
        <Route path="login" element={<ClientPublicRoute><Login /></ClientPublicRoute>} />
        <Route path="signup" element={<ClientPublicRoute><SignUp /></ClientPublicRoute>} />
        <Route path="forgotpassword" element={<ClientPublicRoute><ForgotPass /></ClientPublicRoute>} />

        <Route element={<ClientLayout />}>
          <Route path="" element={<ClientLandingPage />} />
          <Route element={<ClientProtectRoute><Dashboard /></ClientProtectRoute>}>
            <Route path="subscription" element={<SubscriptionPage role="client" showNavbar={false} />} />
            <Route path="profile">
              <Route index element={<ProfileView />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="subscription-success" element={<SubscriptionSuccess role="client" />} />
          <Route path="subscription-cancel" element={<SubscriptionCancel role="client" />} />

          <Route path="chat" element={<ClientProtectRoute><ChatPage /></ClientProtectRoute>} >
            <Route index element={<MessageTemplate />} />
            <Route path=":freelancerId/:clientId" element={<MessageContainer />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

