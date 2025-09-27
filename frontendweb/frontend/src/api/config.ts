import { Platform } from "react-native";

const COMPUTER_IP = "192.168.1.5";
const LOCAL_IP = "10.0.2.2";
const DEV_BASE_URL =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:3000`
    : `http://${COMPUTER_IP}:3000`;

const PROD_BASE_URL = "https://api.myapp.com";

export const BASE_URL = __DEV__ ? DEV_BASE_URL : PROD_BASE_URL;
