export interface IMilestone {
    _id?: string;
    contractId: string;
    title: string;
    amount: number;
    description?: string,
    taskUrl?: string,
    reason?: string,
    status: "pending" | "funded" | "submited" | "released" | "approved" | "rejected";
}


export interface SubmitMiestone {
    milestoneId: string,
    taskUrl: string,
    description: string,
}
