import { BaseFreelancerOutputDtos } from "./authDtos"

export interface UpdateProfileInputDtos{
    name:string
    email:string,
    phone:string,
    bio:string,
    experience:string,
    skill:string[],
    profileImage:string
}

export interface UpdateProfileOututDtos{
    updatedFreelancer:BaseFreelancerOutputDtos,
    success:boolean
}

