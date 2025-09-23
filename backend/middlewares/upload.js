import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Tạo __dirname chuẩn trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình lưu ảnh product
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/products")); // thư mục lưu
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `product-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
