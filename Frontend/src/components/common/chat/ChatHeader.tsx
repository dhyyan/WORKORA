import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
import { MoreVertical, ArrowLeft } from 'lucide-react';
const IMG_URL = import.meta.env.VITE_IMAGE_URL;
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

const ChatHeader = ({ user, onBackClick, showBackButton = false }: ChatHeaderProps) => {
    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0 relative z-20"
        >
            <div className="flex items-center space-x-3">
                {/* Back button for mobile */}
                {/* {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 lg:hidden"
            onClick={onBackClick}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )} */}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="relative"
                >
                    {user.avatar ? (
                        <img
                            src={IMG_URL + user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border border-blue-200">
                            {user.name.charAt(0)}
                        </div>
                    )}
                    {user.isOnline && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.4 }}
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"
                        />
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                >
                    <h3 className="font-semibold text-gray-900 text-base">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.lastSeen}</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center space-x-2"
            >
                {/* <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2">
          <Phone className="w-5 h-5" />
        </Button> */}
                {/* <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2">
          <MoreVertical className="w-5 h-5" />
        </Button> */}
            </motion.div>
        </motion.div>
    );
};

export default ChatHeader;
