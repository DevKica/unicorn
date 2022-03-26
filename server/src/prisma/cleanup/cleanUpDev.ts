import { logError, logInfo } from "../../utils/logger";
import { ConversationModel, LikeModel, MessageModel, PremiumAccountTokenModel, UserModel, UsersRelationModel } from "../models";
import { deleteCurrentImages } from "./cleanUpAfterTests";

export async function removeTables() {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
        await UserModel.deleteMany({});
        await LikeModel.deleteMany({});
        await ConversationModel.deleteMany({});
        await MessageModel.deleteMany({});
        await UsersRelationModel.deleteMany({});
        await PremiumAccountTokenModel.deleteMany({});
        logInfo("Tables have been removed");
    } else {
        logError(`NODE_ENV is not equal "test" or "development, NODE_ENV=${process.env.NODE_ENV}`);
    }
}

if (require.main === module) {
    (async () => {
        await removeTables();
        await deleteCurrentImages();
    })();
}
