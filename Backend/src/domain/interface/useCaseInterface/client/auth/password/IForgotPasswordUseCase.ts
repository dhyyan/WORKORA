import { ForgotPasswordInputDto, ForgotpasswordOutPutDto } from "../../../../DTOs/client/AuthDto";

export interface IForgotPasswordUseCase {
    excute(input: ForgotPasswordInputDto): Promise<ForgotpasswordOutPutDto>
}