import { io } from "socket.io-client";

const socket = io("https://devcollab-ux7k.onrender.com/", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;