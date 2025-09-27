import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import AdminStackNavigator from "./adminIndex";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    AdminStack: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AdminStack" component={AdminStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
