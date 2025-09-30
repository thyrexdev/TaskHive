import { Router } from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  me,
} from "../controllers/auth.controller";
import rateLimit from "express-rate-limit";
import { authMiddleware } from "../middlewares/auth.middleware";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 5, // بس 5 محاولات
  message: { message: "Too many login attempts, try again later." },
});

const router = Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", authMiddleware, me)
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", authMiddleware , changePassword)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
