import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://100.111.209.119:8765");
