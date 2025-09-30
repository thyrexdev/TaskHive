"use client";

import {useAuthStore} from "@/store/auth";
import {Task, useTaskStore} from "@/store/task";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {CheckCircle, Edit, LogOut, Plus, Trash, User} from "lucide-react";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

type TaskForm = Omit<Task, "_id">

const Dashboard = () => {
    const {user, fetchUser, accessToken, loading, logout} = useAuthStore();
    const {tasks, fetchTasks, deleteTask, createTask, updateTask} =
        useTaskStore();
    const router = useRouter();
    const [initialized, setInitialized] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        priority: "MEDIUM",
        deadline: "",
        completed: false,
    });
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            useAuthStore.setState({accessToken: token});
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized && accessToken && !user) {
            void fetchUser();
        }
    }, [initialized, accessToken, user, fetchUser]);

    useEffect(() => {
        if (initialized && !loading && !accessToken) {
            router.push("/login");
        }
    }, [initialized, loading, accessToken, router]);

    useEffect(() => {
        void fetchTasks();
    }, [fetchTasks]);

    if (!initialized || loading || (!user && accessToken)) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    const handleSubmit = async () => {
        if (editId) {
            await updateTask(editId, form);
        } else {
            await createTask(form);
        }
        setForm({title: "", description: "", priority: "MEDIUM", deadline: "", completed: false});
        setEditId(null);
        setShowForm(false);
    };

    const handleToggleCompleted = async (id: string, completed: boolean) => {
        await updateTask(id, {completed: !completed});
    };

    return (
        <div className="p-6">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => setShowForm(true)}
                        className="bg-[#6858D5] hover:bg-[#4B3BAA]"
                    >
                        <Plus className="mr-2 h-4 w-4"/> Add Task
                    </Button>

                    {/* Profile dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="/placeholder.png" alt="user"/>
                                <AvatarFallback>
                                    {user?.email?.[0].toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled>
                                <User className="mr-2 h-4 w-4"/> {user?.email}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout} className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4"/> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Table */}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="px-6 py-3 font-medium text-gray-600">Title</th>
                        <th className="px-6 py-3 font-medium text-gray-600">Priority</th>
                        <th className="px-6 py-3 font-medium text-gray-600">Deadline</th>
                        <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                        <th className="px-6 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <motion.tr
                            key={task._id}
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.2}}
                            className="border-t"
                        >
                            <td className="px-6 py-4">{task.title}</td>
                            <td className="px-6 py-4">
                  <span
                      className={`px-2 py-1 text-xs rounded-lg ${
                          task.priority === "HIGH"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                      }`}
                  >
                    {task.priority}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(task.deadline).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {task.completed ? (
                                    <span className="text-green-600 font-medium">Done</span>
                                ) : (
                                    <span className="text-gray-500">Pending</span>
                                )}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                                {!task.completed && (
                                    <Button
                                        onClick={() =>
                                            handleToggleCompleted(task._id, task.completed)
                                        }
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600"
                                    >
                                        <CheckCircle size={14} className="mr-1"/> Finish
                                    </Button>
                                )}
                                <Button
                                    onClick={() => {
                                        setForm({
                                            title: task.title,
                                            description: task.description,
                                            priority: task.priority,
                                            deadline: task.deadline ? task.deadline.split("T")[0] : "",
                                            completed: task.completed,
                                        });
                                        setEditId(task._id);
                                        setShowForm(true);
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600"
                                >
                                    <Edit size={14} className="mr-1"/> Edit
                                </Button>
                                <Button
                                    onClick={() => deleteTask(task._id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                >
                                    <Trash size={14} className="mr-1"/> Delete
                                </Button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Form (Dialog) */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editId ? "Edit Task" : "Add Task"}</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        className="mb-3"
                    />
                    <Textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        className="mb-3"
                    />
                    <Select
                        value={form.priority}
                        onValueChange={(val: "LOW" | "MEDIUM" | "HIGH") =>
                            setForm({...form, priority: val})
                        }
                    >
                        <SelectTrigger className="mb-3">
                            <SelectValue placeholder="Priority"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="LOW">Low</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => setForm({...form, deadline: e.target.value})}
                        className="mb-3"
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowForm(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#6858D5] hover:bg-[#4B3BAA]"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dashboard;
