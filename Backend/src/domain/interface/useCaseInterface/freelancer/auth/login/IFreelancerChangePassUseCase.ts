import { FreelancerChangePassInputDtos, FreelancerChangePassOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerChangePassUseCase{
    createNewPass(input:FreelancerChangePassInputDtos):Promise<FreelancerChangePassOutputDtos>
}