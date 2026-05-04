import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController } from '../controllers/transaction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/addTransaction").post(protect, addTransactionController);
router.route("/getTransaction").post(protect, getAllTransactionController);
router.route("/deleteTransaction/:id").delete(protect, deleteTransactionController);
router.route('/updateTransaction/:id').put(protect, updateTransactionController);

export default router;