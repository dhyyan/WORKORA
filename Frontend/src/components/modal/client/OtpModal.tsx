
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { freelacerOtpService } from "../../../service/freelancer/authService";
// import type { IOtp } from "../../../types/auth/IOtp";

type OtpModalProps = {
  handleSubmitOtp: (otp: string) => void;
  handleSubmitResendOtp: () => void
};
const OtpModal = ({ handleSubmitOtp, handleSubmitResendOtp }: OtpModalProps) => {

  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)

  // countdown logic
  useEffect(() => {
    if (timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])



  //   if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-[#F5F7FA] flex justify-center items-center z-50">
      <div className="bg-white text-[#1A1A1A] rounded-2xl p-8 w-[90%] max-w-md shadow-lg">

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-2 text-[#1A1A1A]">
          Verify Your Email
        </h2>

        <p className="text-center text-[#6B7280] mb-6">
          We've sent a 6-digit code to your email address.
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          className="w-full h-14 text-center text-xl rounded-md border border-[#DDE3EA] focus:outline-green focus:ring-1 focus:ring-[#00A86B]"
          placeholder="Enter 6-digit OTP"
        />

        {otp.length !== 6 && (
          <p className="text-center text-[14px] text-red-500 mt-2">
            Please enter all 6 digits
          </p>
        )}

        <button
          onClick={() => handleSubmitOtp(otp)}
          className="w-full mt-6 bg-[#00A86B] hover:bg-[#008F5C] text-white py-3 rounded-md font-medium transition disabled:opacity-60"
          disabled={otp.length !== 6}
        >
          Verify & Continue
        </button>

        {/* <button onClick={handleSubmitResendOtp}>
          <p className="text-center mt-4 pl-37 text-[#00A86B] hover:underline cursor-pointer">
            Resend OTP
          </p>
        </button> */}
        {/* Countdown / Resend OTP */}
        <div className="text-center mt-4">
          {timeLeft > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <span className="font-medium">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={() => {
                handleSubmitResendOtp()
                setTimeLeft(60)
              }}
              className="text-[#00A86B] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>




      </div>
    </div>
  )
}

export default OtpModal
