import api from "./api";

export const ProductApi = {
    getAll: () => api.get("/product"),

    getProduct: (id: number) => api.get(`/product/${id}`),

    create: (name: string, price: number, status: string, category_id: number) =>
        api.post("/product", {name, price, status, category_id}),

    update: (id: number, name: string, price: number, status: string, category_id: number) =>
        api.put(`/product/${id}`, {name, price, status, category_id}),

    remove: (id: number) => api.delete(`/product/${id}`),
}