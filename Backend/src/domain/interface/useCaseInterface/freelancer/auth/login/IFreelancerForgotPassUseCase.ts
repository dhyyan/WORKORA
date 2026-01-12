import { FreelancerForgotPassInputDtos, FreelancerForgotPassOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IFreelancerForgotPassUseCase{
    excute(input:FreelancerForgotPassInputDtos):Promise<FreelancerForgotPassOutputDtos>
}