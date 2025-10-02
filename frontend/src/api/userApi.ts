import api from "./api";

export const UserApi = {
    getAll: () => api.get("/user"),

    getUserById: (id: number) => api.get(`/user/${id}`),

    create: (name: string, email: string, password: string, role?: string) =>
        api.post("/user", {name, email, password, role}),
    
    updateRole: (id: number, role: string) =>
        api.put(`/user/${id}/role`, {role}),

    updateInfoStaff: (id: number, fullname: string, phone: string, gender: string, address: string) =>
        api.put(`user/${id}/info`, {fullname, phone, gender, address})
        .then(res => res.data),

    remove: (id: number) => api.delete(`/user/${id}`),
};