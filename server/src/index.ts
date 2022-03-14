import ioInstance from "./io";
import "dotenv/config";
import server from "./server";
import { logInfo } from "./utils/logger";
import { PORT } from "./config/env.config";
import socketServer from "./socketServer";

server.listen(PORT, async () => {
    logInfo("Server is running");
    await socketServer({ io: ioInstance });
});
