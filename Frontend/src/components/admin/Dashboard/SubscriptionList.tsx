import { useEffect, useState } from "react";
import { getSubscriptionRevenue } from "../../../service/admin/subscriptionService";
import { Search, DollarSign, Calendar, User, ShieldCheck } from "lucide-react";
import Pagination from "../../common/Pagination";

interface ISubscription {
    userId: string;
    role: string;
    amount: number;
    description: string;
    date: string | Date;
}

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState<ISubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                const response = await getSubscriptionRevenue();
                if (response?.success) {
                    setSubscriptions(response.data || []);
                    setFilteredSubscriptions(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubscriptions();
    }, []);

    useEffect(() => {
        const filtered = subscriptions.filter(sub => 
            sub.userId.toLowerCase().includes(search.toLowerCase()) ||
            sub.role.toLowerCase().includes(search.toLowerCase()) ||
            sub.description.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSubscriptions(filtered);
        setCurrentPage(1);
    }, [search, subscriptions]);

    const totalPages = Math.ceil(filteredSubscriptions.length / limit);
    const startIndex = (currentPage - 1) * limit;
    const currentData = filteredSubscriptions.slice(startIndex, startIndex + limit);

    const totalRevenue = subscriptions.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="space-y-6">
            {/* Revenue Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg transform transition hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-emerald-50 opacity-80 text-sm font-medium">Total Subscription Revenue</p>
                            <h3 className="text-3xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-emerald-50">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        <span>Verified Transactions</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                        <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Subscribers</p>
                        <h3 className="text-2xl font-bold text-gray-800">{subscriptions.length}</h3>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-purple-50 p-3 rounded-xl">
                        <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Latest Payment</p>
                        <h3 className="text-lg font-bold text-gray-800">
                            {subscriptions.length > 0 
                                ? new Date(subscriptions[0].date).toLocaleDateString() 
                                : "N/A"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Subscription History</h2>
                        <p className="text-gray-500 text-sm">View and manage all subscription payments</p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by User ID, Role..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full md:w-80 text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-6 py-4 text-left font-semibold text-gray-600">Subscriber Details</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-600">Amount</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-600">Payment Date</th>
                                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-lg w-full"></div></td>
                                    </tr>
                                ))
                            ) : currentData.length > 0 ? (
                                currentData.map((sub, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800">{sub.userId}</span>
                                                <span className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{sub.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                sub.role.toLowerCase() === 'client' 
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'bg-indigo-50 text-indigo-600'
                                            }`}>
                                                {sub.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-800">₹{sub.amount}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                {new Date(sub.date).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="bg-gray-50 p-4 rounded-full mb-4">
                                                <DollarSign className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <p className="font-medium">No subscription payments found</p>
                                            <p className="text-sm mt-1">Try adjusting your search filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && filteredSubscriptions.length > limit && (
                    <div className="mt-8 border-t border-gray-50 pt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionList;
