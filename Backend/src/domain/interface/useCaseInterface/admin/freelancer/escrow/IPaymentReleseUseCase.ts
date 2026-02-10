import { IPaymentReleseInputDtos, IPaymentReleseOutputDtos } from "../../../../DTOs/admin/client/escrowDtos";

export interface IPaymentRelesePaymentUseCase{
    relesePayment(input:IPaymentReleseInputDtos):Promise<IPaymentReleseOutputDtos>
}