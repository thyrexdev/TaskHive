// store/task.ts
"use client";
import { create } from "zustand";
import { useAuthStore } from "./auth";
import axios from "axios";

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline: string;
  completed: boolean
};

type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  getTaskById: (id: string) => Promise<Task | null>;
  createTask: (task: Omit<Task, "_id">) => Promise<Task | null>;
  updateTask: (id: string, task: Partial<Task>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/tasks`,
  withCredentials: true,
});

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // ✅ Get all tasks
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().accessToken;
      const { data } = await api.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: data });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.message || "Error fetching tasks" });
      } else {
        set({ error: "Unexpected error" });
      }
    } finally {
      set({ loading: false });
    }
  },

  // 🔍 Get single task by ID
  getTaskById: async (id) => {
    try {
      const token = useAuthStore.getState().accessToken;
      const { data } = await api.get(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // ➕ Create task
  createTask: async (task) => {
    try {
      const token = useAuthStore.getState().accessToken;
      const { data } = await api.post("/", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: [...get().tasks, data] });
      return data;
    } catch (err) {
      console.error(err);
      set({ error: "Error creating task" });
      return null;
    }
  },

  // ✏️ Update task
  updateTask: async (id, task) => {
    try {
      const token = useAuthStore.getState().accessToken;
      const { data } = await api.put(`/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: get().tasks.map((t) => (t._id === id ? data : t)) });
      return data;
    } catch (err) {
      console.error(err);
      set({ error: "Error updating task" });
      return null;
    }
  },

  // ❌ Delete task
  deleteTask: async (id) => {
    try {
      const token = useAuthStore.getState().accessToken;
      await api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: get().tasks.filter((t) => t._id !== id) });
      return true;
    } catch (err) {
      console.error(err);
      set({ error: "Error deleting task" });
      return false;
    }
  },
}));
