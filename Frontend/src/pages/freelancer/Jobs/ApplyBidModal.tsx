import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, DollarSign, FileText } from 'lucide-react';

interface ApplyBidModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    jobBudget?: number | string;
    onSubmit: (data: { coverLetter: string; bidAmount: string }) => void;
}

const ApplyBidModal = ({ isOpen, onClose, jobTitle, jobBudget, onSubmit }: ApplyBidModalProps) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate a small delay for better UX (feeling of "processing")
        // await new Promise(resolve => setTimeout(resolve, 800));
        onSubmit({ coverLetter, bidAmount });
        setIsSubmitting(false);
        onClose();
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all"
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
                            <div className="bg-gradient-to-r from-emerald-50 to-white px-8 py-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800">Submit Your Proposal</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    For <span className="font-semibold text-emerald-600">"{jobTitle}"</span>
                                </p>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

                                {/* Cover Letter Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-emerald-500" />
                                        Cover Letter
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Introduce yourself and explain why you're the perfect fit. Make it personal!
                                    </p>
                                    <textarea
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder="Hi there! I read your project description and I'm excited because..."
                                        className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none text-sm text-gray-700 placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Budget Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-emerald-500" />
                                        Your Bid
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder={jobBudget ? `${jobBudget}` : "0.00"}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-900 font-medium"
                                            required
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">
                                            Total Amount
                                        </div>
                                    </div>
                                    {jobBudget && (
                                        <p className="text-xs text-gray-400 text-right">
                                            Client's Budget: ${jobBudget}
                                        </p>
                                    )}
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
                                        disabled={isSubmitting}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Submit Proposal <CheckCircle className="w-4 h-4" />
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

export default ApplyBidModal;
