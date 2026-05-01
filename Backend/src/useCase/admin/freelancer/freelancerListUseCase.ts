import { FreelancerListInputDtos, FreelancerListOutputDtos } from "../../../domain/interface/DTOs/admin/freelancer/freelancerDtos";
import { BaseFreelancerOutputDtos } from "../../../domain/interface/DTOs/freelancer/authDtos";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IFreelancerListUseCase } from "../../../domain/interface/useCaseInterface/admin/freelancer/freelancerListUseCase";

export class FreelancerListUseCase implements IFreelancerListUseCase {

    private _freelancerRepository: IFreelancerRepository
    constructor(freelancerRepository: IFreelancerRepository) {
        this._freelancerRepository = freelancerRepository


    }
    async listFreelancer(input: FreelancerListInputDtos): Promise<FreelancerListOutputDtos> {

        try {
            const {page,limit,search}=input
            console.log("page,limt, search",page,limit,search)

            const users = await this._freelancerRepository.findAllFreelancer(page,limit,search)
            if (!users) throw new Error("fetch users error in useCase")
                console.log("fetched freelancer datas in usecase",users)

            const freelancers: BaseFreelancerOutputDtos[] = users.freelancer.map((user) => ({
                _id: user._id!,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: "freelancer",
                gitHubUrl: user.gitHubUrl,
                linkedInUrl: user.linkedInUrl,
                skills: user.skills,
                experience: user.experience??"",
                rating: user.rating,
                profileImage: user.profileImage,
                bio: user.bio,
                isSubscribed: user.isSubscribed,
                isBlocked: user.isBlocked,
                googleId: user.googleId,
                createdAt: user.createdAt,
            }));

            return { freelancers,totalFreelancer:users.totalFreelancer };
        } catch (error) {
            console.error("error in freelancer list useCase", error);
            throw error;
        }
    }
}