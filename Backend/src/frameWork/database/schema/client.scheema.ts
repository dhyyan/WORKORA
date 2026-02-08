import { Schema } from "mongoose"
import { Client } from "../../../domain/entities/client.entity"


export const clientSchem = new Schema<Client>({
    // _id:{ type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phone: { type: String, required: false },
    profileImage: { type: String, required: false },
    role: { type: String, required: false },
    isBlocked: { type: Boolean, required: false },
    isSubscribed: { type: Boolean, required: false },
    googleId: { type: String, required: false },
}, { timestamps: true }) 