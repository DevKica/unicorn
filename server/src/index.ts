import "dotenv/config";
import server from "./server";
import { logInfo } from "./utils/logger";

const PORT = process.env.PORT;

server.listen(PORT, () => {
    logInfo("Server is running");
});
