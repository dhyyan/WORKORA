import { FreelancerListInputDtos, FreelancerListOutputDtos } from "../../../DTOs/admin/freelancer/freelancerDtos";

export interface IFreelancerListUseCase{
    listFreelancer(input:FreelancerListInputDtos):Promise<FreelancerListOutputDtos>
}