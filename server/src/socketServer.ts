import { Server } from "socket.io";
import { io } from "./index";
import { MessageObjectType } from "./@types/prisma/static.types";

export const emitReceived = (message: MessageObjectType) => {
    io.emit("receivedMessage", message);
};

function socketServer({ io }: { io: Server }) {
    io.on("connection", (socket) => {
        // on connection message
        console.log("connected");

        // listen to disconnect
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
    });
}

export default socketServer;
