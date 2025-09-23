import { getCartSV, createCartSV, deleteCartSV, createCartItemSV, updateCartItemSV, deleteCartItemSV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getCartCTL = catchAsync(async (req, res) => {
  const cart = await getCartSV(req.params.id);
  res.json(cart);
});

export const createCartCTL = catchAsync(async (req, res) => {
  const id = await createCartSV(req.body.table_number);
  res.json({ id });
});

export const deleteCartCTL = catchAsync(async (req, res) => {
  const deleted = await deleteCartSV(req.params.id);
  res.json({ deleted });
});

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
