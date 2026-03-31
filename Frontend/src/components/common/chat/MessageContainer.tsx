import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import socket from '../../../hooks/ConnectSocketIo';
import { clientChatHistoryService } from '../../../service/chat/chatService';

// Import your existing configured socket instance
// import socket from '@/hooks/ConnectSocketIo';

interface IMessage {
    _id?: string;
    roomId: string;
    senderId: string;
    receiverId?: string;
    text: string;
    createdAt?: string | Date;
}

// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../store/store';

const MessageContainer = () => {
    const params = useParams();
    const location = useLocation();

    // const client = useSelector((state: RootState) => state.clientAuth.client);
    // const freelancer = useSelector((state: RootState) => state.freelancerAuth.freelancer);

    const isClientRole = location.pathname.startsWith('/client');
    const currentUserId = isClientRole ? params.clientId! : params.freelancerId!;
    const receiverId = isClientRole ? params.freelancerId! : params.clientId!;

    // Determine if we are a client or freelancer for UI logic
    // const currentUser = isClientRole ? client : freelancer;

    const roomId = params.freelancerId! + params.clientId!;
    console.log("roomid", roomId)


    // Hardcode user IDs for testing until you add your real authentication state
    // const currentUserId = "myUser";
    // const receiverId = "otherUser";

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!roomId) return;

        // --- 1. FETCH OLD HISTORY VIA REST API ---
        const fetchHistory = async () => {
            try {
                const response = await clientChatHistoryService(roomId);
                console.log("Fetched chat history:", response);
                if (response.data) setMessages(response.data.messages);

            } catch (error) {
                console.log("No old history found or endpoint missing", error);
            }
        };
        fetchHistory();

        // --- 2. CONNECT AND JOIN SOCKET ROOM ---
        if (!socket.connected) {
            socket.connect();
        }

        // Emit the 'join_chat' event with the specific contract ID!
        socket.emit("join_chat", roomId);

        // --- 3. LISTEN FOR INCOMING MESSAGES ---
        const handleReceiveMessage = (newMessage: IMessage) => {
            console.log("Received new message via socket!", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on("receive_message", handleReceiveMessage);

        // Cleanup when component unmounts
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [roomId]);

    // --- 4. SEND NEW MESSAGE ---
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessageData: IMessage = {
            roomId: roomId,
            senderId: currentUserId,
            receiverId: receiverId,
            text: message,
            createdAt: new Date().toISOString()
        };

        console.log("newMessageData", newMessageData)
        // Emit to your backend (Fixed typo: send_messaage -> send_message)
        socket.emit("send_message", newMessageData);

        // Instantly add it to our own screen so we don't wait for server reflection
        setMessages((prev) => [...prev, newMessageData]);
        setMessage(''); // Clear input
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Chat Header */}
            <ChatHeader
                user={{
                    _id: receiverId,
                    name: 'Chat Partner', // This should ideally be fetched or passed down
                    avatar: '',
                    isOnline: true,
                    lastSeen: 'Online'
                }}
                showBackButton={true}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-transparent relative min-h-[400px] chat-scrollbar custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg, idx) => {
                        const messageDate = msg.createdAt ? new Date(msg.createdAt) : new Date();

                        return (
                            <div key={idx}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-1`}
                                >
                                    <div
                                        className={`max-w-[85%] lg:max-w-md px-5 py-3 shadow-sm relative ${msg.senderId === currentUserId
                                            ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm'
                                            }`}
                                    >
                                        <p className="text-[15px] leading-relaxed break-words font-medium">{msg.text}</p>
                                        <div className={`flex items-center justify-end mt-1 space-x-1 text-[10.5px] font-semibold tracking-wide ${msg.senderId === currentUserId ? 'text-blue-200' : 'text-gray-400'
                                            }`}>
                                            <span>
                                                {messageDate.toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
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
