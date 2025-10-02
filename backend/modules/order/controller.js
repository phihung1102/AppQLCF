import { catchAsync } from "../../utils/catchAsync.js";
import {
  getAllOrderSV,
  getNotCompletedOrCancelledOrdersSV,
  getOrderSV,
  createOrderSV,
  updateOrderSV,
  deleteOrderSV
} from "./service.js";
import { getIO } from "../../socket/index.js";

// Lấy tất cả order, có thể filter table_number hoặc user_id
export const getAllOrderCTL = catchAsync(async (req, res) => {
  const { table_number, user_id, fromDate, toDate } = req.query;
  const orders = await getAllOrderSV({ 
    table_number: table_number ? Number(table_number) : undefined,
    user_id: user_id ? Number(user_id) : undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined
  });
  res.json(orders);
});

// Lấy các order đã completed hoặc cancelled
export const getNotCompletedOrCancelledOrdersCTL = catchAsync(async (req, res) => {
  const { table_number, user_id } = req.query;
  const orders = await getNotCompletedOrCancelledOrdersSV({
    table_number: table_number ? Number(table_number) : undefined,
    user_id: user_id ? Number(user_id) : undefined
  });
  res.json(orders);
});

// Lấy order chi tiết
export const getOrderCTL = catchAsync(async (req, res) => {
  const order = await getOrderSV(req.params.id);
  res.json(order);
});

// Tạo order
export const createOrderCTL = catchAsync(async (req, res) => {
  const { table_number, user_id, note, status, items } = req.body;
  const id = await createOrderSV(table_number, user_id, note, status || "pending", items || []);
  getIO().emit("orderUpdated");
  res.json({ id });
});

// Cập nhật order
export const updateOrderCTL = catchAsync(async (req, res) => {
  const updated = await updateOrderSV(req.params.id, req.body.status, req.body.note);
  getIO().emit("orderUpdated");
  res.json({ updated });
});

// Xóa order
export const deleteOrderCTL = catchAsync(async (req, res) => {
  const deleted = await deleteOrderSV(req.params.id);
  res.json({ deleted });
});
