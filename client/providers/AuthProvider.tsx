"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // fetch user on mount (لو عندك توكين محفوظ في الذاكرة)
  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        setUser(data?.user || null);
      } catch (err) {
        setUser(null);
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [accessToken]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      setAccessToken(data.token);
      localStorage.setItem("accessToken", data.token);
      setUser({ id: data._id, email: data.email });
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiFetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
    } catch (err: any) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
