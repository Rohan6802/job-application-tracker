import { useState, type ReactNode } from "react";
import {
  loginUser,
  registerUser,
  type AuthUser,
  type LoginData,
  type RegisterData,
} from "../services/authService";
import { AuthContext } from "./AuthContextDef";

const STORAGE_KEY = "job_tracker_auth";

interface StoredAuth {
  token: string;
  user: AuthUser;
}

const getStoredAuth = (): StoredAuth | null => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("token" in parsed) ||
      typeof parsed.token !== "string" ||
      !("user" in parsed) ||
      typeof parsed.user !== "object" ||
      parsed.user === null ||
      !("id" in parsed.user) ||
      typeof parsed.user.id !== "string" ||
      !("name" in parsed.user) ||
      typeof parsed.user.name !== "string" ||
      !("email" in parsed.user) ||
      typeof parsed.user.email !== "string"
    ) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed as StoredAuth;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<StoredAuth | null>(getStoredAuth);

  const saveAuth = (data: StoredAuth) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAuth(data);
  };

  const login = async (data: LoginData): Promise<void> => {
    const response = await loginUser(data);

    saveAuth({
      token: response.token,
      user: response.user,
    });
  };

  const register = async (data: RegisterData): Promise<void> => {
    const response = await registerUser(data);

    saveAuth({
      token: response.token,
      user: response.user,
    });
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user ?? null,
        token: auth?.token ?? null,
        isAuthenticated: Boolean(auth?.token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
