
import { useState } from 'react';
import { CheckCircle, Clock, Search, DollarSign, ArrowUpRight } from 'lucide-react';

// Mock Data Type
interface EscrowTransaction {
    id: string;
    contractId: string;
    jobTitle: string;
    clientName: string;
    freelancerName: string;
    amount: number;
    milestoneName: string;
    status: 'Funded' | 'Released' | 'Refunded';
    approvalDate?: string;
}

const EscrowList = () => {
    // Mock Data
    const [transactions, setTransactions] = useState<EscrowTransaction[]>([
        {
            id: 'esc_1',
            contractId: 'CTR-2024-001',
            jobTitle: 'E-commerce Website Setup',
            clientName: 'Alice Johnson',
            freelancerName: 'Bob Smith',
            amount: 500.00,
            milestoneName: 'Initial Setup',
            status: 'Funded',
            approvalDate: '2024-02-12'
        },
        {
            id: 'esc_2',
            contractId: 'CTR-2024-002',
            jobTitle: 'Logo Design for Tech Startup',
            clientName: 'David Lee',
            freelancerName: 'Emma Wilson',
            amount: 150.00,
            milestoneName: 'Final Logo Delivery',
            status: 'Funded',
            approvalDate: '2024-02-13'
        },
        {
            id: 'esc_3',
            contractId: 'CTR-2024-003',
            jobTitle: 'React Native App Fixes',
            clientName: 'Michael Brown',
            freelancerName: 'Chris Evans',
            amount: 320.00,
            milestoneName: 'Bug Fixes Phase 1',
            status: 'Released',
            approvalDate: '2024-02-10'
        },
        {
            id: 'esc_4',
            contractId: 'CTR-2024-089',
            jobTitle: 'SEO Optimization',
            clientName: 'Sarah Davis',
            freelancerName: 'Mike Ross',
            amount: 500.00,
            milestoneName: 'Monthly Retainer',
            status: 'Funded',
            approvalDate: '2024-02-14'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleReleasePayment = (id: string) => {
        // Mock release action
        if (window.confirm('Are you sure you want to release this payment to the freelancer?')) {
            setTransactions(prev => prev.map(t =>
                t.id === id ? { ...t, status: 'Released' } : t
            ));
            alert('Payment released successfully!');
        }
    };

    const filteredTransactions = transactions.filter(t =>
        t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.contractId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Escrow Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and release milestone payments.</p>
                </div>
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search contract, client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full md:w-64 text-sm"
                    />
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
                    <h3 className="text-2xl font-bold text-gray-900">
                        ${transactions.filter(t => t.status === 'Funded').reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                    </h3>
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
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{transaction.contractId}</span>
                                            <span className="text-xs text-gray-500">Approved: {transaction.approvalDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-900">{transaction.milestoneName}</span>
                                            <span className="text-xs text-gray-500 truncate max-w-[150px]">{transaction.jobTitle}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-900">Client: {transaction.clientName}</span>
                                            <span className="text-gray-500">Freelancer: {transaction.freelancerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-semibold text-gray-900">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            {transaction.amount.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${transaction.status === 'Funded'
                                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                : 'bg-green-50 text-green-700 border-green-200'
                                            }
                                        `}>
                                            {transaction.status === 'Funded' ? 'Pending Release' : transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {transaction.status === 'Funded' ? (
                                            <button
                                                onClick={() => handleReleasePayment(transaction.id)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                            >
                                                Release Pay
                                                <ArrowUpRight className="w-3 h-3" />
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Paid
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTransactions.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No transactions found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EscrowList;
