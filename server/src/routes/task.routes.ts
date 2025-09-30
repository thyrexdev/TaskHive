import { Router } from "express";
import { requireUser } from "../middlewares/requireUser.middleware";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

// ✅ Create task
router.post("/", requireUser, createTask);

// 📌 Get all user tasks
router.get("/", requireUser, getTasks);

// ✏️ Update task
router.put("/:id", requireUser, updateTask);
// ❌ Delete task
router.delete("/:id", requireUser, deleteTask);

export default router;
