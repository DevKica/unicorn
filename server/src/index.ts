import "dotenv/config";
import server from "./server";
import { Server } from "socket.io";
import { logInfo } from "./utils/logger";
import { ORIGIN, PORT } from "./config/env.config";
import socketServer from "./socketServer";

const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        credentials: true,
    },
});

server.listen(PORT, () => {
    logInfo("Server is running");
    socketServer({ io });
});
