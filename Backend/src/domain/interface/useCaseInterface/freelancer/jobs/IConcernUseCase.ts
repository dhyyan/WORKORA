import { IConcerInputDtos, IConcerOutputDtos } from "../../../DTOs/client/JobDto";

export interface IConcernUseCase{
create(input:IConcerInputDtos):Promise<IConcerOutputDtos>
}