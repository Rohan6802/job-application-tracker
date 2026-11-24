import axios from "axios";

const AUTH_URL = "http://localhost:5000/api/auth";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_URL}/register`, data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_URL}/login`, data);
  return response.data;
};
