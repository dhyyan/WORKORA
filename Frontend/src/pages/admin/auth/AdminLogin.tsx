import { useState, type FormEvent } from 'react'
import { Toaster } from 'react-hot-toast'
import { adminLoginService } from '../../../service/admin/adminAuthService'

const AdminLogin = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handleSubmit=async(e: FormEvent)=>{
    e.preventDefault()
    const data={
      email,
      password
    }
    const response=await adminLoginService(data)
    console.log(response)
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 p-4">
      <Toaster position="top-center"/>
      <div className="w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Workora Admin Login
            </h1>
              <p className="text-gray-600 text-sm">
              Sign in to manage freelancers, clients, and jobs
              </p>
          </div>
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email 
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                // className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your email"
              />
    
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                 value={password}
                onChange={(e)=>setPassword(e.target.value)}
                // className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your password"
              />
              
            </div>
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Login
            </button>
          </form>
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © 2025 Workora Admin Panel — All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
