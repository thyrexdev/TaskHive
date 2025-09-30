import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const PasswordResetToken = mongoose.model<IPasswordResetToken>(
  "PasswordResetToken",
  passwordResetTokenSchema
);
