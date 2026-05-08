import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Eye, ArrowUpRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '../../common/Pagination';
import { listConcernService, releaseConcernPaymentService } from '../../../service/admin/Dashboard/client/clientService';

interface IConcern {
    id: string;
    contractId: string;
    description: string;
    status: string;
    createdAt: Date;
}

const ConcernList = () => {
    const [concerns, setConcerns] = useState<IConcern[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedConcern, setSelectedConcern] = useState<IConcern | null>(null);
    const limit = 5;



    const fetchConcerns = useCallback(async () => {
        try {
            const response = await listConcernService(currentPage, limit);
            if (response?.response) {
                setConcerns(response.response.concern || []);
                setTotalPages(Math.ceil((response.response.totalConcern || 0) / limit) || 1);
            }
        } catch (error) {
            console.error("Failed to fetch concerns:", error);
        }
    }, [currentPage, limit]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchConcerns();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchConcerns]);

    const handleViewClick = (concern: IConcern) => {
        setSelectedConcern(concern);
    };

    const handleReleasePayment = async (type: 'client' | 'freelancer') => {
        if (!selectedConcern) return;

        try {
            const res = await releaseConcernPaymentService(selectedConcern.id, type);
            if (res && res.success) {
                toast.success(`Payment released for ${type} successfully!`);
                setSelectedConcern(null);
                fetchConcerns();
            } else {
                toast.error(res?.message || "Failed to release payment");
            }
        } catch (error) {
            console.error("Error releasing payment:", error);
            toast.error("Error releasing payment");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dispute & Concern Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Review and manage contract disputes.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-sm text-gray-400">Total Concerns</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {concerns.length}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Active concerns displaying on this page</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contract ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {concerns.map((concern) => (
                                <tr key={concern.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{concern.contractId?.substring(0, 8) || 'N/A'}...</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900 max-w-xs truncate">{concern.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-900">{new Date(concern.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${concern.status === 'pending'
                                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                : concern.status === 'resolved'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                            }
                                        `}>
                                            {concern.status || 'open'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => concern.status !== 'resolved' && handleViewClick(concern)}
                                            disabled={concern.status === 'resolved'}
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm ${concern.status === 'resolved'
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70 border-none'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                        >
                                            <Eye className="w-3 h-3" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                {concerns.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
                {concerns.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No concerns found.
                    </div>
                )}
            </div>

            {/* View Modal */}
            {selectedConcern && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                Concern Details
                            </h3>
                            <button
                                onClick={() => setSelectedConcern(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">Contract ID</h4>
                                <p className="text-gray-900 font-mono bg-gray-50 p-2 rounded">{selectedConcern.contractId}</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">Status</h4>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-50 text-yellow-700 border-yellow-200 uppercase">
                                    {selectedConcern.status || 'open'}
                                </span>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1">Description</h4>
                                <div className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm border border-gray-100 min-h-[100px]">
                                    {selectedConcern.description}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => handleReleasePayment('client')}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2 transition-colors"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                                Release payment for Client
                            </button>
                            <button
                                onClick={() => handleReleasePayment('freelancer')}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center justify-center gap-2 transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Release payment for Freelancer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConcernList;
