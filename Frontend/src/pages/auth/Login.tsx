import { LogInIcon } from 'lucide-react';
// import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { LoginFormInputs } from '../../types/client/auth/Tlogin';

const Login = () => {



  // const navigate = useNavigate()
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>()

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
    console.log("login datas", data)
    
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Gradient Hero (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-teal-500 p-12 flex-col justify-between text-white">
        <h1 className="text-4xl font-bold">Workora</h1>

        <div className="space-y-6 max-w-xl">
          <h2 className="text-5xl font-bold leading-tight">
            Welcome Back to Workora
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Manage your projects, hire top freelancers, and grow your business — all in one place.
          </p>
        </div>

        <p className="text-sm opacity-80">© 2024 Workora. All rights reserved.</p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <h1 className="lg:hidden text-3xl font-bold text-green-600 mb-8">Workora</h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Login to Your Account</h2>
              <p className="text-gray-600">Access your Workora client dashboard.</p>
            </div>


            {/* form  start*/}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format"
                    }
                  })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: strongPasswordRegex,
                      message:
                        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters"
                    }
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <a href="#" className="block text-right text-sm text-green-600 hover:text-green-700 font-medium">
                Forgot Password?
              </a>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <LogInIcon size={20} />
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              {/* <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                Sign Up
              </a> */}

              <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold"> Sign Up</Link>

            </p>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <span className="relative px-4 bg-white text-sm text-gray-500">Or login with</span>
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold text-gray-700 transition">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.6491C15.4 13.3 14.6727 14.3591 13.5864 15.0682V17.5773H16.8182C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4" />
                <path d="M10.2 20C12.9 20 15.1727 19.1045 16.8182 17.5773L13.5864 15.0682C12.6864 15.6682 11.5455 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.58636 11.9H1.25455V14.4909C2.89091 17.7591 6.29545 20 10.2 20Z" fill="#34A853" />
                <path d="M4.58636 11.9C4.37273 11.3 4.25 10.6591 4.25 10C4.25 9.34091 4.37273 8.7 4.58636 8.1V5.50909H1.25455C0.572727 6.86364 0.2 8.38636 0.2 10C0.2 11.6136 0.572727 13.1364 1.25455 14.4909L4.58636 11.9Z" fill="#FBBC05" />
                <path d="M10.2 3.97727C11.6727 3.97727 12.9818 4.48182 14.0091 5.47273L16.8727 2.60909C15.1682 0.990909 12.8955 0 10.2 0C6.29545 0 2.89091 2.24091 1.25455 5.50909L4.58636 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;