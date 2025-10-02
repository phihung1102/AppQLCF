import { getAllSV, createUserSV, updateUserSV, updateUserInfoSV , deleteUserSV, getUserByIdSv } from "./service.js";
import ApiError from "../../utils/apiError.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getAllCTL = catchAsync(async (req, res) => {
    const users = await getAllSV();
    res.json(users);
});

export const getUserByIdCTL = catchAsync(async (req, res) => {
    const user = await getUserByIdSv(req.params.id);
    res.json(user);
});

export const createUserCTL = catchAsync(async (req, res) => {
    const userId = await createUserSV(req.body);
    res.status(201).json({ message: "User created", id: userId });
});

export const updateUserCTL = catchAsync(async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
    const result = await updateUserSV(id, role);
    if (result === 0) throw new ApiError(404, "User not found")
    res.json({ message: "Role updates" });
});

export const updateUserInfoCTL = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { fullname, gender, phone, address } = req.body;
    if (!fullname || !phone) {
        throw new ApiError(400, "fullname và phone là bắt buộc");
    }
    const result = await updateUserInfoSV(id, { fullname, gender, phone, address });
    if (result === 0) throw new ApiError(404, "Không tìm thấy user");
    const updateUser = await getUserByIdSv(id);
    res.json(updateUser);
});

export const deleteUserCTL = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await deleteUserSV(id);
    if (result === 0) throw new ApiError(404, "User not found")
    res.json({ message: "User deleted" });
});