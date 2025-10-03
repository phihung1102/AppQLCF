import React, { useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AdminProduct from "./adminProduct";
import AdminCategory from "./adminCategory";
import AdminStaff from "./adminStaff";
import AdminOrder from "./adminOrder";
import AdminAnalytic from "./adminAnalytic";
import { theme } from "../styles/theme";
import MessageBox from "../components/messageBox";
import { AuthContext } from "../context/AuthContext";

type AdminTabParamList = {
    Product: undefined;
    Category: undefined;
    Staff: undefined;
    Order: undefined;
    Analytic: undefined;
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

export default function AdminTabs() {
    const [confirmVisible, setConfirmVisible] = useState(false);
    const { logout } = useContext(AuthContext);

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        const icons: Record<string, string> = {
                            Product: "shopping-bag",
                            Category: "th-large",
                            Staff: "users",
                            Order: "receipt",
                            Analytic: "chart-bar"
                        };
                        return <FontAwesome5 name={icons[route.name]} size={size} color={color} solid />
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: '#a4a4a4',
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: theme.colors.background2,
                    },
                    headerLeftContainerStyle: { paddingLeft: 16 },
                    headerRightContainerStyle: { paddingRight: 16 },
                    headerRight: () => (
                        <FontAwesome5 name="sign-out-alt" size={24} color="#a8a8a8ff" style={{ marginLeft: 16 }} onPress={() => setConfirmVisible(true)} />
                    ),
                })}
            >
                <Tab.Screen name="Product" component={AdminProduct} />
                <Tab.Screen name="Category" component={AdminCategory} />
                <Tab.Screen name="Staff" component={AdminStaff} />
                <Tab.Screen name="Order" component={AdminOrder} />
                <Tab.Screen name="Analytic" component={AdminAnalytic} />
            </Tab.Navigator>

            <MessageBox 
                visible={confirmVisible}
                message="Bạn có chắc muốn đăng xuất không?"
                type="confirm"
                onCancel={() => setConfirmVisible(false)}
                onConfirm={async () => {
                    setConfirmVisible(false);
                    await logout();
                }}
            />
        </>
    );
}
