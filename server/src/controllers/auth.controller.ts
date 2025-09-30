import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import { generateToken } from "../utils/generateToken";
import { RefreshToken } from "../models/refreshToken.model";
import { PasswordResetToken } from "../models/passwordResetToken.model";

import crypto from "crypto";
import logger from "../utils/logger";
import { error } from "console";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString(), "15m");
    const refreshToken = crypto.randomUUID();
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    res.status(201).json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    logger.error("❌ Auth error:", err);
    res
      .status(500)
      .json({ message: "Server error", error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString(), "15m");

    await RefreshToken.deleteMany({ userId: user._id });

    const refreshToken = crypto.randomUUID();
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if(!userId){
      return res.status(401).json({message: "Unauthorized"})
    }
    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({user})
  }catch(err){
    res.status(500).json({ message: "Server error", error: err})
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    await RefreshToken.deleteOne({ token: refreshToken });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ messsage: "No refresh token provided" });

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken)
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });

    if (storedToken.expiresAt && storedToken.expiresAt < new Date()) {
      await storedToken.deleteOne();
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const token = generateToken(storedToken.userId.toString(), "15m");

    res.status(200).json({ token });
  } catch (err) {
  logger.error("❌ Auth error:", err); 
  res.status(500).json({ 
    message: "Server error", 
    error: (err as Error).message 
  });
}
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ verify old password
    const isPasswordValid = await argon2.verify(user.password, oldPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // ✅ hash new password
    user.password = await argon2.hash(newPassword);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    logger.error("❌ Change password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // delete old reset tokens for same user
    await PasswordResetToken.deleteMany({ userId: user._id });

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    await PasswordResetToken.create({
      userId: user._id,
      token: resetToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 mins
    });

    // هنا تبعت الإيميل (إحنا هنطبع في الـ console مؤقتاً)
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&id=${user._id}`;
    logger.info("🔗 Password reset link:", resetLink);

    res.json({ message: "Reset link sent to your email (check console for demo)" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { userId, token, newPassword } = req.body;

    const passwordResetToken = await PasswordResetToken.findOne({ 
      userId, token 
    });
    if (!passwordResetToken) return res.status(400).json({ message: "Invalid token" });

    if (passwordResetToken.expiresAt < new Date()) {
      await passwordResetToken.deleteOne();
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await argon2.hash(newPassword);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    await passwordResetToken.deleteOne();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};