import { useCallback, useEffect, useState } from 'react';
import { CheckCircle, Clock, IndianRupee, ArrowUpRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../common/Pagination';
// import { listMilestoneService } from '../../../../service/admin/Dashboard/client/clientService';
import type { IMilestone } from '../../../types/client/milestone/IMilestone';
import { listMilestoneService, relesePaymentService } from '../../../service/admin/Dashboard/client/clientService';
// import { IMilestone } from '../../../../types/client/milestone/IMilestone';

const EscrowList = () => {
    const [milestones, setMilestones] = useState<IMilestone[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEscrowAmount, setTotalEscrowAmount] = useState(0);
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
    const [isReleasing, setIsReleasing] = useState(false);
    const limit = 5;

    const fetchMilestones = useCallback(async () => {
        try {
            const res = await listMilestoneService(currentPage, limit);
            if (res && res.response) {
                setMilestones(res.response.miletstone || []);
                setTotalPages(Math.ceil((res.response.totalMilestone || 0) / limit) || 1);
                setTotalEscrowAmount(res.response.totalEscrowAmount || 0);
            }
        } catch (error) {
            console.error("Failed to fetch milestones:", error);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchMilestones();
    }, [fetchMilestones]);

    const handleReleaseClick = (id: string) => {
        setSelectedMilestoneId(id);
    };

    const confirmReleasePayment = async () => {
        if (!selectedMilestoneId) return;
        setIsReleasing(true);
        try {
            const res = await relesePaymentService(selectedMilestoneId);
            if (res && res.success) {
                toast.success("Payment released successfully");
                setSelectedMilestoneId(null);
                fetchMilestones(); // Re-render the page with updated data
            } else {
                toast.error("Failed to release payment");
            }
        } catch (error) {
            console.error("Error releasing payment:", error);
            toast.error("Error releasing payment");
        } finally {
            setIsReleasing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Escrow Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and release milestone payments.</p>
                </div>
            </div>

            {/* Stats Cards (Optional but nice for Admin UI) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <span className="text-sm text-gray-400">Pending Release</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IndianRupee className="w-6 h-6 text-gray-900" />
                        <h3 className="text-2xl font-bold text-gray-900">
                            {totalEscrowAmount.toFixed(2)}
                        </h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Total value in escrow waiting for release</p>
                </div>
                {/* ... other stats could go here */}
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Milestone</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parties</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {milestones.map((transaction) => (
                                <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{transaction.contractId?.substring(0, 8)}...</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900">{transaction.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-900">Client Info</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-semibold text-gray-900">
                                            <IndianRupee className="w-4 h-4 text-gray-400" />
                                            {transaction.amount.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${transaction.status === 'funded'
                                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                : transaction.status === 'approved'
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                    : 'bg-green-50 text-green-700 border-green-200'
                                            }
                                        `}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {transaction.status === 'released' ? (
                                            <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => transaction.status === 'approved' && handleReleaseClick(transaction._id!)}
                                                disabled={transaction.status !== 'approved'}
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm ${transaction.status === 'approved'
                                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                    : 'bg-emerald-600/50 text-white/70 cursor-not-allowed'
                                                    }`}
                                            >
                                                Release Pay
                                                <ArrowUpRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                {milestones.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
                {milestones.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No transactions found matching your search.
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {selectedMilestoneId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Payment Release</h3>
                            <button
                                onClick={() => setSelectedMilestoneId(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Are you sure you want to release this payment? This action cannot be undone and the funds will be transferred to the freelancer's wallet.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => setSelectedMilestoneId(null)}
                                disabled={isReleasing}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReleasePayment}
                                disabled={isReleasing}
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isReleasing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Releasing...
                                    </>
                                ) : (
                                    "Confirm Release"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EscrowList;
