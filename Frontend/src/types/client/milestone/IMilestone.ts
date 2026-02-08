export interface IMilestone {
    _id?: string;
    contractId: string;
    title: string;
    amount: number;
    status: "pending" | "funded" | "submited" | "released" | "approved";
}
