import { getAllProductSV, getProductSV, getProductAvailableSV, createProductSV, updateProductSV, updateStatusProductSV, deleteProductSV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { getIO } from "../../socket/index.js";

export const getAllProductCTL = catchAsync(async (req, res) => {
  const products = await getAllProductSV();
  res.json(products);
});

export const getProductCTL = catchAsync(async (req, res) => {
  const product = await getProductSV(req.params.id);
  res.json(product);
});

export const getProductAvailableCTL = catchAsync(async (req, res) => {
  const products = await getProductAvailableSV();
  res.json(products);
});

export const createProductCTL = catchAsync(async (req, res) => {
  const { name, price, status, category_id, imageUrl } = req.body;
  const id = await createProductSV( name, price, status, category_id, imageUrl );
  getIO().emit("product_updated");
  res.json({ id });
});

export const updateProductCTL = catchAsync(async (req, res) => {
  const { name, price, category_id, imageUrl } = req.body;
  await updateProductSV(req.params.id, name, price, category_id, imageUrl );
  getIO().emit("product_updated");
  res.json({ updated: true });
});

export const updateStatusProductCTL = catchAsync(async (req, res) => {
  const { status } = req.body;
  await updateStatusProductSV(req.params.id, status);
  getIO().emit("product_updated");
  res.json({ updated: true });
});

export const deleteProductCTL = catchAsync(async (req, res) => {
  const deleted = await deleteProductSV(req.params.id);
  getIO().emit("product_updated");
  res.json({ deleted });
});
