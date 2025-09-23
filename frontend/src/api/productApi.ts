import api from "./api";

export const ProductApi = {
    getAll: () => api.get("/product"),

    getProduct: (id: number) => api.get(`/product/${id}`),

    create: (name: string, price: number, status: string, category_id: number, imageUri: string) =>
        api.post("/product", {name, price, status, category_id, imageUri}),

    update: (id: number, name: string, price: number, status: string, category_id: number, imageUri: string) =>
        api.put(`/product/${id}`, {name, price, status, category_id, imageUri}),

    remove: (id: number) => api.delete(`/product/${id}`),
}