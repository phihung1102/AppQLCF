import io from "socket.io-client";
import { Platform } from "react-native";

// Nếu chạy trên mobile thật hoặc emulator, dùng LAN IP máy host
// Web thì dùng localhost
const SOCKET_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.1.5:3000"; // đổi thành IP LAN máy bạn

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
