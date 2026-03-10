import React from 'react'
import { LuArrowRight, LuInbox } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  const hasTransactions = transactions.length > 0

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium">Recent Transactions</h5>

        {hasTransactions && (
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      <div className="mt-6">
        {hasTransactions ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <LuInbox className="text-4xl text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">
              No recent transactions
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Your latest income and expenses will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTransactions

