import { Server } from "socket.io";

function socketServer({ io }: { io: Server }) {
    io.on("connection", (socket) => {
        // on connection message
        console.log("connected");

        // listen to send message event
        socket.on("sendMessage", (message) => {
            io.emit("receivedMessage", message);
        });

        // listen to disconnect
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
    });
}

export default socketServer;
