export interface Freelancer {
    _id?: string,
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
    isBlocked?: boolean,
    googleId?: string,
    createdAt?: Date,
}