import bcrypt from "bcrypt";
import { getAll, createUser, updateUser, deleteUser, findByEmail } from "./model.js";
import ApiError from "../../utils/apiError.js";

export const getAllSV = async () => {
    return await getAll();
}

export const createUserSV = async (user) => {
    const existing = await findByEmail(user.email);
    if (existing) throw new ApiError(404, "Email đã tồn tại.");

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await createUser({...user, password: hashedPassword });
};

export const updateUserSV = async (id, role) => {
    return await updateUser(id, role);
};

export const deleteUserSV = async (id) => {
    return await deleteUser(id);
}