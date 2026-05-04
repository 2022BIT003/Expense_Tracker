export const calculateStats = (transactions) => {
    const totalIncome = transactions
        .filter((t) => t.transactionType === "credit")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.transactionType === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;
    const expenseRatio = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(0) : 0;

    return {
        totalIncome,
        totalExpenses,
        balance,
        savingsRate,
        expenseRatio
    };
};

export const getFilteredTransactions = (transactions, filters) => {
    const {
        transactionFilter,
        filterCategory,
        filterStartDate,
        filterEndDate,
        filterAmountMin,
        filterAmountMax
    } = filters;

    return transactions.filter((t) => {
        const matchesType =
            transactionFilter === "all"
                ? true
                : transactionFilter === "credit"
                    ? t.transactionType === "credit"
                    : t.transactionType === "expense";
        const matchesCategory = filterCategory
            ? t.category.toLowerCase().includes(filterCategory.toLowerCase())
            : true;
        const matchesStartDate = filterStartDate
            ? new Date(t.date) >= new Date(filterStartDate)
            : true;
        const matchesEndDate = filterEndDate
            ? new Date(t.date) <= new Date(filterEndDate)
            : true;
        const matchesAmountMin = filterAmountMin ? t.amount >= Number(filterAmountMin) : true;
        const matchesAmountMax = filterAmountMax ? t.amount <= Number(filterAmountMax) : true;
        return (
            matchesType &&
            matchesCategory &&
            matchesStartDate &&
            matchesEndDate &&
            matchesAmountMin &&
            matchesAmountMax
        );
    });
};
