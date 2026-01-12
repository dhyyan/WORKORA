import { FreelancerVerifyOtpInputDto, FreelancerVerifyOtpOutputDto } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerVerifyOtpUseCase{
    verifyOtp(input:FreelancerVerifyOtpInputDto):Promise<FreelancerVerifyOtpOutputDto>
}