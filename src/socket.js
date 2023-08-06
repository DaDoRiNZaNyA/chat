import io from "socket.io-client";
const socket = io("https://chat-back-4n4o.onrender.com", {
  transports: ["websocket"],
});

export default socket;
