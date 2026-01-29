import { JobCreateInputDtos, JobCreateOutPutDtos } from "../../../DTOs/client/JobDto";

export interface IJobCreateUseCase{
    create(input:JobCreateInputDtos):Promise<JobCreateOutPutDtos>
}