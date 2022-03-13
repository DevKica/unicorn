import io from "./io";
import "dotenv/config";
import server from "./server";
import { logInfo } from "./utils/logger";
import { PORT } from "./config/env.config";
import socketServer from "./socketServer";

server.listen(PORT, () => {
    logInfo("Server is running");
    socketServer({ io });
});
