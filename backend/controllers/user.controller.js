import User from "../models/user.model.js";

const sanitizeUser = (userDoc) => {
    const user = userDoc.toObject();
    delete user.password;
    return user;
};

export const getProfileController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: sanitizeUser(user),
        });
    } catch (err) {
        next(err);
    }
};

export const setAvatarController = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();

        const imageData = req.body.image;

        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: imageData,
        },
            { new: true });

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });


    } catch (err) {
        next(err);
    }
};

export const updateProfileController = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: name.trim() },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: sanitizeUser(updatedUser),
        });
    } catch (err) {
        next(err);
    }
};