import { motion } from 'framer-motion';

function MessageTemplate() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-4 relative z-10"
        >
            <div className="text-center space-y-8">


                <div className="space-y-4 max-w-lg mx-auto">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-center justify-center">Welcome to Workora Chat</h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="text-gray-500 text-lg leading-relaxed font-light"
                    >
                        Select a conversation from the sidebar to start chatting with freelancers and clients.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}

export default MessageTemplate;