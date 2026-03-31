import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController } from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/addTransaction").post(protect, addTransactionController);
router.route("/getTransaction").post(protect, getAllTransactionController);
router.route("/deleteTransaction/:id").post(protect, deleteTransactionController);
router.route('/updateTransaction/:id').put(protect, updateTransactionController);

export default router;