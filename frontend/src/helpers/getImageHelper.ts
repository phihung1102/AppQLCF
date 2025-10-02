import { Platform } from "react-native";

export const getProductImage = (imageUrl?: string) => {
  const BASE_URL = Platform.OS === "android" 
    ? "http://10.0.2.2:3000" 
    : "http://192.168.1.5:3000";

  return imageUrl ? { uri: `${BASE_URL}${imageUrl}` } : "https://via.placeholder.com/150";
};
