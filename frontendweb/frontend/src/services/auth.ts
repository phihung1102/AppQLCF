import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI } from "../api/authApi";

export const login = async (email: string, password: string) => {
    const res = await AuthAPI.login(email, password);
    const { accessToken, refreshToken, user } = res.data;
            
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
};

export const register = async (name: string, email: string, password: string) => {
    const res = await AuthAPI.register(name, email, password);
    return res.data;
};

export const logout = async (navigation: any) => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (refreshToken) await AuthAPI.logout(refreshToken);
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    if(navigation) navigation.replace("Login");
};