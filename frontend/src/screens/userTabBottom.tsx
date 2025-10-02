import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "../styles/theme";

import UserMenu from "./userMenu";
import UserToggleProduct from "./userToggleProduct";
import UserProfile from "./userProfile";
import OrderList from "./orderList";

type UserTabParamList = {
  Menu: undefined;
  ToggleProduct: undefined;
  Profile: undefined;
  OrderList: undefined;
};

const Tab = createBottomTabNavigator<UserTabParamList>();

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Menu: "utensils",
            ToggleProduct: "th-large",
            Profile: "user",
            OrderList: "receipt",
          };
          return <FontAwesome5 name={icons[route.name]} size={size} color={color} solid />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#a4a4a4",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Menu" component={UserMenu} />
      <Tab.Screen name="ToggleProduct" component={UserToggleProduct} options={{ title: "Quản lý món" }} />
      <Tab.Screen name="OrderList" component={OrderList} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}
