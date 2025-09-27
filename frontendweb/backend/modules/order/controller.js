import { getAllOrderSV, getOrderSV, createOrderSV, updateOrderSV, deleteOrderSV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getAllOrderCTL = catchAsync(async (req, res) => {
  const orders = await getAllOrderSV();
  res.json(orders);
});

export const getOrderCTL = catchAsync(async (req, res) => {
  const order = await getOrderSV(req.params.id);
  res.json(order);
});

export const createOrderCTL = catchAsync(async (req, res) => {
  const { table_number, note, status, items } = req.body;
  const id = await createOrderSV(table_number, note, status || "pending", items || []);
  res.json({ id });
});


export const updateOrderCTL = catchAsync(async (req, res) => {
  const updated = await updateOrderSV(req.params.id, req.body.status);
  res.json({ updated });
});

export const deleteOrderCTL = catchAsync(async (req, res) => {
  const deleted = await deleteOrderSV(req.params.id);
  res.json({ deleted });
});
