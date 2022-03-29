import "dotenv/config";
import server from "./server";
import ioInstance from "./io";
import socketServer from "./socketServer";
import { logInfo } from "./utils/logger";
import { PORT } from "./config/env.config";

server.listen(PORT, async () => {
    logInfo("Server is running");
    await socketServer({ io: ioInstance });
});
