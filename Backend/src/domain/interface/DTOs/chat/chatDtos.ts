import { Types } from "mongoose";

export interface BaseIMessageOutput{
       _id?: Types.ObjectId;
        roomId: string;
        senderId: Types.ObjectId;
        receiverId: Types.ObjectId;
        text: string;
        isRead?: boolean;
        createdAt?: Date;
    }

    export interface BaseIChatOutput{
        _id?: Types.ObjectId;
        clientId: Types.ObjectId;
        freelancerId: Types.ObjectId;
        lastMessage?: string;
        lastMessageAt?: Date;
    }
    export interface IGetMessageInput{
        roomId: string;
    }

    export interface IGetMessageOutput{
        messages:BaseIMessageOutput[]
    }

    export interface IGetChatUsersInput{
        userId: Types.ObjectId;
    }

    export interface IGetChatUsersOutput{
        users:BaseIChatOutput[]
    }

    export interface ISaveMessageInput{
        input:BaseIMessageOutput
    }

    export interface ISaveMessageOutput{
        message:BaseIMessageOutput
    }
