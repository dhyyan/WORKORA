

import { clientAxios } from "../../axios/interceptors";
import type { IOtp } from "../../types/auth/IOtp";
import type { ISignUp } from "../../types/auth/ISignUp";
import type { LoginFormInputs } from "../../types/auth/Tlogin";


//login service
export const clientLoginService = async ({ email, password }: LoginFormInputs) => {
    try {
        const response = await clientAxios.post('/client/login', {
            email,
            password
        });

        console.log("Login response:", response.data);
        return response?.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};



//signUp service
export const clientSignUpService = async ({ name, email, phone, password }: ISignUp) => {
    console.log("service signup ", name, email, phone, password)
    try {
        console.log("olaa olaa olaaa")
        const response = await clientAxios.post("/client/signup", {
            name,
            email,
            phone,
            password
        })

        return response?.data
    } catch (error) {
        console.error("signUp error:", error);
        throw error;
    }
}


//otp service
export const clientOtpService = async ({ name, email, phone, password, otp }: IOtp) => {
    try {
        const response = await clientAxios.post('/client/verifyotp', {
            name,
            email,
            phone,
            password,
            otp
        })
        console.log("otp service response", response.data)
        return response.data

    } catch (error) {
        console.error("OTP error:", error);
        throw error;
    }
}


//forgot password
export const clientForgotPass = async ({ email }: IOtp) => {
    try {
        const response = await clientAxios.post("/client/forgotpassword", {
            email
        })
        return response.data

    } catch (error) {
        console.error("forgot Password error:", error);
        throw error;
    }

}

export const clientForgotPassOtpVerify = async ({ email, otp }: IOtp) => {

    try {
        const response = await clientAxios.post("/client/forgotpassword/verifyotp", {
            email,
            otp
        })

        return response.data
    } catch (error) {
        console.error("forgot Password Verify Otp error:", error);
        throw error;
    }

}

export const clientNewPassword = async ({ email, password }: IOtp) => {
    try {
        const response = await clientAxios.post("/client/forgotpassword/newpass", {
            email,
            password
        })
        return response.data
    } catch (error) {
        console.error("forgot Password Verify Otp error:", error);
        throw error;
    }
}

export const clientResendOtp = async ({ email }: IOtp) => {
    try {
        const response = await clientAxios.post("/client/resendotp", {
            email
        })
        return response.data

    } catch (error) {
        console.error("resend password error:", error);
        throw error;
    }
}

export const updateProfile = async ({ name, email, phone, profileImage }: IOtp) => {
    console.log("service data of update profile", name, email, phone)
    try {
        const response = await clientAxios.post("/client/updateprofile", {
            name,
            email,
            phone,
            profileImage
        })
        console.log("response of update profile", response.data)
        return response.data
    } catch (error) {
        console.error("update profile error:", error);
        throw error;
    }
}

//google Auth

export const clientGoogleAuth=async({token}:any)=>{
    try {
        console.log("google token",token)
        const response=await clientAxios.post("/client/google",{
            token
        })
        return response.data
    } catch (error) {
        console.error("error in google auth", error);
        throw error;
    }
}