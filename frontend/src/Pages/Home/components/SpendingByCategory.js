import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const SpendingByCategory = ({ transactions = [] }) => {
    const groupTransactionsByCategory = (list, type) =>
        list
            .filter((t) => t.transactionType === type)
            .reduce((acc, t) => {
                const existing = acc.find((item) => item.name === t.category);
                if (existing) {
                    existing.value += t.amount;
                } else {
                    acc.push({ name: t.category, value: t.amount });
                }
                return acc;
            }, [])
            .sort((a, b) => b.value - a.value);

    const expensesByCategory = groupTransactionsByCategory(transactions, "expense");
    const incomeByCategory = groupTransactionsByCategory(transactions, "credit");

    const totalExpenses = expensesByCategory.reduce((sum, item) => sum + item.value, 0);
    const totalIncome = incomeByCategory.reduce((sum, item) => sum + item.value, 0);

    // Color palette
    const COLORS = [
        "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
        "#ec4899", "#14b8a6", "#6366f1", "#f97316", "#06b6d4"
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Spending by Category
                </h3>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-blue-900">₹{totalIncome.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                    <p className="text-xs text-red-600 font-medium mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-900">₹{totalExpenses.toLocaleString()}</p>
                </div>
            </div>

            {/* Content */}
            {expensesByCategory.length === 0 && incomeByCategory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-slate-500 font-medium">No data available</p>
                    <p className="text-slate-400 text-sm">Add transactions to see spending breakdown</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Expenses Breakdown */}
                    {expensesByCategory.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-4">Expenses Breakdown</h4>
                            <div className="h-64 -mx-6 px-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expensesByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {expensesByCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => `₹${value.toLocaleString()}`}
                                            contentStyle={{
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "8px",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            formatter={(value, entry) => {
                                                const percentage = ((entry.payload.value / totalExpenses) * 100).toFixed(1);
                                                return `${value} (${percentage}%)`;
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Expenses List */}
                            <div className="space-y-2 mt-4">
                                {expensesByCategory.map((item, index) => {
                                    const percentage = ((item.value / totalExpenses) * 100).toFixed(1);
                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                />
                                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-slate-900">₹{item.value.toLocaleString()}</p>
                                                <p className="text-xs text-slate-500">{percentage}%</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Income Breakdown */}
                    {incomeByCategory.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-700 mb-4">Income Breakdown</h4>
                            <div className="space-y-2">
                                {incomeByCategory.map((item, index) => {
                                    const percentage = ((item.value / totalIncome) * 100).toFixed(1);
                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                />
                                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-slate-900">₹{item.value.toLocaleString()}</p>
                                                <p className="text-xs text-slate-500">{percentage}%</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SpendingByCategory;
