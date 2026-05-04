import React from "react";
import CircularProgressBar from "../../../components/CircularProgressBar";
import RecentTransactions from "./RecentTransactions";
import SpendingByCategory from "./SpendingByCategory";

const StatCard = ({ title, value, icon: Icon, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 border-blue-200",
        green: "bg-green-50 text-green-600 border-green-200",
        red: "bg-red-50 text-red-600 border-red-200",
        yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    };

    return (
        <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

const DashboardSection = ({
    balance,
    totalIncome,
    totalExpenses,
    savingsRate,
    periodLabel,
    frequency,
    setFrequency,
    transactions,
    onRefresh,
    expenseRatio,
}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Balance"
                    value={`₹${balance.toLocaleString()}`}
                    icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    )}
                    color={balance >= 0 ? "green" : "red"}
                />
                <StatCard
                    title="Total Income"
                    value={`₹${totalIncome.toLocaleString()}`}
                    icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    )}
                    color="green"
                />
                <StatCard
                    title="Total Expenses"
                    value={`₹${totalExpenses.toLocaleString()}`}
                    icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    )}
                    color="red"
                />
                <StatCard
                    title="Savings Rate"
                    value={`${savingsRate}%`}
                    icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    )}
                    color="blue"
                />
            </div>

            <div className="space-y-6 mb-6">
                <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-8 shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{periodLabel}</p>
                            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">₹{balance.toLocaleString()}</h2>
                            <p className="mt-3 text-slate-300 max-w-2xl leading-7">
                                This is your current net balance, calculated from all income and expenses in the selected period.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-4 md:w-auto">
                            {[
                                { value: "1", label: "Daily" },
                                { value: "7", label: "Weekly" },
                                { value: "month", label: "Monthly" },
                                { value: "all", label: "All Time" },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFrequency(option.value)}
                                    className={`rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                                        frequency === option.value
                                            ? "bg-white text-slate-900 shadow-lg"
                                            : "bg-white/10 text-slate-200 hover:bg-white/20"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                            <p className="text-sm text-slate-300">Income</p>
                            <p className="mt-4 text-3xl font-semibold text-white">₹{totalIncome.toLocaleString()}</p>
                            <p className="mt-2 text-sm text-slate-400">Total credits earned</p>
                        </div>
                        <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                            <p className="text-sm text-slate-300">Expenses</p>
                            <p className="mt-4 text-3xl font-semibold text-white">₹{totalExpenses.toLocaleString()}</p>
                            <p className="mt-2 text-sm text-slate-400">Total spending this period</p>
                        </div>
                        <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                            <p className="text-sm text-slate-300">Savings Rate</p>
                            <p className="mt-4 text-3xl font-semibold text-white">{savingsRate}%</p>
                            <p className="mt-2 text-sm text-slate-400">Share of income retained</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                    <RecentTransactions transactions={transactions} onRefresh={onRefresh} />
                    <div className="rounded-3xl bg-white shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Expense overview</h3>
                                <p className="text-sm text-slate-500">Proportion of spending vs income.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-semibold text-slate-900">{expenseRatio}%</p>
                                <p className="text-sm text-slate-500">of income</p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4">
                            <div className="flex-shrink-0">
                                <div className="bg-slate-900 rounded-full p-3 inline-flex">
                                    <CircularProgressBar percentage={Number(expenseRatio)} color="#0f172a" />
                                </div>
                            </div>
                            <div className="grid gap-4 flex-1">
                                <div className="rounded-3xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">Income</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">₹{totalIncome.toLocaleString()}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">Expenses</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">₹{totalExpenses.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <SpendingByCategory transactions={transactions} />
                </div>
            </div>
        </>
    );
};

export default DashboardSection;
