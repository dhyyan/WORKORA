import { freelancerSendOtpInputDto, freelancerSendOtpOutputDto } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerSentOtpUseCase{
    createOtp(input:freelancerSendOtpInputDto):Promise<freelancerSendOtpOutputDto>
}