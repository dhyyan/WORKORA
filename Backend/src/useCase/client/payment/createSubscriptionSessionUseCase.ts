import { ICreateSubscriptionSessionUseCase, SubscriptionInputDto } from "../../../domain/interface/useCaseInterface/client/payment/iCreateSubscriptionSessionUseCase";
import { StripeService } from "../../../frameWork/service/stripe/stripeService";

export class CreateSubscriptionSessionUseCase implements ICreateSubscriptionSessionUseCase {
    private _stripeService: StripeService

    constructor(stripeService: StripeService) {
        this._stripeService = stripeService
    }

    async execute(input: SubscriptionInputDto): Promise<string | null> {
        const priceId = input.role === "client" 
            ? process.env.STRIPE_CLIENT_PRICE_ID! 
            : process.env.STRIPE_FREELANCER_PRICE_ID!;

        if (!priceId || priceId.includes("placeholder")) {
            throw new Error("Stripe Price ID is not configured. Please check .env file.");
        }

        return await this._stripeService.createSubscriptionSession(
            input.userId.toString(),
            input.role,
            priceId
        );
    }
}
