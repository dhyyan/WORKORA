import { motion } from 'framer-motion';
// import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import type { RefObject } from 'react';

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    onSendMessage: (e: React.FormEvent) => void;
    inputRef: RefObject<HTMLInputElement | null>;
    disabled?: boolean;
}

const MessageInput = ({
    message,
    setMessage,
    onSendMessage,
    inputRef,
    disabled = false,
}: MessageInputProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0 relative z-20"
        >
            <form onSubmit={onSendMessage} className="flex items-center space-x-3 max-w-5xl mx-auto">
                {/* Attachment Button */}
                {/* <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2.5 transition-all duration-300"
          disabled={disabled}
          type="button"
        >
          <Paperclip className="w-5 h-5" />
        </Button> */}

                {/* Message Input */}
                <div className="flex-1 relative group">
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        disabled={disabled}
                        className="w-full bg-gray-100 text-gray-900 placeholder:text-gray-500 rounded-full px-5 py-3.5 pr-12 border border-transparent focus:outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all duration-300"
                    />

                    {/* Emoji Button */}
                    {/* <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2"
            disabled={disabled}
            type="button"
          >
            <Smile className="w-5 h-5" />
          </Button> */}
                </div>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className={`flex items-center justify-center rounded-full p-3.5 transition-all duration-300 shadow-sm ${message.trim() && !disabled
                        ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 hover:shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </motion.div>
    );
};

export default MessageInput;
