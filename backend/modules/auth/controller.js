import { registerSV, loginSV, logoutSV, refreshSV } from "./service.js";
import ApiError from "../../utils/apiError.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const registerCTL = catchAsync(async (req, res) => {
    const user = await registerSV(req.body);
    res.status(201).json({ message: "Đăng ký thành công", user });
});

export const loginCTL = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await loginSV(email, password);
    res.status(200).json(result);
});

export const logoutCTL = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    await logoutSV(refreshToken);
    res.status(200).json({ message: "Đăng xuất thành công" });
});

export const refreshCTL = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await refreshSV(refreshToken);
    res.status(200).json(result);
});