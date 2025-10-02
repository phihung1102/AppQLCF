export interface User {
  id: number;
  name: string;
  email: string;
  fullname: string;
  phone: string;
  gender: string;
  address: string;
  role: string;
}

export interface Category { 
    id: number;
    name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  status: "available" | "unavailable";
  category_id: number;
  category_name?: string;
  image?: { id: number; url: string } | null;
  image_url: string | null; 
  imageId?: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product: Product;
}

export interface Order {
  id: number;
  table_number: number | null;
  user_id: number | null;
  total: number;
  note: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderFilterParams {
  table_number?: number;
  user_id?: number;
  fromDate?: string; // "YYYY-MM-DD"
  toDate?: string;   // "YYYY-MM-DD"
}

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
