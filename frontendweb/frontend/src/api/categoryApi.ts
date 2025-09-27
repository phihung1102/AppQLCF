import api from "./api";

export const CategoryApi = {
  getAll: () => api.get("/category"),

  getCategory: (id: number) => api.get(`/category/${id}`),

  create: (name: string) => api.post("/category", { name }),

  update: (id: number, name: string) => api.put(`/category/${id}`, { name }),

  remove: (id: number) => api.delete(`/category/${id}`),
};
