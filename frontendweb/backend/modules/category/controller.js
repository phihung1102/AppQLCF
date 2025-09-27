import { getAllCategorySV, getCategorySV, createCategorySV, updateCategorySV, deleteCategorySV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getAllCategoryCTL = catchAsync(async (req, res) => {
  const categories = await getAllCategorySV();
  res.json(categories);
});

export const getCategoryCTL = catchAsync(async (req, res) => {
  const category = await getCategorySV(req.params.id);
  res.json(category);
});

export const createCategoryCTL = catchAsync(async (req, res) => {
  const id = await createCategorySV(req.body.name);
  res.json({ id, name: req.body.name  });
});

export const updateCategoryCTL = catchAsync(async (req, res) => {
  const updated = await updateCategorySV(req.params.id, req.body.name);
  res.json({ updated });
});

export const deleteCategoryCTL = catchAsync(async (req, res) => {
  const deleted = await deleteCategorySV(req.params.id);
  res.json({ deleted });
});
