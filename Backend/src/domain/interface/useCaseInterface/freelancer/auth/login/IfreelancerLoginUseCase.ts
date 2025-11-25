import { FreelancerLoginInputDtos, FreelancerLoginIOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerLoginUseCase{
    verify(input:FreelancerLoginInputDtos):Promise<FreelancerLoginIOutputDtos>
}