import React, { createContext, useState, useEffect, Children} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI } from "../api/authApi";

type AuthContextType = {
    user: any | null;
    loading: boolean;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUserState] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user khi mở app
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem("user");
                if (userJson) {
                    setUserState(JSON.parse(userJson));
                }
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // Hàm setUser mới
    const setUser = async (newUser: any) => {
        if (newUser) {
            await AsyncStorage.setItem("user", JSON.stringify(newUser));
            setUserState(newUser);
        } else {
            await AsyncStorage.removeItem("user");
            setUserState(null);
        }
    };

    const logout = async () => {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
            try {
                await AuthAPI.logout(refreshToken);
            } catch (err) {
                console.warn("Logout API failed", err);
            }
        }
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        setUserState(null);
    };


    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
