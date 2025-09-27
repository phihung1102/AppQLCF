import api from "./api";

export const AuthAPI = {
  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }),

  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  logout: (refreshToken: string) =>
    api.post("/auth/logout", { refreshToken }),

  refresh: (refreshToken: string) =>
    api.post("/auth/refresh", { refreshToken }),
};