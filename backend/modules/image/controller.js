import { getImageSV, getImageByIdSV, createImageSV, deleteImageSV } from "./service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import ApiError from "../../utils/apiError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Tạo __dirname chuẩn trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImageCTL = catchAsync(async (req, res) => {
    const image = await getImageSV(req.params.productId);
    res.json(image);
});

export const createImageCTL = catchAsync(async (req, res) => {
    const productId = req.body.productId;        // productId vẫn gửi qua body
    if (!req.file) throw new ApiError(400, "Chưa upload file");
    const imageUrl = `/uploads/products/${req.file.filename}`; // đường dẫn lưu DB
    const id = await createImageSV(productId, imageUrl);
    res.json({ id, imageUrl });
});


export const deleteImageCTL = catchAsync(async (req, res) => {
    const image = await getImageByIdSV(req.params.id); // <-- dùng service mới
    if (!image) throw new ApiError(404, "Không tìm thấy ảnh");

    const filePath = path.join(__dirname, "../../uploads/products", path.basename(image.image_url));
    fs.unlink(filePath, (err) => { if(err) console.log(err); });

    await deleteImageSV(req.params.id); // xóa DB
    res.json({ deleted: true });
});

