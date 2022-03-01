import { logError, logInfo } from "../../utils/logger";
import { UserModel } from "../models";
import { deleteCurrentImages } from "./cleanUpAfterTests";

export async function removeUserTable() {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
        await UserModel.deleteMany({});
        logInfo("User table was removed");
    } else {
        logError(`NODE_ENV is not equal "test" or "development, NODE_ENV=${process.env.NODE_ENV}`);
    }
}

if (require.main === module) {
    (async () => {
        await removeUserTable();
        await deleteCurrentImages();
    })();
}
