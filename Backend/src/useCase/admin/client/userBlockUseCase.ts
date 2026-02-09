import e from "cors";
import { BlockUserInputDtos, BlockUserOutputDtos } from "../../../domain/interface/DTOs/admin/client/clientDtos";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IBlockUserUSeCase } from "../../../domain/interface/useCaseInterface/admin/client/blockUserUseCase";

export class UserBlockUseCase implements IBlockUserUSeCase {
    private _clientRepository: IClientRepository
    private _freelancerRepository: IFreelancerRepository
    constructor(clientRepository: IClientRepository, freelancerRepository: IFreelancerRepository) {
        this._clientRepository = clientRepository
        this._freelancerRepository = freelancerRepository
    }
    async block(input: BlockUserInputDtos): Promise<BlockUserOutputDtos> {
        try {
            if (input.isBlocked==true) {
                 
                 const client = await this._clientRepository.findById(input.id);
                console.log("clienttt",client)
    
                if (client) {
                    if (!client._id) throw new Error("Client id is missing");
    
                    const blockedClient =await this._clientRepository.updateProfile(client._id, {isBlocked: false,});
    
                    return {
                        success: true,
                        // data: blockedClient,
                    };
                }

    
                const freelancer = await this._freelancerRepository.findById(input.id);
    
                if (freelancer) {
                    if (!freelancer._id) throw new Error("Freelancer id is missing");
    
                    const blockedFreelancer =
                        await this._freelancerRepository.updateProfile(freelancer._id, {
                            isBlocked: false,
                        });
    
                    return {
                        success: true,
                        // data: blockedFreelancer,
                    };
                }
                if(!client&&!freelancer)throw new Error("user in this id not found")
               
            } else {
                console.log("else worr")
                 const client = await this._clientRepository.findById(input.id);
                 
                 
                 if (client) {
                     if (!client._id) throw new Error("Client id is missing");
                     
                     const blockedClient =await this._clientRepository.updateProfile(client._id, {
                         isBlocked: true,
                        });
                        // console.log("blocked",blockedClient)
                        console.log("blocked")
                        // console.log("clienttt", client)
                        return {
                        success: true,
                        // data: blockedClient,
                    };
                }

                const freelancer = await this._freelancerRepository.findById(input.id);

                if (freelancer) {
                    if (!freelancer._id) throw new Error("Freelancer id is missing");

                    const blockedFreelancer =
                        await this._freelancerRepository.updateProfile(freelancer._id, {
                            isBlocked: true,
                        });

                    return {
                        success: true,
                        // data: blockedFreelancer,
                    };
                }
                if (!client && !freelancer) throw new Error("user in this id not found")

            }
            throw new Error("User not found");
        } catch (error) {
            throw error;
        }
    }
}