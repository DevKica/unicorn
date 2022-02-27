import { logError, logInfo } from "../utils/logger";
import { UserModel } from "./models";

async function removeUserTable() {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
        logInfo(`NODE_ENV is equal to "${process.env.NODE_ENV}"`);
        await UserModel.deleteMany({});
        logInfo("User table was removed");
    } else {
        logError(`NODE_ENV is not equal "test" or "development, NODE_ENV=${process.env.NODE_ENV}`);
    }
}

export default removeUserTable;

if (require.main === module) {
    (async () => {
        await removeUserTable();
    })();
}
