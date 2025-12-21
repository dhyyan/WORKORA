import { freelancerAxios } from "../../axios/interceptors";
import type { IOtp } from "../../types/auth/IOtp";
import type { ISignUp } from "../../types/auth/ISignUp";
import type { LoginFormInputs } from "../../types/auth/Tlogin";


//signup
export const freelancerSignUp=async({name,email,phone,password}:ISignUp)=>{
    const respone=await freelancerAxios.post("/freelancer/signup",{
        name,
        email,
        phone,
        password
    })
    return respone.data
}

export const freelacerOtpService=async ({name,email,phone,password,otp}:IOtp)=>{
    const respone=await freelancerAxios.post("/freelancer/verifyotp",{
        name,
        email,
        phone,
        password,
        otp
    })
    return respone.data
}

//login
export const freelancerLogin=async({email,password}:LoginFormInputs)=>{
    try {
        const respone= await freelancerAxios.post("/freelancer/login",{
            email,
            password
        })
        return respone.data
    } catch (error) {
        console.error("error in login",error)
        throw error
    }
}

//forgot pass

export const freelancerforgotpass=async({email}:IOtp)=>{
    const respone=await freelancerAxios.post('/freelancer/forgotpassword',{
        email
    })

    return respone.data
}


// forgot pass

export const freelacerForgotOtpVerify=async({email,otp}:IOtp)=>{
    const respone=await freelancerAxios.post("/freelancer/forgotpassword/verifyotp",{
        email,
        otp
    })
    return respone.data
}


//new password

export const freelecrForgotNewPass=async({email,password}:IOtp)=>{
     
    const respone=await freelancerAxios.post('/freelancer/forgotpassword/newpass',{
        email,
        password
    })
    return respone.data
}


export const freelancerResendOtp=async({email}:IOtp)=>{
    try {
        const response=await freelancerAxios.post("/freelancer/resendotp",{
            email
        })
        return response.data
    } catch (error) {
        console.error("Resend Otp error:", error);
        throw error;
    }
}
