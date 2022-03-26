import users from "./data/users";
import seedModel from "./seed.model";
import likes from "./data/likes";
import conversations from "./data/conversations";
import messages from "./data/messages";
import premiumAccountTokens from "./data/premiumAccountTokens";
import usersRelations from "./data/usersRelations";
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
