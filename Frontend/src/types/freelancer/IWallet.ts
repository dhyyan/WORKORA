export interface IWalletTransaction {
    _id: string;
    type: "credit" | "debit";
    amount: number;
    description: string;
    createdAt: string;
}

export interface IWallet {
    balance: number;
    transactions: IWalletTransaction[];
    totalTransactions: number;
    totalPages: number;
    currentPage: number;
}
