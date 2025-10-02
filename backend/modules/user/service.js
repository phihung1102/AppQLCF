import bcrypt from "bcrypt";
import { getAll, getUserById, createUser, updateUser, updateUserInfo , deleteUser, findByEmail } from "./model.js";
import ApiError from "../../utils/apiError.js";

export const getAllSV =  () => getAll();

export const getUserByIdSv = (id) => getUserById(id);

export const createUserSV = async (user) => {
    const existing = await findByEmail(user.email);
    if (existing) throw new ApiError(404, "Email đã tồn tại.");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await createUser({...user, password: hashedPassword });
};

export const updateUserSV = (id, role) =>  updateUser(id, role);

export const updateUserInfoSV =  (id, info) => updateUserInfo(id, info);

export const deleteUserSV = (id) => deleteUser(id);