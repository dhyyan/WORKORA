import { useState } from 'react';
import ChatSidebar from '../../components/common/chat/ChatSidebar';
import Headder from '../../components/client/landingPage/Headder';
import { Outlet } from 'react-router-dom';

const ChatPage = () => {
    // Keep track of whether the sidebar is open on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50 pt-[73px]">
            {/* Top Navigation Navbar */}
            <Headder />

            {/* Main Chat Area below Navbar */}
            <div className="flex flex-1 w-full overflow-hidden relative">

                {/* Left Side: The Sidebar */}
                <div className={`hidden lg:block lg:w-80 border-r border-gray-200 bg-white`}>
                    <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                </div>

                {/* Right Side: The Chat Window or Template */}
                <div className="flex-1 flex flex-col h-full relative">

                    {/* Mobile Hamburger Button (Optional for testing) */}
                    <button
                        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-gray-200 text-gray-800 rounded-md shadow-sm"
                        onClick={() => setIsSidebarOpen(true)}
                        >
                        ☰ Menu
                    </button>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
