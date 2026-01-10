import { BaseFreelancerOutputDtos } from "../../freelancer/authDtos";

export interface FreelancerListInputDtos{}

export interface FreelancerListOutputDtos{
    freelancers:BaseFreelancerOutputDtos[]
}