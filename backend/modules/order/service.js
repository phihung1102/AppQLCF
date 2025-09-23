import { getAllOrder, getOrder, createOrder, updateOrder, deleteOrder, getOrderItems, addOrderItem } from "./model.js";
import ApiError from "../../utils/apiError.js";

export const getAllOrderSV = () => getAllOrder();

export const getOrderSV = async (id) => {
  const order = await getOrder(id);
  if (!order) throw new ApiError(404, "Không tìm thấy order!");
  order.items = await getOrderItems(id);
  return order;
};

export const createOrderSV = async (table_number, note, status, items) => {
  // Tính total từ items
  let total = 0;
  items.forEach((it) => {
    it.subtotal = it.quantity * it.unit_price;
    total += it.subtotal;
  });

  const orderId = await createOrder(table_number, total, note, status);

  for (const it of items) {
    await addOrderItem(orderId, it.product_id, it.quantity, it.unit_price, it.subtotal);
  }

  return orderId;
};

export const updateOrderSV = (id, status) => updateOrder(id, status);
export const deleteOrderSV = (id) => deleteOrder(id);
