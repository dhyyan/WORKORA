import { motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, CreditCard, Download } from 'lucide-react'

const Wallet = () => {

    const transactions = [
  {
    id: 1,
    desc: 'Payment from TechFlow Inc.',
    date: 'Oct 24, 2023',
    amount: '+$2,250.00',
    type: 'income',
    status: 'Completed',
  },
  {
    id: 2,
    desc: 'Software Subscription',
    date: 'Oct 22, 2023',
    amount: '-$49.00',
    type: 'expense',
    status: 'Completed',
  },
  {
    id: 3,
    desc: 'Payment from StartUp Lab',
    date: 'Oct 20, 2023',
    amount: '+$850.00',
    type: 'income',
    status: 'Completed',
  },
  {
    id: 4,
    desc: 'Withdrawal to Bank Account',
    date: 'Oct 18, 2023',
    amount: '-$1,500.00',
    type: 'withdrawal',
    status: 'Processing',
  },
  {
    id: 5,
    desc: 'Asset Purchase',
    date: 'Oct 15, 2023',
    amount: '-$120.00',
    type: 'expense',
    status: 'Completed',
  },
]
  return (
    <>
        <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="p-8 space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800">Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white shadow-lg shadow-emerald-200"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              {/* <Wallet className="w-6 h-6 text-white" /> */}
            </div>
            <span className="text-emerald-100 text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="mb-8">
            <p className="text-emerald-100 text-sm mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold">$12,450.00</h2>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-white text-emerald-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-4 h-4" />
              Withdraw
            </button>
            <button className="flex-1 bg-emerald-700/50 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-700/70 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              <CreditCard className="w-4 h-4" />
              Top Up
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-gray-500 text-sm font-medium">
                Total Income
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 pl-14">$45,280.00</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <ArrowDownLeft className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-gray-500 text-sm font-medium">
                Total Expenses
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 pl-14">$3,450.00</p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            Recent Transactions
          </h3>
          <button className="text-gray-500 hover:text-emerald-600 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {tx.type === 'income' ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {tx.desc}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}
                  >
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
    </>
  )
}

export default Wallet
