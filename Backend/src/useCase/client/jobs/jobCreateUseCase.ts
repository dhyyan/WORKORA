import { JobCreateInputDtos, JobCreateOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { IJobCreateUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/jobCreateUseCase";

export class JobCreateUseCase implements IJobCreateUseCase {
    private _jobRepository: IJobRepository
    private _clientRepository: IClientRepository
    constructor(jobRepository: IJobRepository, clientRepository: IClientRepository) {
        this._jobRepository = jobRepository
        this._clientRepository = clientRepository
    }
    async create(input: JobCreateInputDtos): Promise<JobCreateOutPutDtos> {
        console.log("job data in usecase", input)

            const client = await this._clientRepository.findById(input.clientId);
            if (!client) throw new Error("Client not found");

            if (!client.isSubscribed && (client.freeJobsCount ?? 0) >= 5) {
                throw new Error("Free job post limit reached. Please subscribe to post more jobs.");
            }

            const job = await this._jobRepository.create({ ...input, status: "open" })
            console.log("create job in use case", job)

            if (!job) throw new Error("Error while creating job in useCase")

            // Increment free count if not subscribed
            if (!client.isSubscribed) {
                await this._clientRepository.update(input.clientId, {
                    freeJobsCount: (client.freeJobsCount ?? 0) + 1
                });
            }

            return {
                job,
                success: true
            }
    }
}