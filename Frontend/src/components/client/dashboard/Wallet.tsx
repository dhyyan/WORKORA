import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, CreditCard, Download, Wallet as WalletIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { getWalletData } from '../../../service/client/Dashboard/WalletService'

interface Transaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
}

const Wallet = () => {
  const userData = useSelector((state: RootState) => state.clientAuth.client)
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalCredits, setTotalCredits] = useState(0)
  const [totalDebits, setTotalDebits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchWallet = async () => {
      if (userData?._id) {
        try {
          const data = await getWalletData(userData._id, page, 5)
          setBalance(data.balance)
          setTransactions(data.transactions)
          setTotalPages(data.totalPages)
          setTotalCredits(data.totalCredit)
          setTotalDebits(data.totalDebit)
        } catch (error) {
          console.error("Failed to fetch wallet:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchWallet()
  }, [userData?._id, page])


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-emerald-600 font-medium">Wallet</span>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <WalletIcon className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                Primary Account
              </span>
            </div>

            <div className="mb-12">
              <p className="text-emerald-100/80 text-sm font-medium mb-2 uppercase tracking-widest">Available Balance</p>
              <h2 className="text-5xl font-black tracking-tight">${balance.toLocaleString()}</h2>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-white text-emerald-700 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                <ArrowDownLeft className="w-4 h-4" />
                Withdraw
              </button>
              <button className="flex-1 bg-emerald-500/30 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md">
                <CreditCard className="w-4 h-4" />
                Top Up
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight className="w-32 h-32 text-emerald-600" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">
                Total Credits
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">${totalCredits.toLocaleString()}</p>
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                <span className="px-2 py-1 bg-emerald-50 rounded-md">+12.5%</span>
                <span className="text-gray-400 font-medium tracking-normal">vs last month</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
              <ArrowDownLeft className="w-32 h-32 text-red-600" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">
                Total Debits
              </span>
            </div>
            <p className="text-3xl font-black text-gray-900">${totalDebits.toLocaleString()}</p>
            <div className="mt-4 flex items-center gap-2 text-red-600 text-xs font-bold">
                <span className="px-2 py-1 bg-red-50 rounded-md">+4.2%</span>
                <span className="text-gray-400 font-medium tracking-normal">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Transaction History
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-medium">Recent financial activities in your account</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl font-bold text-sm transition-all border border-gray-100">
            <Download className="w-4 h-4" />
            Statements
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Date & Time
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500 font-medium">
                    No transactions found yet.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`p-2.5 rounded-xl mr-4 shadow-sm group-hover:scale-110 transition-transform ${
                            tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {tx.type === 'credit' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{tx.description}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Completed
                      </span>
                    </td>
                    <td
                      className={`px-8 py-5 whitespace-nowrap text-sm font-black text-right ${
                        tx.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'
                      }`}
                    >
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                            page === i + 1 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                            : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Wallet
