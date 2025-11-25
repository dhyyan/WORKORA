import { freelancerAxios } from "../../axios/interceptors";
import type { IOtp } from "../../types/auth/IOtp";
import type { ISignUp } from "../../types/auth/ISignUp";

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