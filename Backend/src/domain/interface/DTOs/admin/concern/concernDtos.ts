export interface BaseConcernOutputDto {
    id: string,
    contractId: string,
    description: string,
    amount: number,
    status: string,
    createdAt: Date
}


export interface ConcernListOutputDto {
    concern: BaseConcernOutputDto[]
}
