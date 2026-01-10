export interface Client {
    
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    role:string
    profileImage?: string;
    isBlocked?: boolean;
    isSubscribed?: boolean;
    googleId?: string
    createdAt?: Date
}