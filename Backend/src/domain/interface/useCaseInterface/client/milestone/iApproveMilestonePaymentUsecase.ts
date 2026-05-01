import { IApproveMilestonePaymentInputDtos, IApproveMilestonePaymentOutputDtos } from "../../../DTOs/client/milestoneDtos";

export interface IApproveMilestonePaymentUsecase{
    approvePayment(input:IApproveMilestonePaymentInputDtos):Promise<IApproveMilestonePaymentOutputDtos>
}