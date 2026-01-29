import { useEffect, useState, type FormEvent } from "react"
import { clientForgotPass, clientForgotPassOtpVerify, clientNewPassword, clientResendOtp } from "../../../service/client/authService"
import OtpModal from "../../../components/modal/client/OtpModal"
import { useNavigate } from "react-router-dom"
import NewPassword from "../../../components/modal/client/NewPassword"
import toast from "react-hot-toast"



const ForgotPass = () => {
    const [email, setEmail] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isNewPass, setIsNewPass] = useState(false)
    const [time,setTime]=useState(0)
    const [isRunning,setIsRunning]=useState(false)
    const navigate = useNavigate()

    useEffect(()=>{

        setInterval(()=>{
            
            console.log("calleddddd")
            
            let i=0
            setTime(i)
            i++
        },3000)
    },[isRunning])
    //handle submit function
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const respone = await clientForgotPass({ email })
            console.log("response from forgotPass", respone)
            toast.success("otp sended");
            setIsOpen(true)

        } catch (error) {
            console.log(error)
            toast.error("user not found")
        }
    }

    const handleSubmitOtp = async (otp: string) => {
        if (otp.length !== 6) return
        const val = {
            email,
            otp
        }
        try {
            const response = await clientForgotPassOtpVerify(val)
            if (response) {
                setIsOpen(false)
                toast.success("otp verifyied")
                setIsNewPass(true)
                console.log("otp respone", response)

            }

        } catch (error) {
            console.log(error)
            toast.error("otp not match")
        }

    }

    const handleSubmitResendOtp = async () => {
        toast.success("resend otp sended")
        const response = await clientResendOtp({ email })
        console.log('response :>> ', response);
    }

    const handleSubmitNewPass = async (password: string, confirmPassword: string) => {
        if (!password || !confirmPassword) throw new Error("required fields are missing")
        if (password !== confirmPassword) throw new Error("Password dosen't match")
        const val = {
            email,
            password
        }
        try {
            const respone = await clientNewPassword(val)
            console.log(respone)
            navigate("/client/login",{replace:true})
            
        } catch (error) {
            console.log(error)
            toast.error("password not match")
        }
    }


    return (
        <>
        <h1>{isRunning?time:"resendOtp"}</h1>
        <button onClick={()=>setIsRunning(true)}>resend</button>
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
                        © 2026 Workora. All rights reserved.
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
                {isOpen ? <OtpModal handleSubmitOtp={handleSubmitOtp} handleSubmitResendOtp={handleSubmitResendOtp} /> : <></>}
                {/* {isOpen?<NewPassword/>:<></>} */}
                {isNewPass ? <NewPassword handleSubmitNewPass={handleSubmitNewPass} /> : <></>}
            </div>
        </>

    )
}

export default ForgotPass
