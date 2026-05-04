import { createClerkClient } from "@clerk/clerk-sdk-node";
import User from "../models/user.model.js";

let clerkClient;

const getClerkClient = () => {
    if (!clerkClient) {
        clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerkClient;
};

export const protect = async (req, res, next) => {
    let token;
    const client = getClerkClient();

    if (!process.env.CLERK_SECRET_KEY) {
        console.error("CRITICAL: CLERK_SECRET_KEY is not defined in .env");
        return res.status(500).json({
            success: false,
            message: "Server configuration error (API Key missing)",
        });
    }

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token with Clerk
            const clientState = await client.verifyToken(token);
            const clerkId = clientState.sub;

            // 1. Try to find user by clerkId
            let user = await User.findOne({ clerkId });

            if (!user) {
                // Fetch full user details from Clerk
                const clerkUser = await client.users.getUser(clerkId);
                const email = clerkUser.emailAddresses[0]?.emailAddress;

                // 2. Try to find user by email (in case they existed before Clerk migration)
                if (email) {
                    user = await User.findOne({ email });
                }

                if (user) {
                    // Update existing user with clerkId
                    user.clerkId = clerkId;
                    if (!user.avatarImage && clerkUser.imageUrl) {
                        user.avatarImage = clerkUser.imageUrl;
                        user.isAvatarImageSet = true;
                    }
                    await user.save();
                } else {
                    // 3. Create new user if not found by clerkId or email
                    user = await User.create({
                        clerkId,
                        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
                        email: email,
                        isAvatarImageSet: !!clerkUser.imageUrl,
                        avatarImage: clerkUser.imageUrl || "",
                    });
                }
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Clerk Auth Error:", error);
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed",
                debug: error.message
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token",
        });
    }
};
