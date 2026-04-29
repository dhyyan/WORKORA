import { ISubscriptionResponseDTO } from "../../../domain/interface/DTOs/admin/ISubscriptionResponseDTO";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { IWalletRepository } from "../../../domain/interface/repositoryInterface/IWalletRepository";
import { IGetSubscriptionRevenueUseCase } from "../../../domain/interface/useCaseInterface/admin/subscription/IGetSubscriptionRevenueUseCase";

export class GetSubscriptionRevenueUseCase implements IGetSubscriptionRevenueUseCase {
    constructor(
        private _clientRepository: IClientRepository,
        private _walletRepository: IWalletRepository
    ) {}

    async execute(): Promise<ISubscriptionResponseDTO[]> {
        // 1. Find the admin user
        const admins = await this._clientRepository.findAll({ role: "admin" } as any);
        const admin = admins[0];

        if (!admin || !admin._id) {
            return [];
        }

        // 2. Get admin's wallet
        const wallet = await this._walletRepository.findByUserId(admin._id);

        if (!wallet || !wallet.transactions) {
            return [];
        }

        // 3. Filter transactions related to subscriptions
        // Based on stripeWebHookUseCase.ts, subscription transactions have "Subscription" in the description
        const subscriptionTransactions = wallet.transactions
            .filter(t => t.type === "credit" && t.description?.toLowerCase().includes("subscription"))
            .map(t => ({
                userId: this._extractUserId(t.description || ""),
                role: this._extractRole(t.description || ""),
                amount: t.amount || 0,
                description: t.description || "",
                date: t.createdAt || new Date()
            }));

        return subscriptionTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    private _extractUserId(description: string): string {
        const parts = description.split(": ");
        return parts.length > 1 ? parts[1] : "Unknown";
    }

    private _extractRole(description: string): string {
        if (description.toLowerCase().includes("client")) return "Client";
        if (description.toLowerCase().includes("freelancer")) return "Freelancer";
        return "User";
    }
}
