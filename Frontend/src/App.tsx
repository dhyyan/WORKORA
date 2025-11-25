import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'
import LandingPage from './pages/LandingPage'
import FreelancerRoutes from './routes/FreelancerRoutes'


function App() {

  const routs = createBrowserRouter([
    {  path: '/client/*', element: <ClientRoutes />},
    { path:'/',element:<LandingPage/>},
    { path:'/freelancer/*', element:<FreelancerRoutes/>}
   ])


  return <RouterProvider router={routs} />
}

export default App
