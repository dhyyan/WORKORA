import { FreelancerVerifyOtpInputDto, FreelancerVerifyOtpOutputDto } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IFreelancerVerifyOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerVerifyOtpUseCase";

export class FreelancerVerifyOtpUseCase implements IFreelancerVerifyOtpUseCase{
    private _freelancerRepository:IFreelancerRepository
    private _clientRepository:IClientRepository
    private _optService:IOtpService

    constructor(freelancerRepository:IFreelancerRepository,clientRepository:IClientRepository,optService:IOtpService){
        this._freelancerRepository=freelancerRepository
        this._clientRepository=clientRepository
        this._optService=optService
    }
    async verifyOtp(input: FreelancerVerifyOtpInputDto): Promise<FreelancerVerifyOtpOutputDto> {
        const {email,otp}=input
        console.log("email and otp from otp useCase",email,otp)

        const clientExist=await this._clientRepository.findByEmail(email)
        const freelancerExist=await this._freelancerRepository.findByEmail(email)
        if(clientExist||freelancerExist)throw new Error("user in this email already exist")

            const verifyedOtp=await this._optService.verifyOtp(email,otp)
            if(!verifyedOtp)throw new Error("Invalid Otp try angain later")

            return{
                success:true
            }

    }
}