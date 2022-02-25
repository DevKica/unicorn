import path from "path";
import { PrismaModel } from "../@types/prisma/models.types";
import { uploadDirname } from "../config/upload.config";
import { logError, logInfo } from "../utils/logger";
import { UserModel } from "./models";
import fse from "fs-extra";

async function deleteCurrentImages() {
    const foldersToRefresh = ["usersPhotos"];
    logInfo("Delete currently storing images");

    for (const folder of foldersToRefresh) {
        await fse.remove(path.join(uploadDirname, folder));
        await fse.mkdir(path.join(uploadDirname, folder));
        logInfo(`${folder}- folder has been revamped`);
    }
}

async function removeModelTable(model: PrismaModel) {
    await model.deleteMany({});
}

async function cleanUpAfterTests() {
    if (process.env.NODE_ENV === "test") {
        await removeModelTable(UserModel);
        await deleteCurrentImages();

        logInfo("Cleanup was successful");
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
