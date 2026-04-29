import { Schema } from "mongoose";
import { Freelancer } from "../../../domain/entities/freelancerntity";

export const freelancerSceema = new Schema<Freelancer>({
    //  _id:{ type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: false },
    gitHubUrl: { type: String },
    linkedInUrl: { type: String },
    role: { type: String, required: false },
    skills: { type: [String], default: [] },
    experience: { type: String, required: false },
    rating: { type: Number, default: 0 },
    profileImage: { type: String },
    bio: { type: String },
    isSubscribed: { type: Boolean, default: false },
    freeApplicationsCount: { type: Number, default: 0 },
    stripeSubscriptionId: { type: String, required: false },
    subscriptionExpiryDate: { type: Date, required: false },
    isBlocked: { type: Boolean, default: false },
    googleId: { type: String, required: false },
},
    { timestamps: true });
