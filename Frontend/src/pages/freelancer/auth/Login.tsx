import { EyeIcon, EyeOffIcon, LogInIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { motion, type Variants } from 'framer-motion';
import { useDispatch } from 'react-redux';
import type { LoginFormInputs } from '../../../types/auth/Tlogin';
import { freelancerLogin } from '../../../service/freelancer/authService';
import { addFreelancer } from '../../../store/slice/freelancer/FreelanceSlice';
import { freelancerAddToken } from '../../../store/slice/freelancer/FreelancerToken';
import toast from 'react-hot-toast';
import { useState } from 'react';
// import { clientLoginService } from '../../../service/client/authService';
// import { addClient } from '../../../store/slice/client/clientSlice';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("login datas", data);
    try {
      const response = await freelancerLogin(data);
      console.log("freelancer login success", response.user);
      dispatch(addFreelancer(response.user))
      dispatch(freelancerAddToken(response.accessToken))
      toast.success("login success")
      navigate('/')
      console.log("work")

    } catch (error) {
      console.log(error)
      toast.error("user not found")
    }
  };

  // Properly typed variants
  const heroVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formCardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Gradient Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-teal-500 p-12 flex-col justify-between text-white"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold"
        >
          Workora
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-6 max-w-xl">
          <h2 className="text-5xl font-bold leading-tight">
            Welcome Back to Workora
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            Manage your projects, explore new opportunites — all in one place.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm opacity-80"
        >
          © 2026 Workora. All rights reserved.
        </motion.p>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formCardVariants}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:hidden text-3xl font-bold text-green-600 mb-8"
          >
            Workora
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Freelancer Login</h2>
              <p className="text-gray-600">Sign in to access your dashboard, projects, and. message</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <motion.div variants={itemVariants}>
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </motion.div>


              {/* password */}

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: strongPasswordRegex,
                      message: "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters"
                    }
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                />
                <button 
                className="absolute right-65  pt-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={()=>setShowPassword(prev=>!prev)}>
                  
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
                
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </motion.div>

              <motion.a
                href="#"
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="block text-right text-sm text-green-600 hover:text-green-700 font-medium"
              >

                <Link to="/freelancer/forgotpassword">
                  Forgot Password?
                </Link>
              </motion.a>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <LogInIcon size={20} />
                {isSubmitting ? "Logging in..." : "Login"}
              </motion.button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/freelancer/signup" className="text-green-600 hover:text-green-700 font-semibold">
                Sign Up
              </Link>
            </motion.p>

            <motion.div variants={itemVariants} className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <span className="relative px-4 bg-white text-sm text-gray-500">Or login with</span>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold text-gray-700 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.6491C15.4 13.3 14.6727 14.3591 13.5864 15.0682V17.5773H16.8182C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4" />
                <path d="M10.2 20C12.9 20 15.1727 19.1045 16.8182 17.5773L13.5864 15.0682C12.6864 15.6682 11.5455 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.58636 11.9H1.25455V14.4909C2.89091 17.7591 6.29545 20 10.2 20Z" fill="#34A853" />
                <path d="M4.58636 11.9C4.37273 11.3 4.25 10.6591 4.25 10C4.25 9.34091 4.37273 8.7 4.58636 8.1V5.50909H1.25455C0.572727 6.86364 0.2 8.38636 0.2 10C0.2 11.6136 0.572727 13.1364 1.25455 14.4909L4.58636 11.9Z" fill="#FBBC05" />
                <path d="M10.2 3.97727C11.6727 3.97727 12.9818 4.48182 14.0091 5.47273L16.8727 2.60909C15.1682 0.990909 12.8955 0 10.2 0C6.29545 0 2.89091 2.24091 1.25455 5.50909L4.58636 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z" fill="#EA4335" />
              </svg>
              Continue with Google
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;