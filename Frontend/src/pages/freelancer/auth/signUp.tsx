import { BuildingIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { ISignUp } from '../../../types/auth/ISignUp';
// import { useNavigate } from 'react-router-dom';


import { Link, useNavigate } from 'react-router-dom';

import { freelacerOtpService, freelancerResendOtp, freelancerSignUp } from '../../../service/freelancer/authService';
import OtpModal from '../../../components/modal/freelancer/OtpModal';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ISignUp>();

    const onSubmit: SubmitHandler<ISignUp> = async (data) => {
        console.log("sign Up data", data);
        setData({ ...data })
        try {
            const response = await freelancerSignUp(data);
            console.log("otp page ", response);
            toast.success("success")
            setOpen(true)

        } catch (error) {
            console.log(error)
            toast.error("user in this email already exist")
        }
    };


    const handleSubmitOtp = async (otp: string) => {
        if (otp.length !== 6) return
        const val = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            otp
        }
        try {

            const response = await freelacerOtpService(val)
            toast.success("otp success")
            navigate('/freelancer/login')
            console.log("otp respone", response)
        } catch (error) {
            console.log(error)
            toast.error("invalid otp")
        }
    }

    const handleResendOtp = async () => {
        const val = {
            email: data.email
        }

        try {
            const response = await freelancerResendOtp(val)
            console.log('response :>> ', response);
        } catch (error) {
            console.log(error)
            toast.error("invalid otp")
        }
    }

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Section - Gradient Background */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 flex-col justify-between">
                <div>
                    <h1 className="text-white text-4xl font-bold mb-2">Workora</h1>
                </div>
                <div className="text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Start Your Freelance Journey Today
                    </h2>
                    <p className="text-lg text-white/90">
                        Join thousands of freelancers and clients who trust
                        Workora to connect, collaborate, and grow their
                        businesses.
                    </p>
                </div>
                <div className="flex gap-2">
                    <div className="w-12 h-1 bg-white rounded"></div>
                    <div className="w-12 h-1 bg-white/40 rounded"></div>
                    <div className="w-12 h-1 bg-white/40 rounded"></div>
                </div>
            </div>
            {/* Right Section - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8">
                        <h1 className="text-green-600 text-3xl font-bold">Workora</h1>
                    </div>
                    {/* Sign Up Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Your Frellancer Account
                            </h2>
                            <p className="text-gray-600">
                                Join Workora and start your freelance journey today.

                            </p>
                        </div>
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Name must be at least 3 characters",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Name can contain only letters and spaces",
                                            }
                                        })}
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
                                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    />

                                    {/* Error Message */}
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                            </div>
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>

                                <div className="relative">
                                    <BuildingIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
        text-gray-400 w-5 h-5" />

                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-green-500 
                 focus:border-transparent transition"

                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Phone number must be 10 digits",
                                            },
                                        })}
                                    />
                                </div>

                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
        text-gray-400 w-5 h-5" />

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-green-500 
                 focus:border-transparent transition"

                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid email format",
                                            },
                                        })}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"

                                        {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: strongPasswordRegex,
                                                message:
                                                    "Password must contain uppercase, lowercase, number, special character & be at least 8 characters",
                                            },
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"

                                        {...register("confirmPassword", {
                                            required: "Confirm Password is required",
                                            validate: (value) =>
                                                // eslint-disable-next-line react-hooks/incompatible-library
                                                value === watch("password") || "Passwords do not match",
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOffIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>


                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-500/30"
                            >
                                {isSubmitting ? "Logging in..." : "Sign Up"}
                            </button>
                            {/* Login Link */}

                            <Link to="/freelancer/login" className="text-green-600 hover:text-green-700 font-semibold">


                                <p className="text-center text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <h4 className="text-green-600 font-semibold hover:text-green-700">Login</h4>
                                </p>
                            </Link>
                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>
                            {/* Google Sign Up */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Sign up with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {isOpen ? <OtpModal handleSubmitOtp={handleSubmitOtp} handleResendOtp={handleResendOtp} /> : <></>}
        </div>
    )
}

export default SignUp
