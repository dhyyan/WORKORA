import { AuthChangePasswordInputDto, ChangePasswordOutPutDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IAuthChangePasswordUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/password/IAuthChangePasswordUseCase";
import { Types } from "mongoose";

export class AuthChangePasswordUseCase implements IAuthChangePasswordUseCase {
    private _clientRepo: IClientRepository;
    private _hashPassword: IHashPassword;

    constructor(clientRepo: IClientRepository, hashPassword: IHashPassword) {
        this._clientRepo = clientRepo;
        this._hashPassword = hashPassword;
    }

    async changePassword(input: AuthChangePasswordInputDto): Promise<ChangePasswordOutPutDtos | null> {
        const { userId, oldPassword, newPassword } = input;

        if (!userId || !oldPassword || !newPassword) {
            throw new Error("Missing required fields");
        }

        const client = await this._clientRepo.findById(new Types.ObjectId(userId as string));
        if (!client || !client.password) {
            throw new Error("Client not found or password not set");
        }

        // Compare old password
        const isMatch = await this._hashPassword.comparePassword(oldPassword, client.password);

        if (!isMatch) {

            throw new Error("Incorrect current password");
        }

        // Hash new password
        const hashedPassword = await this._hashPassword.hashPassword(newPassword);
        
        // Update password
        const updatedClient = await this._clientRepo.changePassword(client._id, hashedPassword);
        
        if (!updatedClient) {
            throw new Error("Failed to update password");
        }

        return {
            _id: updatedClient._id!,
            name: updatedClient.name,
            email: updatedClient.email,
            phone: updatedClient.phone,
            role: "client",
            isSubscribed: updatedClient.isSubscribed,
            isBlocked: updatedClient.isBlocked,
            googleId: updatedClient.googleId,
            createdAt: updatedClient.createdAt
        };
    }
}
