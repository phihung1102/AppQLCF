import api from "./api";

export const UserApi = {
    getAll: () => api.get("/user"),

    create: (name: string, email: string, password: string, role?: string) =>
        api.post("/user", {name, email, password, role}),
    
    updateRole: (id: number, role: string) =>
        api.put(`/user/${id}/role`, {role}),

    remove: (id: number) => api.delete(`/user/${id}`),
};