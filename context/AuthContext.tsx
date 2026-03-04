import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "meme_kanseri_users";
const SESSION_KEY = "meme_kanseri_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      if (sessionData) {
        setUser(JSON.parse(sessionData));
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async (): Promise<Record<string, { password: string; user: User }>> => {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  };

  const register = async (fullName: string, email: string, password: string) => {
    const users = await getUsers();
    if (users[email]) {
      throw new Error("Bu e-posta adresi zaten kayıtlı.");
    }
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      fullName,
      email,
    };
    users[email] = { password, user: newUser };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const users = await getUsers();
    const entry = users[email];
    if (!entry || entry.password !== password) {
      throw new Error("E-posta veya şifre hatalı.");
    }
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
    setUser(entry.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isLoading, login, register, logout }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
