import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminTabs from "../screens/adminTabBottom";
import AddProduct from "../screens/addProduct";
import OrderDetail from "../screens/orderDetail";
import { Product } from "../types/inđex"
import AdminAnalytic from "../screens/adminAnalytic";

export type AdminStackParamList = {
    AdminTabs: undefined;
    AddProduct: { mode: "add" | "edit"; product?: Product };
    OrderDetail: { id: number };
    AdminAnalytic: undefined;
}

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminTabs" component={AdminTabs} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="AdminAnalytic" component={AdminAnalytic} />
        </Stack.Navigator>
    )
}
