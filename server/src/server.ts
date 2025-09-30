import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import taskRoutes from "./routes/task.routes";
import logger from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use((err: any, req: Request, res: Response, next: any) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("server is healthy and running perfectly");
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", authMiddleware, taskRoutes);

app.use(errorHandler);
export default app;
