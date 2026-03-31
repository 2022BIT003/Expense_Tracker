import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";

export const addTransactionController = async (req, res) => {
    try {
        const {
            title,
            amount,
            description,
            date,
            category,
            userId,
            transactionType,
        } = req.body;

        if (
            !title ||
            !amount ||
            !description ||
            !date ||
            !category ||
            !transactionType
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all fields",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        let newTransaction = await Transaction.create({
            title: title,
            amount: amount,
            category: category,
            description: description,
            date: date,
            user: userId,
            transactionType: transactionType,
        });

        user.transactions.push(newTransaction);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Transaction Added Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllTransactionController = async (req, res) => {
    try {
        const { userId, type, frequency, startDate, endDate } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const query = {
            user: userId,
        };

        if (type !== 'all') {
            query.transactionType = { $regex: new RegExp(`^${type}$`, "i") };
        }

        if (frequency !== 'all') {
            if (frequency === 'custom') {
                if (startDate && endDate) {
                    query.date = {
                        $gte: moment(startDate).startOf('day').toDate(),
                        $lte: moment(endDate).endOf('day').toDate(),
                    };
                }
            } else {
                let fromDate;
                if (frequency === 'month') {
                    fromDate = moment.utc().startOf('month').toDate();
                } else if (frequency === 'year') {
                    fromDate = moment.utc().startOf('year').toDate();
                } else {
                    fromDate = moment.utc().subtract(Number(frequency), "days").startOf('day').toDate();
                }

                query.date = {
                    $gte: fromDate,
                    $lte: moment.utc().endOf('day').toDate(),
                };
            }
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            transactions: transactions,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const deleteTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.body.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const transactionElement = await Transaction.findByIdAndDelete(
            transactionId
        );

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "transaction not found",
            });
        }

        const transactionArr = user.transactions.filter(
            (transaction) => transaction._id.toString() !== transactionId
        );

        user.transactions = transactionArr;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Transaction successfully deleted`,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const updateTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const { title, amount, description, date, category, transactionType } = req.body;

        const transactionElement = await Transaction.findById(transactionId);

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "transaction not found",
            });
        }

        if (title) transactionElement.title = title;
        if (description) transactionElement.description = description;
        if (amount) transactionElement.amount = amount;
        if (category) transactionElement.category = category;
        if (transactionType) transactionElement.transactionType = transactionType;
        if (date) transactionElement.date = date;

        await transactionElement.save();

        return res.status(200).json({
            success: true,
            message: `Transaction Updated Successfully`,
            transaction: transactionElement,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
