import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { clientChatService } from '../../../service/chat/chatService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { IChat } from '../../../types/chat/IChat';
import { Search, X } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface UserSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
    const [chatUsers, setChatUsers] = useState<IChat[]>([]);
    
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    
    const client = useSelector((state: RootState) => state.clientAuth.client);
    const freelancer = useSelector((state: RootState) => state.freelancerAuth.freelancer);

    const userRole = location.pathname.startsWith('/client') ? 'client' : 'freelancer';
    const userId = userRole === 'client' ? client?._id : freelancer?._id;

    // Use current URL to determine active chat instead of internal state
    const currentActiveRoomId = params.freelancerId && params.clientId ? params.freelancerId + params.clientId : null;

    useEffect(() => {
        const fetchChatUsers = async () => {
            if (!userId) return;
            try {
                const response = await clientChatService(userId)
                setChatUsers(response?.data?.users || []);
            } catch (error) {
                console.error('Error fetching chat users:', error);
            }
        };
        fetchChatUsers();
    }, [userId]);

    const handleUserSelect = (clientId: string, freelancerId: string, otherUser: any) => {
        const path = userRole === 'client'
            ? `/client/chat/${freelancerId}/${clientId}`
            : `/freelancer/chat/${freelancerId}/${clientId}`;
        navigate(path, { state: { otherUser } });
        onClose();
    };

    // Deduplicate chats based on the other user's ID
    const uniqueChats = chatUsers.reduce((acc: IChat[], current) => {
        const currentOtherId = userRole === 'client'
            ? (typeof current.freelancerId === 'object' ? (current.freelancerId as any)._id : current.freelancerId)
            : (typeof current.clientId === 'object' ? (current.clientId as any)._id : current.clientId);

        const isDuplicate = acc.some(chat => {
            const otherId = userRole === 'client'
                ? (typeof chat.freelancerId === 'object' ? (chat.freelancerId as any)._id : chat.freelancerId)
                : (typeof chat.clientId === 'object' ? (chat.clientId as any)._id : chat.clientId);
            return otherId === currentOtherId;
        });

        if (!isDuplicate) {
            acc.push(current);
        }
        return acc;
    }, []);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        w-full bg-white flex flex-col z-50 h-full min-h-[500px]
        lg:w-80 lg:relative lg:translate-x-0 lg:border-r border-gray-200
        fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Header */}
                <div className="px-5 py-5 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all duration-300">
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 lg:hidden transition-all duration-300"
                                onClick={onClose}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                    {uniqueChats.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                            <p className="text-sm font-medium">No messages yet</p>
                        </div>
                    ) : (
                        uniqueChats.map((chat) => {
                            const isClient = (typeof chat.clientId === 'object' ? chat.clientId._id : chat.clientId) === userId;
                            const otherUser = isClient ? chat.freelancerId : chat.clientId;
                            const otherUserObj = typeof otherUser === 'object' ? otherUser : null;

                            const clientId = typeof chat.clientId === 'object' ? chat.clientId._id : chat.clientId;
                            const freelancerId = typeof chat.freelancerId === 'object' ? chat.freelancerId._id : chat.freelancerId;
                            const chatRoomId = freelancerId + clientId;
                            const isActive = currentActiveRoomId === chatRoomId;

                            return (
                                <motion.div
                                    key={chat._id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleUserSelect(clientId, freelancerId, otherUser)}
                                    className={`px-4 py-4 cursor-pointer transition-all duration-300 rounded-2xl border relative group ${isActive
                                        ? 'bg-emerald-50 shadow-sm border-emerald-200'
                                        : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-10 bg-emerald-600 rounded-r-full shadow-[2px_0_8px_rgba(5,150,105,0.3)]"></div>
                                    )}
                                    <div className="flex items-center space-x-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-13 h-13 rounded-full p-[2px] transition-all duration-500 bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-emerald-200">
                                                {otherUserObj?.profileImage ? (
                                                    <img 
                                                        src={otherUserObj.profileImage} 
                                                        alt={otherUserObj.name} 
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold border border-emerald-200 uppercase">
                                                        {otherUserObj?.name ? otherUserObj.name.charAt(0) : '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`font-bold text-base truncate transition-colors duration-300 ${isActive ? 'text-emerald-900' : 'text-gray-800 group-hover:text-emerald-700'}`}>
                                                    {otherUserObj?.name || 'Unknown User'}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className={`text-sm truncate transition-colors duration-300 font-medium ${isActive ? 'text-emerald-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                                    {chat.lastMessage || 'Chat started'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatSidebar;
