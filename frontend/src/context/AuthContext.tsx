import React, { createContext, useState, useEffect, Children} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    //Load lại user khi mở app
    useEffect(() => {
        const loadUser = async () => {
            const userJson = await AsyncStorage.getItem("user");
            if (userJson) { setUser(JSON.parse(userJson)); }
            setLoading(false);
        };
        loadUser();
    }, []);

    const logout = async () => {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}