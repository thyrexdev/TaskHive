import mongoose from "mongoose";
import logger from "./utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("✅ MongoDB connected successfully");
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
