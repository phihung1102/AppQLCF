import api from "./api";
import { Product } from "../types/inđex";

export const ProductApi = {
    getAll: () => api.get<Product[]>("/product"),

    getProduct: (id: number) => api.get<Product[]>(`/product/${id}`),

    create: (name: string, price: number, status: string, category_id: number) =>
        api.post("/product", {name, price, status, category_id}),

    update: (id: number, name: string, price: number, category_id: number) =>
        api.put(`/product/${id}`, {name, price, category_id}),

    updateStatus: (id: number, status: string) => api.put(`/product/${id}/status`, {status}),

    remove: (id: number) => api.delete(`/product/${id}`),
}