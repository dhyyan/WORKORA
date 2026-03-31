import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { clientChatService } from '../../../service/chat/chatService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { IChat } from '../../../types/chat/IChat';
import { Search, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UserSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}



const ChatSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
    const [chatUsers, setChatUsers] = useState<IChat[]>([]);
    const [currentChatUserId, setCurrentChatUserId] = useState<string>('1');

    const location = useLocation();
    const client = useSelector((state: RootState) => state.clientAuth.client);
    const freelancer = useSelector((state: RootState) => state.freelancerAuth.freelancer);

    // Determine role based on URL path instead of just checking availability in state
    const userRole = location.pathname.startsWith('/client') ? 'client' : 'freelancer';
    const userId = userRole === 'client' ? client?._id : freelancer?._id;

    const navigate = useNavigate();

    const handleUserSelect = (clinetId: string, freelancerId: string) => {
        console.log(clinetId, freelancerId, "ids")
        const path = userRole === 'client'
            ? `/client/chat/${freelancerId}/${clinetId}`
            : `/freelancer/chat/${freelancerId}/${clinetId}`;
        navigate(path);
        setCurrentChatUserId(freelancerId);
        onClose();
    };


    useEffect(() => {
        const fetchChatUsers = async () => {
            if (!userId) return;
            try {
                console.log(userId, "userId in fetch chat users");
                const response = await clientChatService(userId)
                console.log("rsponse of list usr", response)
                setChatUsers(response?.data?.users || []);
            } catch (error) {
                console.error('Error fetching chat users:', error);
            }
        };
        fetchChatUsers();
    }, [userId]);

    console.log(chatUsers, "dddddaad");

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
                    {chatUsers?.map((chat) => {
                        const isClient = (typeof chat.clientId === 'object' ? chat.clientId._id : chat.clientId) === userId;
                        const otherUser = isClient
                            ? (chat.freelancerId)
                            : (chat.clientId);
                        const otherUserObj = typeof otherUser === 'object' ? otherUser : null;

                        const clientId = typeof chat.clientId === 'object' ? chat.clientId._id : chat.clientId;
                        const freelancerId = typeof chat.freelancerId === 'object' ? chat.freelancerId._id : chat.freelancerId;

                        return (
                            <motion.div
                                key={chat._id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleUserSelect(clientId, freelancerId)}
                                className={`px-4 py-4 cursor-pointer transition-all duration-300 rounded-2xl border relative group ${currentChatUserId === chat._id
                                    ? 'bg-green-50 shadow-sm border-green-200'
                                    : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                                    }`}
                            >
                                {/* Active indicator dot */}
                                {currentChatUserId === chat._id && (
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-600 rounded-r-full"></div>
                                )}
                                <div className="flex items-center space-x-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full p-[2px] transition-all duration-500">
                                            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-semibold border border-blue-200">
                                                {otherUserObj?.name ? otherUserObj.name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={`font-semibold text-base truncate transition-colors duration-300 ${currentChatUserId === chat._id ? 'text-green-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                                {otherUserObj?.name || 'Unknown User'}
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm truncate transition-colors duration-300 ${currentChatUserId === chat._id ? 'text-green-700' : 'text-gray-500 group-hover:text-gray-600'}`}>
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ChatSidebar;
