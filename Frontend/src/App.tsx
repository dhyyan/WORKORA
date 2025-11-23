import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'

function App() {

  const routs = createBrowserRouter([
    {  path: '/client/*', element: <ClientRoutes />},
  
  ])


  return <RouterProvider router={routs} />
}

export default App
