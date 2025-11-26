import { FreelancerForgotPassOtpInputDtos, FreelancerForgotPassOtpOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerForgotPassOtpUseCase{
    check(input:FreelancerForgotPassOtpInputDtos):Promise<FreelancerForgotPassOtpOutputDtos>
}