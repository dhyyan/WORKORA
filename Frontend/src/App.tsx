import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'
import LandingPage from './pages/LandingPage'

function App() {

  const routs = createBrowserRouter([
    {  path: '/client/*', element: <ClientRoutes />},
    { path:'/',element:<LandingPage/>}

  
  ])


  return <RouterProvider router={routs} />
}

export default App
