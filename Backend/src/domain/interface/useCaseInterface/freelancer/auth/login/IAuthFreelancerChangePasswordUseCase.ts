import { AuthFreelancerChangePassInputDto, FreelancerChangePassOutputDtos } from "../../../../DTOs/freelancer/authDtos";

export interface IAuthFreelancerChangePasswordUseCase {
    changePassword(input: AuthFreelancerChangePassInputDto): Promise<FreelancerChangePassOutputDtos | null>;
}
