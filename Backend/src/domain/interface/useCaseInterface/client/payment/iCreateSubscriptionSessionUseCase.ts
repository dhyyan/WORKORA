import { Types } from "mongoose";

export interface SubscriptionInputDto {
    userId: Types.ObjectId;
    role: "client" | "freelancer";
}

export interface ICreateSubscriptionSessionUseCase {
    execute(input: SubscriptionInputDto): Promise<string | null>;
}
