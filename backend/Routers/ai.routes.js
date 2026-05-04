import express from "express";
import { queryTransactions, scanReceipt } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/query", protect, queryTransactions);
router.post("/scan-receipt", protect, upload.single("image"), scanReceipt);

export default router;
