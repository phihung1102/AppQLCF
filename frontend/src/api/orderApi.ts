import api from "./api";
import { Order, OrderItem, OrderFilterParams } from "../types/inđex";

export const OrderApi = {
  getAll: (params?: {
    table_number?: number;
    user_id?: number;
    fromDate?: string; // YYYY-MM-DD
    toDate?: string;   // YYYY-MM-DD
  }) => api.get<Order[]>("/order", { params }),

  getNotCompletedOrCancelled: (params?: { table_number?: number; user_id?: number }) =>
    api.get<Order[]>("/order/status", { params }),

  getOrder: (id: number) => api.get<Order>(`/order/${id}`),

  create: (table_number: number, user_id: number, note: string, status: string, items: OrderItem[]) =>
    api.post("/order", { table_number, user_id, note, status, items }),

  update: (id: number, status: string) => api.put(`/order/${id}`, { status }),

  remove: (id: number) => api.delete(`/order/${id}`),
};
