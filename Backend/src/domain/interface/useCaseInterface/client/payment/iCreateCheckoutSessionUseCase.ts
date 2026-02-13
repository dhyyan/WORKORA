import { createCheckoutInputDtos } from "../../../DTOs/client/escrowDtos";

export interface ICreateCheckoutSessionUseCase {
    execute(input: createCheckoutInputDtos): Promise<null | string>
}