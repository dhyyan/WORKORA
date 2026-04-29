import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Phone } from 'lucide-react';

interface ChatHeaderProps {
    user: {
        _id: string;
        name: string;
        avatar: string;
        isOnline: boolean;
        lastSeen: string;
    } | null;
    onBackClick?: () => void;
    showBackButton?: boolean;
}

const ChatHeader = ({ user, onBackClick, showBackButton }: ChatHeaderProps) => {
    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0 relative z-20 sticky top-0"
        >
            <div className="flex items-center space-x-3">
                {showBackButton && (
                    <button
                        className="text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full p-2 lg:hidden transition-colors"
                        onClick={onBackClick}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative"
                >
                    <div className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-sm">
                        <div className="w-full h-full rounded-full bg-white p-[1px]">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center border border-emerald-200 uppercase">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                    {user.isOnline && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"
                        />
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                >
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{user.name}</h3>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                        {user.isOnline && (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        )}
                        <p className={`text-[11px] font-semibold uppercase tracking-wider ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                            {user.isOnline ? 'Online' : user.lastSeen}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="flex items-center space-x-1">
                <button className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full p-2.5 transition-all">
                    <Phone className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full p-2.5 transition-all">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

export default ChatHeader;
