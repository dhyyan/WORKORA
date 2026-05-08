import  { Schema } from "";
import { IChat } from "../../../domain/entities/chat.entity";

export const chatSchema= new Schema<IChat>({
    clientId:{
        type:Schema.Types.ObjectId,
        ref:'Client',
        required:true
    },
    freelancerId:{
        type:Schema.Types.ObjectId,
        ref:'Freelancer',
        required:true
    },
    lastMessage:{
        type:String,
        required:true
    },
    lastMessageAt:{
        type:Date,
        required:true
    }
}, { timestamps: true })