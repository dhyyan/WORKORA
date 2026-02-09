import { Types } from "mongoose";

export interface BaseFreelancerOutputDtos {
    _id?: Types.ObjectId,
    name: string,
    email: string,
    phone?: string,
    role:"freelancer",
    gitHubUrl?: string,
    linkedInUrl?: string,
    skills?: string[],
    experience?: string,
    rating?: Number,
    profileImage?: string,
    bio?: string,
    isSubscribed?: boolean,
    isBlocked?: boolean,
    googleId?:string
    createdAt?: Date,
}

//signUP

export interface freelancerSendOtpInputDto {
    email: string
}

export interface freelancerSendOtpOutputDto {
    success: boolean;
    message: string;
}

//verifyOtp

export interface FreelancerVerifyOtpInputDto {
    email: string,
    otp: string
}

export interface FreelancerVerifyOtpOutputDto {
    success: boolean

}

//register

export interface FreelancerRegisterInputDtos {
    name: string,
    email: string,
    phone: string,
    password: string
}

export interface FreelancerRegisterOutputDtos extends BaseFreelancerOutputDtos {
    _id: Types.ObjectId
}


//login

export interface FreelancerLoginInputDtos {
    email: string,
    password: string
}

export interface FreelancerLoginIOutputDtos {
    createdUser: BaseFreelancerOutputDtos,
    accessToken: string,
    refreshToken: string
}   

//resendOtp

export interface FreelancerResendOtpInputDtos{
    email:string
}

export interface FreelancerResendOtpOutputDtos{
    success:boolean
}

//frogot password
export interface FreelancerForgotPassInputDtos{
    email:string
}

export interface FreelancerForgotPassOutputDtos{
   success: boolean;
}

//forgot Pass otp check

export interface FreelancerForgotPassOtpInputDtos{
    email:string,
    otp:string
}

export interface FreelancerForgotPassOtpOutputDtos{
   success: boolean;
}

//changePass

export interface FreelancerChangePassInputDtos{
    email:string,
    password:string
}

export interface FreelancerChangePassOutputDtos extends BaseFreelancerOutputDtos{
   _id:Types.ObjectId
}


