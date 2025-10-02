import { api } from "./apiPublic";

export interface Product {
    id: number;
    name: string;
    price: number;
    status: "available" | "unavailable";
    category_id: number;
    category_name?: string;
    image?: {id: number; url: string} | null;
}

export const ProductApi = {
    getAvailable: () => 
        api.get<Product[]>("/product/status"),
    getById: (id: number) => 
        api.get<Product[]>(`/product/${id}`),
}

