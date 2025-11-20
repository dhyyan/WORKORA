import { ForgotOtpPasswordInputDto, ForgotOtpPasswordOutPutDto } from "../../../../DTOs/client/AuthDto";

export interface IForgotOtpPasswordUseCase{
    valid(input:ForgotOtpPasswordInputDto):Promise<ForgotOtpPasswordOutPutDto>
}