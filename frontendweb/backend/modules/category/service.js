import { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } from "./model.js";

export const getAllCategorySV = () => getAllCategory();
export const getCategorySV = (id) => getCategory(id);
export const createCategorySV = (name) => createCategory(name);
export const updateCategorySV = (id, name) => updateCategory(id, name);
export const deleteCategorySV = (id) => deleteCategory(id);
