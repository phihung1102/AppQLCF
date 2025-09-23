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
  const id = await createProductSV(
    req.body.name,
    req.body.price,
    req.body.status,
    req.body.category_id
  );
  res.json({ id });
  getIO().emit("product_updated");
});

export const updateProductCTL = catchAsync(async (req, res) => {
  const updated = await updateProductSV(
    req.params.id,
    req.body.name,
    req.body.price,
    req.body.status,
    req.body.category_id
  );
  res.json({ updated });
  getIO().emit("product_updated");
});

export const deleteProductCTL = catchAsync(async (req, res) => {
  const deleted = await deleteProductSV(req.params.id);
  res.json({ deleted });
});
