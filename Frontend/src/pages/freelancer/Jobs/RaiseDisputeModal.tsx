import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, FileText, Send } from 'lucide-react';

interface RaiseDisputeModalProps {
    isOpen: boolean;
    onClose: () => void;
    milestoneTitle: string;
    contractId: string;
    milestoneId: string;
    amount: number;
    onSubmit: (data: { contractId: string, description: string, amount: number, milestoneId: string }) => Promise<void> | void;
}

const RaiseDisputeModal = ({ isOpen, onClose, milestoneTitle, contractId, milestoneId, amount, onSubmit }: RaiseDisputeModalProps) => {
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({ contractId, description, amount, milestoneId });
            setDescription("");
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-all"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="bg-gradient-to-r from-red-50 to-white px-8 py-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                    Raise Dispute
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    For milestone <span className="font-semibold text-red-600">"{milestoneTitle}"</span>
                                </p>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800 leading-relaxed">
                                        Raising a dispute will notify the platform administrators. Please provide a clear explanation of why you believe the client's request for changes is unjustified.
                                    </p>
                                </div>

                                {/* Description Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-red-500" />
                                        Dispute Description
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Provide details about the work performed and why the requested changes are not valid.
                                    </p>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Explain your side of the dispute..."
                                        className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none text-sm text-gray-700 placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-50 mt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !description.trim()}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:shadow-red-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Dispute <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RaiseDisputeModal;
