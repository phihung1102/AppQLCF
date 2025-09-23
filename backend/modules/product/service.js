import { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } from "./model.js";
import { getImageByProduct } from "../image/model.js";

export const getAllProductSV = () => getAllProduct();

export const getProductSV = async (id) => {
  const product = await getProduct(id);
  if (product) {
    product.images = await getImageByProduct(id);
  }
  return product;
};

export const createProductSV = (name, price, status, category_id) => createProduct(name, price, status, category_id);
export const updateProductSV = (id, name, price, status, category_id) => updateProduct(id, name, price, status, category_id);
export const deleteProductSV = (id) => deleteProduct(id);
