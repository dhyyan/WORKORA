import { Types } from "mongoose"

export interface Freelancer {
    _id?: Types.ObjectId,
    name: string,
    email: string,
    phone?: string
    password?: string,
    role: "freelancer"
    gitHubUrl?: string,
    linkedInUrl?: string,
    skills?: string[],
    experience?: string,
    rating?: number,
    profileImage?: string,
    bio?: string,
    isSubscribed?: boolean,
    freeApplicationsCount: number,
    stripeSubscriptionId?: string,
    subscriptionExpiryDate?: Date,
    isBlocked?: boolean,
    googleId?: string,
    createdAt?: Date,
}