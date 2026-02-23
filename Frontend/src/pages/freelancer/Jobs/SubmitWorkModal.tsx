import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Link as LinkIcon, FileText } from 'lucide-react';
import type { SubmitMiestone } from '../../../types/client/milestone/IMilestone';

interface SubmitWorkModalProps {
    isOpen: boolean;
    onClose: () => void;
    milestoneTitle: string;
    milestoneId:string;
    onSubmit: (data:SubmitMiestone) => void;
}

const SubmitWorkModal = ({ isOpen, onClose, milestoneTitle,milestoneId, onSubmit }: SubmitWorkModalProps) => {
    const [taskUrl, setTaskUrl] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate real API submission delay if needed, or wait for parent
        onSubmit({ milestoneId,taskUrl, description });
        setTaskUrl("");
        setDescription("");
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
                                <h2 className="text-xl font-bold text-gray-800">Submit Work</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    For milestone <span className="font-semibold text-emerald-600">"{milestoneTitle}"</span>
                                </p>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

                                {/* Task URL Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4 text-emerald-500" />
                                        Task URL
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Provide a link to your completed work (e.g., GitHub, Google Drive, Figma)
                                    </p>
                                    <input
                                        type="url"
                                        value={taskUrl}
                                        onChange={(e) => setTaskUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm text-gray-700 placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Description Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-emerald-500" />
                                        Description
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Briefly describe what you have completed for this milestone.
                                    </p>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="I have completed..."
                                        className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none text-sm text-gray-700 placeholder:text-gray-400"
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
                                        disabled={isSubmitting}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit <CheckCircle className="w-4 h-4" />
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

export default SubmitWorkModal;
