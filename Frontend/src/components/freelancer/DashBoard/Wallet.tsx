import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Calendar, Loader2, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import type { RootState } from '../../../store/store';
import { getWallet } from '../../../service/freelancer/Dashboard/walletService';
import type { IWalletTransaction, IWallet } from '../../../types/freelancer/IWallet';
import Pagination from '../../common/Pagination';

const Wallet: React.FC = () => {
    const { freelancer } = useSelector((state: RootState) => state.freelancerAuth);
    const userId = freelancer?._id;

    const [walletData, setWalletData] = useState<IWallet | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        if (userId) {
            fetchWalletData(currentPage);
        }
    }, [userId, currentPage]);

    const fetchWalletData = async (page: number) => {
        setLoading(true);
        try {
            const response = await getWallet(userId!, page, limit);
            if (response.success) {
                setWalletData(response.data);
            }
        } catch (error) {
            console.error("Error fetching wallet:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !walletData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
                <p className="text-gray-500 mt-1">Manage your earnings and see your transaction history.</p>
            </div>

            {/* Balance Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <WalletIcon size={120} />
                </div>
                <div className="relative z-10">
                    <p className="text-emerald-100 font-medium tracking-wide border-b border-white/20 pb-2 inline-block">Total Balance</p>
                    <div className="mt-6 flex items-center gap-2">
                        <IndianRupee className="w-10 h-10 text-emerald-200" />
                        <h2 className="text-5xl font-extrabold tracking-tight">
                            {walletData?.balance?.toLocaleString('en-IN') || '0'}
                        </h2>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/10">
                            Withdraw Funds
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Transactions Section */}
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-8 py-4">Transaction</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {walletData?.transactions && walletData.transactions.length > 0 ? (
                                walletData.transactions.map((tx: IWalletTransaction) => (
                                    <tr key={tx._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                    tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                    {tx.type === 'credit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 leading-tight">{tx.description}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5 uppercase font-bold tracking-tighter">{tx.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`font-bold text-base ${
                                                tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                                            }`}>
                                                {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount?.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-emerald-100">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <WalletIcon size={40} className="mb-2 opacity-20" />
                                            <p className="font-medium">No transactions found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {walletData && walletData.totalPages > 1 && (
                    <div className="px-8 py-6 border-t border-gray-50">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={walletData.totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;
