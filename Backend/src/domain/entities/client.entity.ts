export interface Client {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role:string
    phone?: string;
    profileImage?: string;
    isBlocked?: boolean;
    isSubscribed?: boolean;
    googleId?: string
    createdAt?: Date
}