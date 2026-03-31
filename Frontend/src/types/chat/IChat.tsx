export interface IChatUser {
    _id: string;
    name: string;
    email:string
}

export interface IChat {
    _id: string;
    clientId: IChatUser | string;
    freelancerId: IChatUser | string;
    lastMessage: string;
    lastMessageAt: Date;
}

export interface IMessage {
    _id: string;
    roomId: string;
    senderId: string;
    receiverId: string;
    text: string;
    isRead: boolean;
    createdAt: Date;
}