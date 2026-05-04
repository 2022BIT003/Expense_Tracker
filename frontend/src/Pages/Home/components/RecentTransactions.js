import React from "react";
import moment from "moment";
import { ArrowUpIcon, ArrowDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { CATEGORY_COLORS } from "../config/categoryStyles";

const RecentTransactions = ({ transactions = [], onRefresh }) => {
    // Get the 5 most recent transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.75" />
                            <path d="M7 10h6M7 13h6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                        Recent Transactions
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Transactions are stacked by date (newest first)
                    </p>
                </div>
                <button
                    onClick={onRefresh}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                    title="Refresh"
                >
                    <ArrowPathIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Transaction List */}
            {recentTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-slate-500 font-medium">No recent transactions</p>
                    <p className="text-slate-400 text-sm">Start by adding your first transaction</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentTransactions.map((transaction) => {
                        const isIncome = transaction.transactionType === "credit";
                        const categoryClass = CATEGORY_COLORS[transaction.category] || "bg-slate-100 text-slate-700";

                        return (
                            <div
                                key={transaction._id}
                                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Icon */}
                                    <div className={`p-2.5 rounded-lg ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {isIncome ? (
                                            <ArrowDownIcon className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <ArrowUpIcon className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>

                                    {/* Transaction Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-slate-900 text-sm">{transaction.title}</p>
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryClass}`}>
                                                {transaction.category}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            {moment(transaction.date).format("MMM DD, YYYY")}
                                        </p>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className={`text-right font-semibold text-sm ${
                                    isIncome ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
