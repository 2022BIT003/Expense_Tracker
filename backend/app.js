import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config({ path: "./.env" });
const app = express();

const port = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
    "http://localhost:8080",
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.send("Expense Tracker API is running...");
});

const server = app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`\n❌ Port ${port} is already in use.\n   Please close the other server or change the PORT in your .env file.\n`);
        process.exit(1);
    } else {
        throw err;
    }
});
