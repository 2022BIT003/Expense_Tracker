import React, { useState, useRef } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { aiScanReceiptAPI } from '../utils/ApiRequest';
import { toast } from 'react-toastify';

const ReceiptScanner = ({ onDataExtracted, toastOptions }) => {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file", toastOptions);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        try {
            const { data } = await axiosInstance.post(aiScanReceiptAPI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                onDataExtracted(data.data);
                toast.success("Receipt scanned successfully!", toastOptions);
            } else {
                toast.error(data.message || "Failed to scan receipt", toastOptions);
            }
        } catch (err) {
            console.error("Scan error:", err);
            toast.error(err.response?.data?.message || "Error scanning receipt", toastOptions);
        } finally {
            setLoading(false);
            // Clear input so same file can be uploaded again
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="mb-6">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {loading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                        Scanning Receipt...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Smart Receipt Scanner
                    </>
                )}
            </button>
            <p className="mt-2 text-[10px] text-center text-slate-400 uppercase tracking-widest font-medium">
                Auto-fill form from image
            </p>
        </div>
    );
};

export default ReceiptScanner;
