import { api } from "./apiPublic";

export interface OrderItem {
  id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    price: number;
    image_url?: string | null;
    category?: {
      id: number;
      name: string;
    };
  };
}

export interface Order {
  id: number;
  table_number?: number | null;
  user_id?: number | null;
  total: number;
  note?: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: OrderItem[];
  created_at: string;
}

// OrderApi.ts
export const OrderApi = {
  getAll: (params?: { table_number?: number; user_id?: number }) =>
    api.get<Order[]>("/order", { params }),
  getNotCompletedOrCancelled: (params?: { table_number?: number; user_id?: number }) =>
    api.get<Order[]>("/order/status", { params }),
  get: (id: number) => api.get<Order>(`/order/${id}`),
  create: (
    table_number?: number,
    user_id?: number,
    note?: string,
    status: "pending" | "processing" | "completed" | "cancelled" = "pending",
    items: { product_id: number; quantity: number; unit_price: number }[] = []
  ) => api.post<{ id: number }>("/order", { table_number, user_id, note, status, items }),
  
  update: (id: number, data: { status?: string; note?: string }) =>
    api.put<{ updated: number }>(`/order/${id}`, data),
  remove: (id: number) => api.delete<{ deleted: number }>(`/order/${id}`)
};
