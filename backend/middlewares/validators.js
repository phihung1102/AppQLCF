import { body, validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";

const validate = (rules) => [
    ...rules,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { throw new ApiError(400, errors.array()[0].msg); }
        next();
    }
];

export const validateRegister = validate([
    body("name").notEmpty().withMessage("Vui lòng nhập tên tài khoản!"),
    body("email").notEmpty().withMessage("Vui lòng nhập email!"),
    body("email").isEmail().withMessage("Email không hợp lệ!"),
    body("password").notEmpty().withMessage("Vui lòng nhập mật khẩu!"),
    body("password").isLength({ min: 8 }).withMessage("Mật khẩu cần ít nhất 8 ký tự!"),
]);

export const validateLogin = validate([
    body("email").notEmpty().withMessage("Vui lòng nhập email!"),
    body("email").isEmail().withMessage("Email không hợp lệ!"),
    body("password").notEmpty().withMessage("Vui lòng nhập mật khẩu!"),
    body("password").isLength({ min: 8 }).withMessage("Mật khẩu cần ít nhất 8 ký tự!"),
]);

export const validateProduct = validate([
  body("name").notEmpty().withMessage("Tên sản phẩm không được để trống!"),
  body("price").isFloat({ min: 0 }).withMessage("Giá sản phẩm phải >= 0!"),
  body("status").optional().isIn(["available", "unavailable"]).withMessage("Trạng thái không hợp lệ!"),
  body("category_id").isInt().withMessage("Category ID phải là số nguyên!"),
]);

export const validateCategory = validate([
  body("name").notEmpty().withMessage("Tên danh mục không được để trống!"),
]);

export const validateCart = validate([
  body("tableNumber").isInt({ min: 1 }).withMessage("Số bàn phải >= 1!"),
]);

export const validateCartItem = validate([
  body("productId").isInt().withMessage("Product ID phải là số nguyên!"),
  body("quantity").isInt({ min: 1 }).withMessage("Số lượng phải >= 1!"),
]);

export const validateOrder = validate([
  body("table_number").isInt({ min: 1 }).withMessage("Số bàn phải >= 1!"),
  body("note").optional().isLength({ max: 255 }).withMessage("Ghi chú tối đa 255 ký tự!"),
  body("status")
    .optional()
    .isIn(["pending", "processing", "completed", "cancelled"])
    .withMessage("Trạng thái không hợp lệ!"),
  body("items").optional().isArray().withMessage("Items phải là mảng!"),
]);

export const validateOrderItem = validate([
  body("product_id").isInt().withMessage("Product ID phải là số nguyên!"),
  body("quantity").isInt({ min: 1 }).withMessage("Số lượng phải >= 1!"),
  body("unit_price").isFloat({ min: 0 }).withMessage("Đơn giá phải >= 0!"),
]);

