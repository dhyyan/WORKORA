import { FreelancerRegisterInputDtos, FreelancerRegisterOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerRegisterUseCase{
    create(input:FreelancerRegisterInputDtos):Promise<FreelancerRegisterOutputDtos>
}