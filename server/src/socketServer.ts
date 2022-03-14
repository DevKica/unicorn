import { Server } from "socket.io";
import { MessageObjectType } from "./@types/prisma/static.types";
import { ConversationModel } from "./prisma/models";
import { findAllUserConversations } from "./services/conversations.services";

export const EVENTS = {
    CLIENT: {
        SEND_NEW_MESSAGE: "SEND_NEW_MESSAGE",
    },
    SERVER: {
        NEW_MESSAGE_RECEIVED: "NEW_MESSAGE_RECEIVED",
    },
};

// export const emitNewMessage = (message: MessageObjectType) => {
//     io.emit("newMessageServer", message);
// };

interface socketRoom {
    groupName: string;
    conversationId: string;
}

async function socketServer({ io }: { io: Server }) {
    const conversations: socketRoom[] = [];

    const allConversations = await ConversationModel.findMany({});

    allConversations.forEach((e: any) => {
        conversations.push({ conversationId: e.id, groupName: e.name });
    });

    io.on("connection", async (socket) => {
        //@ts-ignore
        const { user } = socket.request;

        const userConversations = await findAllUserConversations(user.userId);

        userConversations.forEach((e) => {
            socket.join(e.id);
        });

        // listen to new messages
        socket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageObjectType) => {
            io.to(message.conversationId).emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, message);
        });
    });
}

export default socketServer;
