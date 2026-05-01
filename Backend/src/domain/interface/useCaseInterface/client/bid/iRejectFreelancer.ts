import { IRejectFreelancerInputDtos, IRejectFreelancerOutputDtos } from "../../../DTOs/client/bidDtos";

export interface IRejectFreelancerUsecase{
    reject(input:IRejectFreelancerInputDtos):Promise<IRejectFreelancerOutputDtos>
}