import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminTabs from "../screens/adminTabBottom";
import AddProduct from "../screens/addProduct";
import { Product } from "../screens/adminProduct";

export type AdminStackParamList = {
    AdminTabs: undefined;
    AddProduct: { mode: "add" | "edit"; product?: Product };
}

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminTabs" component={AdminTabs} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
        </Stack.Navigator>
    )
}
