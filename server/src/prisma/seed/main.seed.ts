import likes from "./data/likes";
import users from "./data/users";
import seedModel from "./seed.model";
import conversations from "./data/conversations";
import messages from "./data/messages";
import premiumAccountTokens from "./data/premiumAccountTokens";

async function mainSeed() {
    await seedModel("user", users);
    await seedModel("like", likes);
    await seedModel("conversation", conversations);
    await seedModel("message", messages);
    await seedModel("premiumAccountToken", premiumAccountTokens);
}

export default mainSeed;

if (require.main === module) {
    (async () => {
        await mainSeed();
    })();
}
