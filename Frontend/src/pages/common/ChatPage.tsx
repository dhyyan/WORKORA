import { useState } from 'react';
import ChatSidebar from '../../components/common/chat/ChatSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const ChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Check if we are in a specific chat conversation
    const isChatSelected = location.pathname.split('/').length > 3;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-white">
            {/* Main Chat Area below Navbar */}
            <div className="flex flex-1 w-full overflow-hidden relative">

                {/* Sidebar: Chat List */}
                <div className={`
                    ${isChatSelected ? 'hidden lg:flex' : 'flex'} 
                    w-full lg:w-80 border-r border-gray-100 bg-white z-20
                `}>
                    <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                </div>

                {/* Main Content: Chat Window or Template */}
                <div className={`
                    ${!isChatSelected ? 'hidden lg:flex' : 'flex'} 
                    flex-1 flex flex-col h-full relative bg-gray-50
                `}>
                    {/* Mobile Menu Button for when no chat is selected on small screens */}
                    {!isChatSelected && (
                        <div className="lg:hidden flex items-center justify-center h-full p-8 text-center">
                            <div className="max-w-xs">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                                    <Menu className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Your Messages</h3>
                                <p className="text-gray-500 mb-6">Select a conversation from the menu to start chatting.</p>
                                <button
                                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition-all"
                                    onClick={() => setIsSidebarOpen(true)}
                                >
                                    Open Contacts
                                </button>
                            </div>
                        </div>
                    )}

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
