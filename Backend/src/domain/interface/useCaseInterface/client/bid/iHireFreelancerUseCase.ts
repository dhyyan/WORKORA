import { HireFreelancerInputDtos, HireFreelancerOutputDtos } from "../../../DTOs/client/bidDtos";

export interface IHireFreelancerUseCase{
    hireFreelancer(input:HireFreelancerInputDtos):Promise<HireFreelancerOutputDtos>
}