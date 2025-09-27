import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import AdminStackNavigator from "./adminIndex";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    AdminStack: undefined;
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
                        <Stack.Screen name="Home" component={Home} />
                    )
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                ) }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
