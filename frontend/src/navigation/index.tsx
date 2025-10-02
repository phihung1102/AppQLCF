import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import UserTabs from "../screens/userTabBottom";
import CheckInfo from "../screens/checkInfo";
import AdminStackNavigator from "./adminIndex";
import CartDetail from "../screens/cartDetail";
import UserOrderDetail from "../screens/userOrderDetail";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export type RootStackParamList = {
    Login: undefined;
    UserTabs: undefined;
    Register: undefined;
    AdminStack: undefined;
    CheckInfo: undefined;
    CartDetail: { userId: number };
    UserOrderDetail: {table_number?: number; userId?: number; orderId: number}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    const { user, loading } = useContext(AuthContext);
    if (loading) { return null; }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    user.role === "admin" ? (
                        <Stack.Screen name="AdminStack" component={AdminStackNavigator} />
                    ) : (
                        user.isFirstLogin ? (
                            <Stack.Screen name="CheckInfo" component={CheckInfo} />
                        ) : (
                            <>
                                <Stack.Screen name="UserTabs" component={UserTabs} />
                                <Stack.Screen name="CartDetail" component={CartDetail} />
                                <Stack.Screen name="UserOrderDetail" component={UserOrderDetail} />
                            </>
                        )
                    )
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
