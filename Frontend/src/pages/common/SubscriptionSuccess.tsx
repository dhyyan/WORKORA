import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const SubscriptionSuccess = ({ role }: { role: 'client' | 'freelancer' }) => {

    const navigate = useNavigate();

    useEffect(() => {
        // Trigger confetti celebration
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

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
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                    
                    <div className="flex justify-center mb-8">
                        <div className="bg-emerald-100 p-6 rounded-full relative">
                            <CheckCircle className="w-16 h-16 text-emerald-600" />
                            <Sparkles className="absolute -top-1 -right-1 w-8 h-8 text-amber-400 animate-pulse" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 mb-4">You're Pro Now!</h1>
                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        Thank you for subscribing to Workora Pro. Your account has been upgraded, and all restrictions have been lifted. Time to scale your success!
                    </p>

                    <button
                        onClick={() => navigate(role === 'client' ? '/client/profile' : '/freelancer/dashboard')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group text-lg"
                    >
                        Go to {role === 'client' ? 'Dashboard' : 'Jobs'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="mt-8 text-sm text-gray-400">
                        A confirmation email has been sent to your inbox.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionSuccess;
