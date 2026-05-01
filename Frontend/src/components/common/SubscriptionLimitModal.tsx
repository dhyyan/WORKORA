import React from 'react';
import { X, ShieldCheck, Sparkles } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface SubscriptionLimitModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    role: 'client' | 'freelancer';
}

const SubscriptionLimitModal: React.FC<SubscriptionLimitModalProps> = ({ isOpen, onClose, title, description, role }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubscribe = () => {
        onClose();
        navigate(`/${role}/subscription`);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in slide-in-from-bottom-8 duration-500">
                {/* Header Decoration */}
                <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl translate-x-12 translate-y-12"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={handleSubscribe}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <ShieldCheck className="w-5 h-5" />
                            Get Monthly Pro - ₹399
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-400">
                            Cancel anytime. Secure payment via Stripe.
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SubscriptionLimitModal;
