import { Request, Response } from "express";
import Task from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, deadline } = req.body;
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      priority,
      deadline,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};

export const getTaskByID = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, userId: req.user.id})
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error fetching task", error: err})
    }
}