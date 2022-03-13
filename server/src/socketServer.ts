import io from "./io";
import { Server } from "socket.io";
import { MessageObjectType } from "./@types/prisma/static.types";

export const emitNewMessage = (message: MessageObjectType) => {
    io.emit("newMessageServer", message);
};

function socketServer({ io }: { io: Server }) {
    io.on("connection", (socket) => {
        //@ts-ignore
        const { user } = socket.request;

        // listen to new messages
        socket.on("newMessageClient", (message: MessageObjectType) => {
            emitNewMessage(message);
        });
    });
}

export default socketServer;
