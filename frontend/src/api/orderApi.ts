import api from "./api";

type OrderItem = {
    product_id: number;
    quantity: number;
    unit_price: number;
}

export const OrderApi = {
    getAll: () => api.get("/order"),

    getOrder: (id: number) => api.get(`/order/${id}`),

    create: (table_number: number, note: string, status: string, items: OrderItem[]) =>
        api.post("/order", {table_number, note, status, items}),

    update: (id: number, status: string) => api.put(`/order/${id}`, {status}),

    remove: (id: number) => api.delete(`/order/${id}`),
}