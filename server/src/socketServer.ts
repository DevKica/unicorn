import { Server } from "socket.io";
import { MessageType } from "./@types/prisma/static.types";
import { findAllUserConversations } from "./services/conversations.services";

export const EVENTS = {
    CLIENT: {
        SEND_NEW_MESSAGE: "SEND_NEW_MESSAGE",
    },
    SERVER: {
        NEW_MESSAGE_RECEIVED: "NEW_MESSAGE_RECEIVED",
    },
};

async function socketServer({ io }: { io: Server }) {
    io.on("connection", async (socket) => {
        //@ts-ignore
        const { user } = socket.request;

        const userConversations = await findAllUserConversations(user.userId);

        userConversations.forEach((e) => {
            socket.join(e.id);
        });

        // listen to new messages
        socket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageType) => {
            console.log(io.sockets.adapter.rooms);
            io.to(message.conversationId).emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, message);
        });
    });
}

export default socketServer;
