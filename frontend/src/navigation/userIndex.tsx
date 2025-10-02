import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabs from "../screens/userTabBottom";

export type UserStackParamList = {
  UserTabs: undefined;
};

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabs} />
    </Stack.Navigator>
  );
}
