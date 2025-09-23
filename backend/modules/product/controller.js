import { getAllProductSV, getProductSV, createProductSV, updateProductSV, deleteProductSV } from "./service.js";
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

export const createProductCTL = catchAsync(async (req, res) => {
  const { name, price, status, category_id, imageUrl } = req.body;
  const id = await createProductSV( name, price, status, category_id, imageUrl );
  res.json({ id });
  getIO().emit("product_updated");
});

export const updateProductCTL = catchAsync(async (req, res) => {
  const { name, price, status, category_id, imageUrl } = req.body;
  await updateProductSV(req.params.id, name, price, status, category_id, imageUrl );
  res.json({ updated: true });
  getIO().emit("product_updated");
});

export const deleteProductCTL = catchAsync(async (req, res) => {
  const deleted = await deleteProductSV(req.params.id);
  res.json({ deleted });
});
