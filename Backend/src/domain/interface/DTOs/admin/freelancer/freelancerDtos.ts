import { BaseFreelancerOutputDtos } from "../../freelancer/authDtos";

export interface FreelancerListInputDtos {
    page: number,
    limit: number,
    search: string
}

export interface FreelancerListOutputDtos {
    freelancers: BaseFreelancerOutputDtos[]
    totalFreelancer: number
}