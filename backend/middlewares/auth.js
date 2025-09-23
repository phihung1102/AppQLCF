import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if(!authHeader) return res.status(401).json({ error: "Chưa đăng nhập" });

    const token = authHeader.split(" ")[1];
    if(!token || token === "null" || token === "undefined") return res.status(401).json({ error: "Token không hợp lệ."});

    try {
        const payload = jwt.verify(token, secretKey);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token không hợp lệ hoặc hết hạn."});
    }
};

export const permit = (...allowerdRoles) => (req, res, next) => {
    if (!allowerdRoles.includes(req.user.role)) return res.status(401).json({ error: "Không có quyền truy cập."});
    next();
};

export {secretKey};