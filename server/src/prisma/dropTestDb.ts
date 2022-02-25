import { logError, logInfo } from "../utils/logger";
import { UserModel } from "./models";

async function dropTestDb() {
    if (process.env.NODE_ENV === "test") {
        await UserModel.deleteMany({});
        logInfo("All tables successfully deleted");
    } else {
        logError(`NODE_ENV is not equal "test", NODE_ENV=${process.env.NODE_ENV}`);
    }
}

export default dropTestDb;

if (require.main === module) {
    (async () => {
        await dropTestDb();
    })();
}
