import { useState, useEffect } from 'react';
import { Check, Shield, Zap, Star, Loader2, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { createSubscriptionSession } from '../../service/subscription/subscriptionService';
import { getUserDetails as getClientDetails } from '../../service/client/Dashboard/ProfileService';
import { getUserDetails as getFreelancerDetails } from '../../service/freelancer/Dashboard/profileService';
import { addClient } from '../../store/slice/client/clientSlice';
import { addFreelancer } from '../../store/slice/freelancer/FreelanceSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';


const SubscriptionPage = ({ role, showNavbar = true }: { role: 'client' | 'freelancer', showNavbar?: boolean }) => {

    const client = useSelector((state: RootState) => state.clientAuth.client);
    const freelancer = useSelector((state: RootState) => state.freelancerAuth.freelancer);
    const user = role === 'client' ? client : freelancer;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshUser = async () => {
            if (user?._id) {
                try {
                    if (role === 'client') {
                        const updated = await getClientDetails({ userId: user._id });
                        if (updated?.data) dispatch(addClient(updated.data));
                    } else {
                        const updated = await getFreelancerDetails({ userId: user._id });
                        if (updated?.data?.userDetails) dispatch(addFreelancer(updated.data.userDetails));
                    }
                } catch (error) {
                    console.error("Failed to refresh user data:", error);
                } finally {
                    setInitialLoading(false);
                }
            } else {
                setInitialLoading(false);
            }
        };
        refreshUser();
    }, [role, user?._id, dispatch]);

    if (initialLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading subscription details...</p>
                </div>
            </div>
        );
    }

    const handleSubscribe = async () => {
        if (!user) {
            toast.error("Please login to subscribe");
            return;
        }

        setLoading(true);
        try {
            const response = await createSubscriptionSession(role);
            if (response?.url) {
                window.location.href = response.url;
            } else {
                toast.error("Failed to initiate subscription");
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const features = role === 'client' ? [
        "Post unlimited jobs",
        "Higher visibility for your projects",
        "Direct contact with top-tier freelancers",
        "Priority support",
        "Advanced project management tools"
    ] : [
        "Apply to unlimited jobs",
        "Highlighted profile in bid lists",
        "Access to high-budget projects",
        "Priority support",
        "Professional portfolio badges"
    ];

    return (
        <div className={`min-h-full bg-gray-50 flex flex-col ${!showNavbar ? 'p-0' : ''}`}>
            {/* Simple Header - Only show if showNavbar is true */}
            {showNavbar && (
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
            )}
            
            <main className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center ${showNavbar ? 'py-20' : 'py-10'}`}>

                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                        {user?.isSubscribed ? "You're a Pro Member" : "Upgrade to Pro"}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {user?.isSubscribed 
                            ? "Enjoy your unlimited access and premium features. Your business is growing with Workora Pro!"
                            : `Join thousands of ${role === 'client' ? 'businesses' : 'freelancers'} who are scaling their success with Workora Pro.`}
                    </p>
                </div>

                <div className="w-full max-w-lg">
                    {user?.isSubscribed ? (
                        /* Active Membership View */
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 transform transition-all hover:scale-[1.01] p-10 text-center relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            
                            <div className="flex justify-center mb-8">
                                <div className="bg-emerald-100 p-6 rounded-full relative">
                                    <Shield className="w-16 h-16 text-emerald-600" />
                                    <Sparkles className="absolute -top-1 -right-1 w-8 h-8 text-amber-400 animate-pulse" />
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-gray-900 mb-2">Congratulations!</h2>
                            <p className="text-emerald-600 font-bold mb-8">Your Pro Membership is Active</p>

                            <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-500 font-medium">Status</span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Premium</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 font-medium">Access expires in</span>
                                    <span className="text-gray-900 font-black text-xl">
                                        {user.subscriptionExpiryDate ? (
                                            <>
                                                {Math.max(0, Math.ceil((new Date(user.subscriptionExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} Days
                                            </>
                                        ) : (
                                            "30 Days"
                                        )}
                                    </span>
                                </div>
                                <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-emerald-500 transition-all duration-1000" 
                                        style={{ 
                                            width: `${user.subscriptionExpiryDate ? Math.min(100, (Math.max(0, Math.ceil((new Date(user.subscriptionExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) / 30) * 100) : 100}%` 
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                You have full access to all premium features. Your subscription will automatically renew on {user.subscriptionExpiryDate ? new Date(user.subscriptionExpiryDate).toLocaleDateString() : 'the end of your billing cycle'}.
                            </p>
                        </div>
                    ) : (
                        /* Sales/Pricing View */
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-all hover:scale-[1.01]">
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 text-white text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-emerald-500/20 p-4 rounded-2xl backdrop-blur-sm border border-emerald-500/30">
                                        <Shield className="w-10 h-10 text-emerald-400" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Monthly Subscription</h2>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <span className="text-5xl font-black">₹399</span>
                                    <span className="text-gray-400 text-lg">/month</span>
                                </div>
                                <p className="text-gray-400 text-sm">Billed monthly. Cancel anytime.</p>
                            </div>

                            <div className="p-10">
                                <ul className="space-y-4 mb-10">
                                    {features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 bg-emerald-100 p-0.5 rounded-full">
                                                <Check className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={handleSubscribe}
                                    disabled={loading}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-5 rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Zap className="w-6 h-6 fill-white" />
                                            Subscribe Now
                                        </>
                                    )}
                                </button>
                                
                                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span>Trusted by 50,000+ users worldwide</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <div className="text-center p-6">
                        <div className="text-emerald-600 font-bold text-2xl mb-2">Unlimited</div>
                        <p className="text-gray-500 text-sm">No more caps on {role === 'client' ? 'posting jobs' : 'applying to bids'}.</p>
                    </div>
                    <div className="text-center p-6 border-x border-gray-100">
                        <div className="text-emerald-600 font-bold text-2xl mb-2">Secure</div>
                        <p className="text-gray-500 text-sm">Payments processed securely via Stripe encryption.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="text-emerald-600 font-bold text-2xl mb-2">Flexible</div>
                        <p className="text-gray-500 text-sm">Change plans or cancel at the touch of a button.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionPage;
