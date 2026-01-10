import { BaseFreelancerOutputDtos } from "./authDtos"

export interface UpdateProfileInputDtos{
    name:string
    email:string,
    phone:string,
    bio:string,
    experience:string,
    skills:string[],
    gitHubUrl:string,
    linkedInUrl:string,
    profileImage:string
}

export interface UpdateProfileOututDtos{
    updatedFreelancer:BaseFreelancerOutputDtos,
    success:boolean
}


//get user details

export interface GetUserDetailsInputDtos{
    userId:string
}

export interface GetUserDetailOutputDtos{
    userDetails:BaseFreelancerOutputDtos
}
