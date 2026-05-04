import React from "react";
import TableData from "./TableData";
import {
    TRANSACTION_CATEGORIES,
    TRANSACTION_FILTER_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from "../config/transactionOptions";

const TransactionsSection = ({
    values,
    handleChange,
    handleSubmit,
    transactionFilter,
    setTransactionFilter,
    handleExport,
    showTransactionFilters,
    setShowTransactionFilters,
    filteredTransactions,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    filterCategory,
    setFilterCategory,
    filterAmountMin,
    setFilterAmountMin,
    filterAmountMax,
    setFilterAmountMax,
    onRefresh,
}) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex flex-col gap-6 p-6 lg:p-8">
                <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Transaction</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Salary, Rent, Food"
                                value={values.title}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="₹0"
                                    value={values.amount}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Category</label>
                            <select
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                            >
                                <option value="">Choose category</option>
                                {TRANSACTION_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Type</label>
                            <select
                                name="transactionType"
                                value={values.transactionType}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                            >
                                <option value="">Choose type</option>
                                {TRANSACTION_TYPE_OPTIONS.map((typeOption) => (
                                    <option key={typeOption.value} value={typeOption.value}>
                                        {typeOption.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
                            <textarea
                                name="description"
                                placeholder="Add a note"
                                value={values.description}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                                rows={4}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                        >
                            Add Transaction
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">Transaction History</h3>
                            <p className="text-sm text-slate-500">Filtered by the current transaction view and search filters.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowTransactionFilters((prev) => !prev)}
                                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                    showTransactionFilters
                                        ? "bg-slate-900 text-white"
                                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                                }`}
                            >
                                {showTransactionFilters ? "Hide Filters" : "Filters"}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleExport(transactionFilter === "all" ? null : transactionFilter)}
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                            >
                                Export
                            </button>
                            <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                                {filteredTransactions.length} records
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-5">
                        {TRANSACTION_FILTER_OPTIONS.map((option) => (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => setTransactionFilter(option.key)}
                                className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                                    transactionFilter === option.key
                                        ? "bg-slate-900 text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    {showTransactionFilters && (
                        <div className="rounded-3xl bg-white p-5 border border-slate-200 mb-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Start date</label>
                                    <input
                                        type="date"
                                        value={filterStartDate}
                                        onChange={(e) => setFilterStartDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">End date</label>
                                    <input
                                        type="date"
                                        value={filterEndDate}
                                        onChange={(e) => setFilterEndDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Category</label>
                                    <input
                                        type="text"
                                        placeholder="Search category"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">Min amount</label>
                                        <input
                                            type="number"
                                            placeholder="₹0"
                                            value={filterAmountMin}
                                            onChange={(e) => setFilterAmountMin(e.target.value)}
                                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">Max amount</label>
                                        <input
                                            type="number"
                                            placeholder="₹0"
                                            value={filterAmountMax}
                                            onChange={(e) => setFilterAmountMax(e.target.value)}
                                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilterStartDate("");
                                        setFilterEndDate("");
                                        setFilterCategory("");
                                        setFilterAmountMin("");
                                        setFilterAmountMax("");
                                    }}
                                    className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                                >
                                    Reset filters
                                </button>
                            </div>
                        </div>
                    )}
                    <TableData data={filteredTransactions} onRefresh={onRefresh} />
                </div>
            </div>
        </div>
    );
};

export default TransactionsSection;
