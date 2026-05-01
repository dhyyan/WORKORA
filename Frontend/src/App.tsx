import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClientRoutes } from './routes/ClientRoutes'
import LandingPage from './pages/LandingPage'
import FreelancerRoutes from './routes/FreelancerRoutes'
import { Toaster } from 'react-hot-toast'
import AdminRoutes from './routes/AdminRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SplashLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative">
        {/* Workora Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200">
            <span className="text-white font-black text-4xl">W</span>
          </div>
          <span className="text-5xl font-black text-gray-900 tracking-tighter">Workora</span>
        </motion.div>

        {/* Premium Spinner */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent shadow-sm"
            ></motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 font-semibold tracking-widest uppercase text-[10px]"
          >
            Securing Connection
          </motion.p>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[100px] opacity-50"></div>
    </motion.div>
  )
}

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    // Simulate initial app loading (checking auth, etc.)
    const timer = setTimeout(() => {
      setIsAppLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const routs = createBrowserRouter([
    { path: '/client/*', element: <ClientRoutes /> },
    { path: '/', element: <LandingPage /> },
    { path: '/freelancer/*', element: <FreelancerRoutes /> },
    { path: "/admin/*", element: <AdminRoutes /> }
  ])

  return (
    <>
      <AnimatePresence>
        {isAppLoading && <SplashLoader key="splash" />}
      </AnimatePresence>

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
