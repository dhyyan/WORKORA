import { GoogeleAuthInputDtos, GoogeleAuthOutPutDtos } from "../../../../DTOs/client/AuthDto";

export interface IGoogleAuthUseCase{
    googleSign(input:GoogeleAuthInputDtos):Promise<GoogeleAuthOutPutDtos>
}