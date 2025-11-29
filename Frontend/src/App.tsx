import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'
import LandingPage from './pages/LandingPage'
import FreelancerRoutes from './routes/FreelancerRoutes'
import { Toaster } from 'react-hot-toast'


function App() {

  const routs = createBrowserRouter([
    {  path: '/client/*', element: <ClientRoutes />},
    { path:'/',element:<LandingPage/>},
    { path:'/freelancer/*', element:<FreelancerRoutes/>}
   ])


  return (
    
    <>
    <RouterProvider router={routs} />
    <Toaster
          position="top-right"
          reverseOrder={false}
        />
    </>
  )
}

export default App
