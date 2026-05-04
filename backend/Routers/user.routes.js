import express from 'express';
import { setAvatarController, updateProfileController, getProfileController } from '../controllers/user.controller.js';
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/setAvatar/:id").post(protect, setAvatarController);
router.route("/profile").get(protect, getProfileController).put(protect, updateProfileController);

export default router;