
import { useNavigate, NavLink } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const SubscriptionCancel = ({ role }: { role: 'client' | 'freelancer' }) => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Simple Header */}
            <nav className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <span className="text-white font-black text-xl">W</span>
                    </div>
                    <span className="text-2xl font-black text-gray-900 tracking-tight">Workora</span>
                </div>
                <NavLink to={`/${role}`} className="text-sm font-semibold text-gray-500 hover:text-emerald-600 transition-colors">
                    Back to Home
                </NavLink>
            </nav>
            <main className="flex-1 flex items-center justify-center p-4">

                <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-amber-500"></div>
                    
                    <div className="flex justify-center mb-8">
                        <div className="bg-red-100 p-6 rounded-full">
                            <XCircle className="w-16 h-16 text-red-600" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 mb-4">Payment Cancelled</h1>
                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        The subscription process was cancelled and you haven't been charged. If you encountered an issue, feel free to try again.
                    </p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => navigate(`/${role}/subscription`)}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate(role === 'client' ? '/client/profile' : '/freelancer/dashboard')}
                            className="w-full bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Platform
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionCancel;
