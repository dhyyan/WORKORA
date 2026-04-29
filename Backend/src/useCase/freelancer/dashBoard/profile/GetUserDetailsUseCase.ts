import { BaseFreelancerOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { GetUserDetailsInputDtos, GetUserDetailOutputDtos } from "../../../../domain/interface/DTOs/freelancer/ProfileDtos";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IGetUserUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/dashboard/Profile/IGetProfileUseCase";

export class GetUserUseCase implements IGetUserUseCase {
    private _freelancerRepository: IFreelancerRepository
    constructor(freelancerRepository: IFreelancerRepository) {
        this._freelancerRepository = freelancerRepository
    }
    async getUser(input: GetUserDetailsInputDtos): Promise<GetUserDetailOutputDtos> {
        const { userId } = input
        console.log(typeof (userId), "hahahaha")
        console.log("user id in use case", input.userId)
        try {
            const user = await this._freelancerRepository.findById(userId)
            console.log("fetch user data in usecase", user)
            if (!user) throw new Error("user not found")
            console.log("fetch user data in usecase", user)

            const userDetails: BaseFreelancerOutputDtos = {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: "freelancer",
                gitHubUrl: user.gitHubUrl,
                linkedInUrl: user.linkedInUrl,
                skills: user.skills,
                experience: user.experience ?? "",
                profileImage: user.profileImage,
                bio: user.bio,
                rating: user.rating,
                isSubscribed: user.isSubscribed,
                isBlocked: user.isBlocked,
                googleId: user.googleId,
            }
            return {
                userDetails
            }
        } catch (error) {
            console.error("GetUserUseCase error:", error);
            throw error;
        }
    }
}