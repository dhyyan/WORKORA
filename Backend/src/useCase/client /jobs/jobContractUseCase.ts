import { BaseContractOutPutDtos } from "../../../domain/interface/DTOs/client/bidDtos";
import { JobContractInputDtos, JobContractOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { BaseFreelancerOutputDtos } from "../../../domain/interface/DTOs/freelancer/authDtos";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IJobContractUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/iJobContractUseCase";

export class JobContractUseCase implements IJobContractUseCase{
    private _contractRepository: IContractRepository;
    private _freelancerRepository: IFreelancerRepository;
    constructor(contractRepository: IContractRepository,freelancerRepository: IFreelancerRepository){
        this._contractRepository = contractRepository
        this._freelancerRepository = freelancerRepository
    }
    async contractDetails(input: JobContractInputDtos): Promise<JobContractOutPutDtos> {
        try {
            const {id}=input
            console.log("id in useace con",id)

            const ifContract=await this._contractRepository.findContractByJobId(id)

            if(!ifContract||!ifContract._id)throw new Error("contract not found")
                if(!ifContract.freelancerId)throw new Error("freelancer id is missing")

                const ifFreelancer=await this._freelancerRepository.findById(ifContract.freelancerId)

            console.log(" freelancer and contract",ifFreelancer)
            console.log("if contracteeey",ifContract)

            const contract:BaseContractOutPutDtos={
                _id:ifContract._id.toString(),
                jobId:ifContract.jobId,
                freelancerId:ifContract.freelancerId,
                totalAmount:ifContract.totalAmount,
                status:"active"
            }
            if(!ifFreelancer||!ifFreelancer._id)throw new Error("freelancer not found")
                const freelancer:BaseFreelancerOutputDtos={
            _id:ifFreelancer?._id.toString(),
                name:ifFreelancer?.name || "",
                email:ifFreelancer?.email || "",
                role:"freelancer",
                skills:ifFreelancer?.skills || [],
                profileImage:ifFreelancer?.profileImage         
            }
            return {contract,freelancer}

        } catch (error) {
            throw error
        }
    }
}