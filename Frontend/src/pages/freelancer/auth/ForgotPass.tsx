import { useState, type FormEvent } from "react"
import OtpModal from "../../../components/modal/freelancer/OtpModal"
import { freelacerForgotOtpVerify, freelancerforgotpass, freelancerResendOtp, freelecrForgotNewPass } from "../../../service/freelancer/authService"
import NewPassword from "../../../components/modal/freelancer/NewPassModal"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ForgotPass = () => {

    const [email, setEmail] = useState("")
    const [isOtp, setIsOtp] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await freelancerforgotpass({ email })
            console.log('response :>> ', response);
            toast.success("otp sended");
            setIsOtp(true)

        } catch (error) {
            console.log(error)
            toast.error("user not found")
        }
    }

    const handleSubmitOtp = async (otp: string) => {
        const val = {
            email,
            otp
        }
        try {
            
            const response = await freelacerForgotOtpVerify(val)
            console.log('response :>> ', response);
             toast.success("otp verifyied")
            setIsPass(true)
            setIsOtp(false)
        } catch (error) {
            console.log(error)
            toast.error("otp not match")
        }

    }

    const handleResendOtp = async () => {
        const val = {
            email
        }

        try {
            const response = await freelancerResendOtp(val)
            console.log('response :>> ', response);
        } catch (error) {
            console.log(error)
            toast.error("invalid otp")
        }
    }

    const handleSubmitNewPass = async (password: string, confirmPassword: string) => {

        if (!password || !confirmPassword) throw new Error("fields are missing")
        if (password !== confirmPassword) throw new Error("password not match")
        const val = {
            email,
            password
        }
        try {
            const response = await freelecrForgotNewPass(val)
            console.log('response :>> ', response);
    
            navigate('/freelancer/login')
            setIsOtp(false)
            setIsPass(false)
            
        } catch (error) {
            console.log(error)
            toast.error("password not match")
        }

    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Green Gradient */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00C16A] to-[#00A86B] p-12 flex-col justify-between text-white">
                <div>
                    <h1 className="text-3xl font-bold">Workora</h1>
                </div>

                <div className="max-w-md">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                        Reset Your Password
                    </h2>
                    <p className="text-lg text-gray-100 leading-relaxed">
                        Enter your email to receive a verification code and reset your
                        password.
                    </p>
                </div>

                <div className="text-sm text-gray-200">
                    © 2024 Workora. All rights reserved.
                </div>
            </div>

            {/* Right Side - White Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-12">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Workora</h1>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Forgot Password
                        </h2>
                        <p className="text-gray-600">
                            We'll send you a 6-digit verification code.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-500/30"
                        >
                            Send OTP

                        </button>

                        <div className="text-center text-sm text-gray-600">
                            Remember your password?{' '}
                            <a
                                href="#"
                                className="text-[#00C16A] font-semibold hover:text-[#00A86B] transition-colors"
                            >
                                Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            {isOtp ? <OtpModal handleSubmitOtp={handleSubmitOtp} handleResendOtp={handleResendOtp} /> : <></>}
            {isPass ? <NewPassword handleSubmitNewPass={handleSubmitNewPass} /> : <></>}
        </div>
    )
}

export default ForgotPass
