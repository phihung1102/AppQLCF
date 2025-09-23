import { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } from "./model.js";
import { getImageByProduct, createImage, deleteImage } from "../image/model.js";

export const getAllProductSV = () => getAllProduct();
export const getProductSV = (id) => getProduct(id);

export const createProductSV = (name, price, status, category_id, imageUrl) => createProduct(name, price, status, category_id)
  .then(async (id) => {
    if (imageUrl) await createImage(id, imageUrl);
    return id;
  });
  
export const updateProductSV = async (id, name, price, status, category_id, imageUri) => {
  await updateProduct(id, name, price, status, category_id);
  if (imageUri) {
    const existing = await getImageByProduct(id);
    if (existing) await deleteImage(existing.id);
    await createImage(id, imageUri);
  }
  return true;
} 

export const deleteProductSV = async (id) => {
  const existing = await getImageByProduct(id);
  if (existing) await deleteImage(existing.id);
  await deleteProduct(id);
};
