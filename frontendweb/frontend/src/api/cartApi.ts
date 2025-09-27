import api from "./api";

export const CartApi = {
    getCart: (id: number) => api.get(`/cart/${id}`),

    create: (table_number: number) => api.post("/cart", {table_number}),

    remove: (id: number) => api.delete(`/cart/${id}`),

    createItem: (cart_id: number, product_id: number, quantity: number) => api.post("/cart/items", {cart_id, product_id, quantity}),

    addItem: (id: number, quantity: number) => api.put(`/cart/items/${id}`, {quantity}),

    removeItem: (id: number) => api.delete(`/cart/items/${id}`),
}