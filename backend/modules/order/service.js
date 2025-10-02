import {
  getAllOrder,
  getNotCompletedOrCancelledOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,
  addOrderItem
} from "./model.js";
import ApiError from "../../utils/apiError.js";

// Lấy tất cả order (có filter)
export const getAllOrderSV = ({ table_number, user_id, fromDate, toDate }) =>
    getAllOrder({ table_number, user_id, fromDate, toDate });


export const getNotCompletedOrCancelledOrdersSV = async ({ table_number, user_id }) => {
  const orders = await getNotCompletedOrCancelledOrders({ table_number, user_id });
  for (const order of orders) {
    order.items = await getOrderItems(order.id);
  }
  return orders;
};

// Lấy 1 order chi tiết
export const getOrderSV = async (id) => {
  const order = await getOrder(id);
  if (!order) throw new ApiError(404, "Không tìm thấy order!");
  order.items = await getOrderItems(id);
  return order;
};

// Tạo order
export const createOrderSV = async (table_number, user_id, note, status, items) => {
  // Tính subtotal cho items
  let total = 0;
  items.forEach((it) => {
    it.subtotal = it.quantity * it.unit_price;
    total += it.subtotal;
  });

  let orderId;

  if (table_number) {
    // tìm order chưa complete/cancel
    const existing = await getNotCompletedOrCancelledOrders({ table_number });
    if (existing.length > 0) {
      const order = existing[0];
      orderId = order.id;

      // thêm items mới
      for (const it of items) {
        await addOrderItem(orderId, it.product_id, it.quantity, it.unit_price, it.subtotal);
      }

      // cập nhật lại total
      const newTotal = order.total + total;
      await updateOrder(orderId, order.status, note || order.note, newTotal);

      return orderId;
    }
  }

  // nếu chưa có order mở → tạo order mới
  orderId = await createOrder(table_number || null, user_id || null, total, note, status);
  for (const it of items) {
    await addOrderItem(orderId, it.product_id, it.quantity, it.unit_price, it.subtotal);
  }
  return orderId;
};


export const updateOrderSV = (id, status, note, total) => updateOrder(id, status, note, total);
export const deleteOrderSV = (id) => deleteOrder(id);
