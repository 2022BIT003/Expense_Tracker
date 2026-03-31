import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const db = process.env.MONGO_URL;
        const { connection } = await mongoose.connect(db);
        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}