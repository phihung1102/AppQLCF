import io from "socket.io-client";

const SOCKET_URL = "http://192.168.1.5:3000";

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
});

export default socket;