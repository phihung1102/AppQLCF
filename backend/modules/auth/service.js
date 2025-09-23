import { JWT_SECRET, JWT_REFRESH_SECRET } from "../../utils/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findByEmail } from "../user/model.js";
import { saveRTK, findRTK, deleteRTK } from "./model.js";
import ApiError from "../../utils/apiError.js";

const AccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "15m" }
    );
};

const RefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_REFRESH_SECRET
    )
}

export const registerSV = async (user) => {
    const { name, email, password, role } = user;

    const existing = await findByEmail(email);
    if (existing) throw new ApiError(404, "Email đã tồn tại");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({
        name,
        email,
        password: hashedPassword,
        role: "staff",
    });
    return { id: userId, name, email, role: "staff" };
};

export const loginSV = async (email, password) => {
    const user = await findByEmail(email);
    if(!user) { throw new ApiError(404, "Email không tồn tại!"); };

    const isMath = await bcrypt.compare(password, user.password);
    if (!isMath) { throw new ApiError(401, "Sai mật khẩu!"); };
    
    const accessToken = AccessToken(user);
    const refreshToken = RefreshToken(user);

    await saveRTK(user.id , refreshToken);
    return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

export const logoutSV = async (refreshToken) => {
    await deleteRTK(refreshToken);
    return true;
};

export const refreshSV = async (refreshToken) => {
    if (!refreshToken) { throw new ApiError(400, "Không có refresh token!"); };
    
    const stored = await findRTK(refreshToken);
    if (!stored) { throw new ApiError(401, "Refresh token không hợp lệ!"); };

    try {
        const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const newAccessToken = AccessToken({ id: payload.id, role: payload.role });
        return { accessToken: newAccessToken };
    } catch (err) {
         throw new ApiError(404, "Refresh token hết hạn hoặc không hợp lệ");
    }
}