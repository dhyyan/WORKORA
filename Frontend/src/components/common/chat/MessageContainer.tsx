import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import socket from '../../../hooks/ConnectSocketIo';
import { clientChatHistoryService, clientChatService } from '../../../service/chat/chatService';
import { Check, CheckCheck } from 'lucide-react';
import type { IChat } from '../../../types/chat/IChat';

interface IMessage {
    _id?: string;
    roomId: string;
    senderId: string;
    receiverId?: string;
    text: string;
    isRead?: boolean;
    createdAt?: string | Date;
}

const MessageContainer = () => {
    const params = useParams();
    const location = useLocation();

    const isClientRole = location.pathname.startsWith('/client');
    const currentUserId = isClientRole ? params.clientId! : params.freelancerId!;
    const receiverId = isClientRole ? params.freelancerId! : params.clientId!;

    const roomId = params.freelancerId! + params.clientId!;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [recipientInfo, setRecipientInfo] = useState<{ name: string; profileImage?: string; avatar?: string } | null>(location.state?.otherUser || null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Fetch recipient info if not in state
    useEffect(() => {
        const fetchRecipientInfo = async () => {
            if (recipientInfo?.profileImage) return; 
            try {
                const response = await clientChatService(currentUserId);
                const chats = response?.data?.users;
                if (chats) {
                    const currentChat = chats.find((chat: IChat) => {
                        const cid = typeof chat.clientId === 'object' ? chat.clientId._id : chat.clientId;
                        const fid = typeof chat.freelancerId === 'object' ? chat.freelancerId._id : chat.freelancerId;
                        return cid === params.clientId && fid === params.freelancerId;
                    });

                    if (currentChat) {
                        const isClient = (typeof currentChat.clientId === 'object' ? currentChat.clientId._id : currentChat.clientId) === currentUserId;
                        const otherUser = isClient ? currentChat.freelancerId : currentChat.clientId;
                        setRecipientInfo(otherUser);
                    }
                }
            } catch (error) {
                console.error("Error fetching recipient info:", error);
            }
        };

        fetchRecipientInfo();
    }, [currentUserId, params.clientId, params.freelancerId, recipientInfo?.profileImage]);

    useEffect(() => {
        if (!roomId) return;

        // --- 1. FETCH OLD HISTORY ---
        const fetchHistory = async () => {
            try {
                const response = await clientChatHistoryService(roomId);
                if (response.data) {
                    setMessages(response.data.messages);
                    // After fetching history, mark as read if needed
                    socket.emit("mark_as_read", { roomId, userId: currentUserId });
                }
            } catch (error) {
                console.log("No old history found", error);
            }
        };
        fetchHistory();

        // --- 2. SOCKET SETUP ---
        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("join_chat", roomId);

        // --- 3. LISTENERS ---
        const handleReceiveMessage = (newMessage: IMessage) => {
            setMessages((prev) => {
                // If we are the sender, replace the temp local message with the official one from DB
                const isDuplicate = prev.some(m => 
                    m._id === newMessage._id || 
                    (m.senderId === newMessage.senderId && m.text === newMessage.text && !m._id)
                );
                
                if (isDuplicate) {
                    return prev.map(m => 
                        (m.senderId === newMessage.senderId && m.text === newMessage.text && !m._id) 
                        ? newMessage 
                        : m
                    );
                }
                return [...prev, newMessage];
            });

            // If we are active in this room and received a message from others, mark it as read
            if (newMessage.senderId !== currentUserId) {
                socket.emit("mark_as_read", { roomId, userId: currentUserId });
            }
        };

        const handleMessagesRead = ({ roomId: readRoomId, userId: readUserId }: { roomId: string, userId: string }) => {
            if (readRoomId === roomId && readUserId === receiverId) {
                // The other user read our messages
                setMessages((prev) => 
                    prev.map(msg => msg.senderId === currentUserId ? { ...msg, isRead: true } : msg)
                );
            }
        };

        socket.on("receive_message", handleReceiveMessage);
        socket.on("messages_read", handleMessagesRead);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.off("messages_read", handleMessagesRead);
        };
    }, [roomId, currentUserId, receiverId]);

    // --- 4. SEND NEW MESSAGE ---
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessageData: IMessage = {
            roomId: roomId,
            senderId: currentUserId,
            receiverId: receiverId,
            text: message,
            isRead: false,
            createdAt: new Date().toISOString()
        };

        // Add locally for instant feedback (without _id)
        setMessages((prev) => [...prev, newMessageData]);
        socket.emit("send_message", newMessageData);
        setMessage(''); 
    };

    return (
        <div className="flex flex-col h-full bg-gray-50/50">
            {/* Chat Header */}
            <ChatHeader
                user={{
                    _id: receiverId,
                    name: recipientInfo?.name || 'Chat Partner',
                    avatar: (recipientInfo as { profileImage?: string; avatar?: string })?.profileImage || recipientInfo?.avatar || '',
                    isOnline: true,
                    lastSeen: 'Online'
                }}
                showBackButton={true}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-transparent relative chat-scrollbar custom-scrollbar">
                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => {
                        const isMine = msg.senderId === currentUserId;
                        const messageDate = msg.createdAt ? new Date(msg.createdAt) : new Date();

                        return (
                            <motion.div
                                key={msg._id || idx}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${isMine ? 'justify-end' : 'justify-start'} group items-end space-x-2`}
                            >
                                {!isMine && (
                                    <div className="w-8 h-8 rounded-full flex-shrink-0 mb-1 ring-2 ring-white shadow-sm overflow-hidden bg-emerald-100 flex items-center justify-center border border-emerald-200">
                                        {(recipientInfo as { profileImage?: string })?.profileImage ? (
                                            <img src={(recipientInfo as { profileImage?: string }).profileImage} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] font-bold text-emerald-700 uppercase">
                                                {recipientInfo?.name?.charAt(0) || '?'}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div
                                    className={`max-w-[70%] md:max-w-[55%] px-4 py-2.5 shadow-sm relative transition-all duration-300 ${
                                        isMine
                                            ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm group-hover:shadow-md'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm group-hover:shadow-md'
                                    }`}
                                >
                                    <p className="text-[14.5px] leading-relaxed break-words font-medium">{msg.text}</p>
                                    <div className={`flex items-center justify-end mt-1 space-x-1.5 text-[10px] font-bold tracking-tight ${
                                        isMine ? 'text-blue-100/80' : 'text-gray-400'
                                    }`}>
                                        <span>
                                            {messageDate.toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                        {isMine && (
                                            <span className="flex items-center">
                                                {msg.isRead ? (
                                                    <CheckCheck className="w-4 h-4 text-emerald-300 animate-in fade-in zoom-in duration-500 fill-emerald-300/10" />
                                                ) : (
                                                    <Check className="w-3.5 h-3.5 opacity-60" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput
                message={message}
                setMessage={setMessage}
                onSendMessage={handleSendMessage}
                inputRef={inputRef}
            />
        </div>
    );
};

export default MessageContainer;
