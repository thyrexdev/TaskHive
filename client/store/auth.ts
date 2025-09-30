"use client";

import {create} from "zustand";
import axios from "axios";

type User = {
    _id: string;
    email: string;
    username?: string;
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    fetchUser: () => Promise<void>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: `${API_URL}/auth`,
    withCredentials: true,
});

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({loading: true, error: null});
        try {
            const {data} = await api.post("/login", {email, password});

            set({accessToken: data.token});
            localStorage.setItem("accessToken", data.token);

            await get().fetchUser();
        } catch (err: any) {
            set({error: err.response?.data?.message || "Login failed"});
            throw err;
        } finally {
            set({loading: false});
        }
    },

    register: async (username, email, password) => {
        set({loading: true, error: null});
        try {
            const {data} = await api.post("/register", {username, email, password});

            set({accessToken: data.token});
            localStorage.setItem("accessToken", data.token);

            await get().fetchUser();
        } catch (err: any) {
            set({error: err.response?.data?.message || "Register failed"});
            throw err;
        } finally {
            set({loading: false});
        }
    },

    logout: async () => {
        set({loading: true, error: null});
        try {
            await api.post("/logout");
            localStorage.removeItem("accessToken");
            set({user: null, accessToken: null});
        } catch (err: any) {
            set({error: err.response?.data?.message || "Logout failed"});
        } finally {
            set({loading: false});
        }
    },

    refreshToken: async () => {
        try {
            const {data} = await api.post("/refresh-token");
            set({accessToken: data.token});
            localStorage.setItem("accessToken", data.token);
        } catch {
            set({user: null, accessToken: null});
        }
    },

    fetchUser: async () => {
        const {accessToken} = get();
        if (!accessToken) return;

        try {
            const {data} = await api.get("/me", {
                headers: {Authorization: `Bearer ${accessToken}`},
            });
            set({user: data.user});
        } catch {
            set({user: null});
        }
    },
}));
