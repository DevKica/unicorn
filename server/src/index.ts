import "dotenv/config";
import server from "./server";
import { logInfo } from "./utils/logger";
import { User } from "./prisma/models";

const PORT = process.env.PORT;

server.listen(PORT, () => {
  logInfo("Server is running");
});
