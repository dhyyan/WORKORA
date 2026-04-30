
import { createCheckoutInputDtos } from "../../../domain/interface/DTOs/client/escrowDtos";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { ICreateCheckoutSessionUseCase } from "../../../domain/interface/useCaseInterface/client/payment/iCreateCheckoutSessionUseCase";
import { StripeService } from "../../../frameWork/service/stripe/stripeService";

export class CreateCheckoutSessionUseCase implements ICreateCheckoutSessionUseCase {
    private _milestoneRepository: IMilestoneRepository
    private _stripeService: StripeService

    constructor(milestoneRepository: IMilestoneRepository, stripeService: StripeService) {
        this._milestoneRepository = milestoneRepository
        this._stripeService = stripeService
    }
    async execute(input: createCheckoutInputDtos): Promise<null | string> {
        console.log("mileston id in createchecout usecase", input.milestoneId)
        const milestone = await this._milestoneRepository.findById(input.milestoneId)
        if (!milestone) throw new Error("milestone in this id not found")

        return await this._stripeService.createChecoutSession(
            milestone._id!,
            milestone.amount,
            input.clientId
        )
    }
}