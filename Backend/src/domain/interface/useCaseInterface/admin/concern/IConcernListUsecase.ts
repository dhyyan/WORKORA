import { ConcernListOutputDto } from "../../../DTOs/admin/concern/concernDtos"

export interface IConcernListUsecase{
    list():Promise<ConcernListOutputDto>
    releasePayment(id: string, receiver: 'client' | 'freelancer'): Promise<{success: boolean}>
}