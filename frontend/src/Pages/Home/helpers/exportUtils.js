import * as XLSX from 'xlsx';
import moment from "moment";
import { toast } from "react-toastify";

export const handleExport = (transactions, filter = null, toastOptions) => {
    const exportTransactions = filter
        ? transactions.filter((t) =>
            filter === "credit"
                ? t.transactionType === "credit"
                : filter === "expense"
                    ? t.transactionType === "expense"
                    : true
        )
        : transactions;

    if (exportTransactions.length === 0) {
        toast.error("No transactions to export!", toastOptions);
        return;
    }

    const dataToExport = exportTransactions.map((t) => ({
        Date: moment(t.date).format("YYYY-MM-DD"),
        Title: t.title,
        Amount: t.amount,
        Type: t.transactionType === "credit" ? "Income" : "Expense",
        Category: t.category,
        Description: t.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.utils.sheet_add_aoa(worksheet, [["Date", "Title", "Amount", "Type", "Category", "Description"]], { origin: "A1" });
    XLSX.writeFile(workbook, `Expense_Tracker_Transactions_${moment().format("YYYY-MM-DD")}.xlsx`);
    toast.success("Transactions exported successfully", toastOptions);
};
