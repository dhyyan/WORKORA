import { AuthFreelancerChangePassInputDto, FreelancerChangePassOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IAuthFreelancerChangePasswordUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IAuthFreelancerChangePasswordUseCase";
import { Types } from "mongoose";

export class AuthFreelancerChangePasswordUseCase implements IAuthFreelancerChangePasswordUseCase {
    private _freelancerRepo: IFreelancerRepository;
    private _hashPassword: IHashPassword;

    constructor(freelancerRepo: IFreelancerRepository, hashPassword: IHashPassword) {
        this._freelancerRepo = freelancerRepo;
        this._hashPassword = hashPassword;
    }

    async changePassword(input: AuthFreelancerChangePassInputDto): Promise<FreelancerChangePassOutputDtos | null> {
        const { userId, oldPassword, newPassword } = input;

        if (!userId || !oldPassword || !newPassword) {
            throw new Error("Missing required fields");
        }

        const freelancer = await this._freelancerRepo.findById(new Types.ObjectId(userId as string));
        if (!freelancer || !freelancer.password) {
            throw new Error("Freelancer not found or password not set");
        }

        // Compare old password
        const isMatch = await this._hashPassword.comparePassword(oldPassword, freelancer.password);

        if (!isMatch) {

            throw new Error("Incorrect current password");
        }

        // Hash new password
        const hashedPassword = await this._hashPassword.hashPassword(newPassword);
        
        // Update password
        const updatedFreelancer = await this._freelancerRepo.changePassword(freelancer._id, hashedPassword);
        
        if (!updatedFreelancer) {
            throw new Error("Failed to update password");
        }

        return {
            _id: updatedFreelancer._id!,
            name: updatedFreelancer.name,
            email: updatedFreelancer.email,
            phone: updatedFreelancer.phone,
            role: "freelancer",
            isSubscribed: updatedFreelancer.isSubscribed,
            isBlocked: updatedFreelancer.isBlocked,
            googleId: updatedFreelancer.googleId,
            // Add other fields as necessary from BaseFreelancerOutputDtos
        };
    }
}
