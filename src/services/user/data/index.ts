import { api } from "@/lib/api";
import { LoginCredentials, LoginResponse, RegisterData } from "../interface";

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const { data } = await api.post<LoginResponse>("/auth/login", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  localStorage.setItem("access_token", data.access_token);
  api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

  return data;
}

export async function registerUser(payload: RegisterData) {
  const { data } = await api.post("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}