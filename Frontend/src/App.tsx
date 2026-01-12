import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'
import LandingPage from './pages/LandingPage'
import FreelancerRoutes from './routes/FreelancerRoutes'
import { Toaster } from 'react-hot-toast'
import AdminRoutes from './routes/AdminRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  const routs = createBrowserRouter([
    {  path: '/client/*', element: <ClientRoutes />},
    { path:'/',element:<LandingPage/>},
    { path:'/freelancer/*', element:<FreelancerRoutes/>},
    {path:"/admin/*", element:<AdminRoutes/>}
   ])


  return (
    
    <>
    <GoogleOAuthProvider clientId={"634357035968-t3ea5k6rbujccmqq7969lshfk1l5bt1r.apps.googleusercontent.com"}>

    <RouterProvider router={routs} />
    <Toaster
          position="top-right"
          reverseOrder={false}
          />
          </GoogleOAuthProvider>
    </>
  )
}

export default App
