import React from "react";
import { Container, Row } from "react-bootstrap";
import LineProgressBar from "../../components/LineProgressBar";
import UnifiedDoughnutChart from "../../components/UnifiedDoughnutChart";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Analytics = ({ transactions }) => {
    const TotalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(
        (item) => item.transactionType === "credit"
    );
    const totalExpenseTransactions = transactions.filter(
        (item) => item.transactionType === "expense"
    );

    let totalIncomePercent =
        (totalIncomeTransactions.length / TotalTransactions) * 100;
    let totalExpensePercent =
        (totalExpenseTransactions.length / TotalTransactions) * 100;

    // console.log(totalIncomePercent, totalExpensePercent);

    const totalTurnOver = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalTurnOverIncome = transactions
        .filter((item) => item.transactionType === "credit")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalTurnOverExpense = transactions
        .filter((item) => item.transactionType === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;
    const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

    const categories = [
        "Groceries",
        "Rent",
        "Salary",
        "Tip",
        "Food",
        "Medical",
        "Utilities",
        "Entertainment",
        "Transportation",
        "Other",
    ];

    const colors = {
        "Groceries": '#FF6384',
        "Rent": '#36A2EB',
        "Salary": '#FFCE56',
        "Tip": '#4BC0C0',
        "Food": '#9966FF',
        "Medical": '#FF9F40',
        "Utilities": '#8AC926',
        "Entertainment": '#6A4C93',
        "Transportation": '#1982C4',
        "Other": '#F45B69',
    };



    return (
        <>
            <Container className="mt-5 mb-5">
                <Row>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100 analytics-card">
                            <div className="card-header analytics-header">
                                Total Transactions: <span className="ms-2 text-white">{TotalTransactions}</span>
                            </div>
                            <div className="card-body px-4 py-4">
                                <div className="analytics-summary-item mb-3">
                                    <span className="summary-label text-success">Income</span>
                                    <div className="summary-value d-flex align-items-center">
                                        <ArrowDropUpIcon className="text-success" sx={{ fontSize: 24 }} />
                                        <span className="ms-1">{totalIncomeTransactions.length}</span>
                                    </div>
                                </div>

                                <div className="analytics-summary-item">
                                    <span className="summary-label text-danger">Expense</span>
                                    <div className="summary-value d-flex align-items-center">
                                        <ArrowDropDownIcon className="text-danger" sx={{ fontSize: 24 }} />
                                        <span className="ms-1">{totalExpenseTransactions.length}</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <UnifiedDoughnutChart
                                        incomePercent={totalIncomePercent}
                                        expensePercent={totalExpensePercent}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100 analytics-card">
                            <div className="card-header analytics-header">
                                Total TurnOver: <span className="ms-2 text-white">{totalTurnOver} ₹</span>
                            </div>
                            <div className="card-body px-4 py-4">
                                <div className="analytics-summary-item mb-3">
                                    <span className="summary-label text-success">Income</span>
                                    <div className="summary-value d-flex align-items-center">
                                        <ArrowDropUpIcon className="text-success" sx={{ fontSize: 24 }} />
                                        <span className="ms-1">{totalTurnOverIncome} <CurrencyRupeeIcon sx={{ fontSize: 14 }} /></span>
                                    </div>
                                </div>

                                <div className="analytics-summary-item">
                                    <span className="summary-label text-danger">Expense</span>
                                    <div className="summary-value d-flex align-items-center">
                                        <ArrowDropDownIcon className="text-danger" sx={{ fontSize: 24 }} />
                                        <span className="ms-1">{totalTurnOverExpense} <CurrencyRupeeIcon sx={{ fontSize: 14 }} /></span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <UnifiedDoughnutChart
                                        incomePercent={TurnOverIncomePercent}
                                        expensePercent={TurnOverExpensePercent}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100 analytics-card">
                            <div className="card-header analytics-header">
                                Categorywise Income
                            </div>
                            <div className="card-body px-4 py-4 scroll-area">
                                {categories.map((category, idx) => {
                                    const income = transactions.filter(transaction => transaction.transactionType === "credit" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                                    const incomePercent = (income / totalTurnOver) * 100;

                                    return (
                                        <React.Fragment key={idx}>
                                            {income > 0 &&
                                                (<LineProgressBar label={category} percentage={incomePercent.toFixed(0)} lineColor={colors[category]} />)
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100 analytics-card">
                            <div className="card-header analytics-header">
                                Categorywise Expense
                            </div>
                            <div className="card-body px-4 py-4 scroll-area">
                                {categories.map((category, idx) => {
                                    const expenses = transactions.filter(transaction => transaction.transactionType === "expense" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                                    const expensePercent = (expenses / totalTurnOver) * 100;

                                    return (
                                        <React.Fragment key={idx}>
                                            {expenses > 0 &&
                                                (<LineProgressBar label={category} percentage={expensePercent.toFixed(0)} lineColor={colors[category]} />)
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Analytics;
