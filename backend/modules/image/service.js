import { getImageByProduct, getImageById, createImage, deleteImage } from "./model.js";

export const getImageSV = (productId) => getImageByProduct(productId);
export const getImageByIdSV = (id) => getImageById(id);
export const createImageSV = (productId, url) => createImage(productId, url);
export const deleteImageSV = (id) => deleteImage(id);