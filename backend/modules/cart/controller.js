import { getOrCreateCartByTableSV, getOrCreateCartByUserSV, deleteCartSV, createCartItemSV, updateCartItemSV, deleteCartItemSV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";

// --- Khách theo bàn ---
export const getOrCreateCartByTableCTL = catchAsync(async (req, res) => {
  const { table_number } = req.body;
  const cart = await getOrCreateCartByTableSV(table_number);
  res.json(cart);
});

// --- Nhân viên theo user_id ---
export const getOrCreateCartByUserCTL = catchAsync(async (req, res) => {
  const { user_id } = req.body;
  const cart = await getOrCreateCartByUserSV(user_id);
  res.json(cart);
});

export const deleteCartCTL = catchAsync(async (req, res) => {
  const deleted = await deleteCartSV(req.params.id);
  res.json({ deleted });
});

// cartitems
export const createCartItemCTL = catchAsync(async (req, res) => {
  const id = await createCartItemSV(
    req.body.cart_id,
    req.body.product_id,
    req.body.quantity
  );
  res.json({ id });
});

export const updateCartItemCTL = catchAsync(async (req, res) => {
  const updated = await updateCartItemSV(req.params.id, req.body.quantity);
  res.json({ updated });
});

export const deleteCartItemCTL = catchAsync(async (req, res) => {
  const deleted = await deleteCartItemSV(req.params.id);
  res.json({ deleted });
});
