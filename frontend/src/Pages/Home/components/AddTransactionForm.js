import React from "react";
import ReceiptScanner from "../../../components/ReceiptScanner";
import {
    TRANSACTION_CATEGORIES,
    TRANSACTION_TYPE_OPTIONS,
} from "../config/transactionOptions";

const AddTransactionForm = ({
    values,
    handleChange,
    handleSubmit,
    handleReceiptData,
    toastOptions,
}) => {
    return (
        <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Transaction</h3>
            
            <ReceiptScanner 
                onDataExtracted={handleReceiptData} 
                toastOptions={toastOptions} 
            />

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
    );
};

export default AddTransactionForm;
