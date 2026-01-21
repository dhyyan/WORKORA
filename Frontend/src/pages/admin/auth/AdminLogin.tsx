import { useState, type FormEvent } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { adminLoginService } from '../../../service/admin/adminAuthService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAdmin } from '../../../store/slice/admin/AdminSlice'
import { adminAddToken } from '../../../store/slice/admin/AdminTokenSlice'


const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const data = { email, password }
    const response = await adminLoginService(data)
    navigate("/admin/dashboard")
    dispatch(addAdmin(response.data))
    dispatch(adminAddToken(response.accessToken))
    toast.success("admin login success")
    console.log(response)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 p-4">
      <Toaster position="top-center" />

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
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'
                  } focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-8">
            © 2025 Workora Admin Panel — All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

