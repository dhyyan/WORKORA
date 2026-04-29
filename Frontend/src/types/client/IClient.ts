export interface IClient{
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    role:string
    profileImage?: string;
    isBlocked?: boolean;
    isSubscribed?: boolean;
    freeJobsCount?: number;
    subscriptionExpiryDate?: string | Date;
    googleId?: string;
    createdAt?: Date;
}
