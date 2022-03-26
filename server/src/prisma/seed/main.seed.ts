import users from "./data/main/users";
import seedModel from "./seed.model";
import likes from "./data/main/likes";
import conversations from "./data/main/conversations";
import messages from "./data/main/messages";
import premiumAccountTokens from "./data/main/premiumAccountTokens";
import usersRelations from "./data/main/usersRelations";
import { removeTables } from "../cleanup/cleanUpDev";

async function mainSeed() {
    await removeTables();
    await seedModel("user", users);
    await seedModel("like", likes);
    await seedModel("conversation", conversations);
    await seedModel("message", messages);
    await seedModel("usersRelation", usersRelations);
    await seedModel("premiumAccountToken", premiumAccountTokens);
}

export default mainSeed;

if (require.main === module) {
    (async () => {
        await mainSeed();
    })();
}
