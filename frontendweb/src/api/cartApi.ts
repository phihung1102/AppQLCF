import { api } from "./apiPublic";

export interface CartItem {
  id: number;
  quantity: number;
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

export interface Cart {
  id: number;
  table_number?: number | null;
  items: CartItem[];
}

export const CartApi = {
  getByTable: (table_number: number) => 
    api.post<Cart>("/cart/table", { table_number }),
  getByUser: (user_id: number) => 
    api.post<Cart>("/cart/user", { user_id}),
  remove: (id: number) => 
    api.delete(`/cart/${id}`),
  addItem: (cart_id: number, product_id: number, quantity: number = 1) => 
    api.post<{id: number}>("/cart/items", { cart_id, product_id, quantity }),
  updateItem: (id: number, quantity: number) => 
    api.put<{updated: number}>(`/cart/items/${id}`, { quantity }),
  removeItem: (id: number) => 
    api.delete<{deleted: number}>(`/cart/items/${id}`),
}