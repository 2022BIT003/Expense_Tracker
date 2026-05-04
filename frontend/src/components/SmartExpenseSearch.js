import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { aiQueryAPI } from '../utils/ApiRequest';
import Spinner from './Spinner';

const SmartExpenseSearch = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(aiQueryAPI, { query });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Smart Expense Search</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., 'How much did I spend on food last month?'"
                    className="w-full px-5 py-4 pr-12 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    disabled={loading || !query.trim()}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-6 space-y-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed italic">
                           "{result.summary}"
                        </p>
                    </div>
                    {result.transactions?.length > 0 && (
                        <p className="text-xs text-slate-500 px-2">
                            Found {result.transactions.length} matching transactions.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SmartExpenseSearch;
