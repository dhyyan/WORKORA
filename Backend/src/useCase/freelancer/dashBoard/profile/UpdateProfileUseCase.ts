import { BaseFreelancerOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { UpdateProfileInputDtos, UpdateProfileOututDtos } from "../../../../domain/interface/DTOs/freelancer/ProfileDtos";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IUpdateProfileUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/dashboard/Profile/IUpdateProfileUseCase";

export class UpdateProfileUseCase implements IUpdateProfileUseCase {
    private _freelancerRepository: IFreelancerRepository
    constructor(freelancerRepository: IFreelancerRepository) {
        this._freelancerRepository = freelancerRepository
    }
    async update(input: UpdateProfileInputDtos): Promise<UpdateProfileOututDtos> {
        console.log("update Profile usecase data", input)
        // const {name,email,phone,bio,experience,skill}=input

        try {

            const exist = await this._freelancerRepository.findByEmail(input.email)
            if (!exist) throw new Error("user in this email not existed")
            const { name, phone, bio, experience, skills, gitHubUrl, linkedInUrl, profileImage } = input
            const update = await this._freelancerRepository.update(exist._id!, {
                name,
                phone,
                bio,
                experience,
                skills,
                gitHubUrl,
                linkedInUrl,
                profileImage
            })

            if (!update) throw new Error("error while updating profile")
            const updatedFreelancer: BaseFreelancerOutputDtos = {
                _id: update?._id,
                name: update.name, 
                email: update.email,
                phone: update.phone,
                role: "freelancer",
                gitHubUrl: update.gitHubUrl,
                linkedInUrl: update.linkedInUrl,
                skills: update.skills,
                experience: update.experience || '',
                rating: update.rating,
                profileImage: update.profileImage,
                bio: update.bio,
                isSubscribed: update.isSubscribed,
                subscriptionExpiryDate: update.subscriptionExpiryDate,
                isBlocked: update.isBlocked,
                googleId: update.googleId,
            }
            console.log("completed full data",updatedFreelancer)

            return {
                updatedFreelancer,
                success: true
            }

        } catch (error) {
            throw error
        }
    }
}