import { FreelancerResendOtpInputDtos, FreelancerResendOtpOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerRresendOtpUseCase{
    generateOtp(input:FreelancerResendOtpInputDtos):Promise<FreelancerResendOtpOutputDtos>
}