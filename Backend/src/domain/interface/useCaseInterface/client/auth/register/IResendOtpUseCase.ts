import { ResendOtpInputDto, ResendOtpOutPutDto } from "../../../../DTOs/client/AuthDto";

export interface IResendOtpUseCase{
    resendOtp(input:ResendOtpInputDto):Promise<ResendOtpOutPutDto>
}