import { ISubscriptionResponseDTO } from "../../../DTOs/admin/ISubscriptionResponseDTO";

export interface IGetSubscriptionRevenueUseCase {
    execute(): Promise<ISubscriptionResponseDTO[]>;
}
