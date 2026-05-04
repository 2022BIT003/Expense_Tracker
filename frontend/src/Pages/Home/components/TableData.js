import React, { useState } from "react";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTransactions, editTransactions } from "../../../utils/ApiRequest";
import axios from "../../../utils/axiosInstance";
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPE_OPTIONS } from "../config/transactionOptions";

const TableData = ({ data = [], onRefresh }) => {
    const [show, setShow] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [currId, setCurrId] = useState(null);

    const handleEditClick = (itemKey) => {
        if (data.length > 0) {
            const editTran = data.filter((item) => item._id === itemKey);
            setCurrId(itemKey);
            setEditingTransaction(editTran);
            handleShow();
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.put(`${editTransactions}/${currId}`, {
            ...values,
        });

        if (data.success === true) {
            handleClose();
            onRefresh?.();
        }
    };

    const handleDeleteClick = async (itemKey) => {
        const { data } = await axios.delete(`${deleteTransactions}/${itemKey}`);

        if (data.success === true) {
            onRefresh?.();
        }
    };

    const [values, setValues] = useState({
        title: "",
        amount: "",
        description: "",
        category: "",
        date: "",
        transactionType: "",
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="min-w-full text-sm text-slate-700">
                        <thead>
                            <tr className="bg-slate-50 text-left">
                                <th className="px-4 py-3 font-semibold text-slate-600">Date</th>
                                <th className="px-4 py-3 font-semibold text-slate-600">Title</th>
                                <th className="px-4 py-3 font-semibold text-slate-600">Amount</th>
                                <th className="px-4 py-3 font-semibold text-slate-600">Type</th>
                                <th className="px-4 py-3 font-semibold text-slate-600">Category</th>
                                <th className="px-4 py-3 font-semibold text-slate-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className="border-t border-slate-100">
                                    <td className="px-4 py-3">{moment(item.date).format("YYYY-MM-DD")}</td>
                                    <td className="px-4 py-3">{item.title}</td>
                                    <td className="px-4 py-3">₹{item.amount}</td>
                                    <td className="px-4 py-3 capitalize">{item.transactionType}</td>
                                    <td className="px-4 py-3">{item.category}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                                onClick={() => handleEditClick(item._id)}
                                                title="Edit transaction"
                                            >
                                                <EditNoteIcon sx={{ fontSize: 16 }} />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                                                onClick={() => handleDeleteClick(item._id)}
                                                title="Delete transaction"
                                            >
                                                <DeleteForeverIcon sx={{ fontSize: 16 }} />
                                                Delete
                                            </button>

                                            {editingTransaction ? (
                                                <>
                                                    {show && (
                                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                                                            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                                                                <div className="mb-4 flex items-center justify-between">
                                                                    <h3 className="text-lg font-semibold text-slate-900">Update Transaction Details</h3>
                                                                    <button type="button" className="text-slate-500 hover:text-slate-700" onClick={handleClose}>x</button>
                                                                </div>
                                                                <form className="space-y-3" onSubmit={handleEditSubmit}>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                                                                        <input
                                                                            name="title"
                                                                            type="text"
                                                                            placeholder={editingTransaction[0].title}
                                                                            value={values.title}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
                                                                        <input
                                                                            name="amount"
                                                                            type="number"
                                                                            placeholder={editingTransaction[0].amount}
                                                                            value={values.amount}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                                                                        <select
                                                                            name="category"
                                                                            value={values.category}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        >
                                                                            <option value="">{editingTransaction[0].category}</option>
                                                                            {TRANSACTION_CATEGORIES.map((category) => (
                                                                                <option key={category} value={category}>
                                                                                    {category}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                                                                        <input
                                                                            type="text"
                                                                            name="description"
                                                                            placeholder={editingTransaction[0].description}
                                                                            value={values.description}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Transaction Type</label>
                                                                        <select
                                                                            name="transactionType"
                                                                            value={values.transactionType}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        >
                                                                            <option value={editingTransaction[0].transactionType}>{editingTransaction[0].transactionType === "credit" ? "Income" : "Expense"}</option>
                                                                            {TRANSACTION_TYPE_OPTIONS.map((typeOption) => (
                                                                                <option key={typeOption.value} value={typeOption.value}>
                                                                                    {typeOption.label}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
                                                                        <input
                                                                            type="date"
                                                                            name="date"
                                                                            value={values.date}
                                                                            onChange={handleChange}
                                                                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4 flex justify-end gap-3">
                                                                        <button type="button" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" onClick={handleClose}>
                                                                            Close
                                                                        </button>
                                                                        <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                                                                            Submit
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </>
    );
};

export default TableData;
