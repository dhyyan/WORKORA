import { useState, type FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import { adminLoginService } from '../../../service/admin/adminAuthService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAdmin } from '../../../store/slice/admin/AdminSlice'
import { adminAddToken } from '../../../store/slice/admin/AdminTokenSlice'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
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

    if (!validate()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    try {
      const data = { email, password }
      const response = await adminLoginService(data)
      
      if (response && response.data) {
        dispatch(addAdmin(response.data))
        dispatch(adminAddToken(response.accessToken))
        toast.success("Admin login successful")
        navigate("/admin/dashboard", { replace: true })
      } else {
        toast.error("Invalid credentials or server error")
      }
    } catch (error: unknown) {
      console.error("Login error:", error)
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 p-4">

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
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-white'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none`}
                  placeholder="admin@workora.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-white'
                    } focus:ring-2 focus:ring-blue-500/20 outline-none pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-8">
            © {new Date().getFullYear()} Workora Admin Panel — All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

