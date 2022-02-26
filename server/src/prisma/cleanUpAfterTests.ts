import path from "path";
import { uploadDirname } from "../config/upload.config";
import { logError, logInfo } from "../utils/logger";
import { UserModel } from "./models";
import fse from "fs-extra";
import testGmailInbox from "../tests/helpers/testInbox";
import removeUserTable from "./removeTables";

async function deleteCurrentImages() {
    const foldersToRefresh = ["usersPhotos"];
    logInfo("Delete currently storing images");

    for (const folder of foldersToRefresh) {
        await fse.remove(path.join(uploadDirname, folder));
        await fse.mkdir(path.join(uploadDirname, folder));
        logInfo(`${folder.charAt(0).toLocaleUpperCase() + folder.slice(1)} - folder has been revamped`);
    }
}

async function cleanUpAfterTests() {
    if (process.env.NODE_ENV === "test") {
        await removeUserTable();
        await deleteCurrentImages();
        await testGmailInbox();
    } else {
        logError(`NODE_ENV is not equal "test", NODE_ENV=${process.env.NODE_ENV}`);
    }
}

export default cleanUpAfterTests;

if (require.main === module) {
    (async () => {
        await cleanUpAfterTests();
    })();
}
