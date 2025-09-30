import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  userId: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline?: Date;
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "LOW" },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
