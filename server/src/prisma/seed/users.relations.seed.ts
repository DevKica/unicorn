import likes from "./data/likes";
import users from "./data/users";
import seedModel from "./seed.model";
import conversations from "./data/conversations";
import messages from "./data/messages";

async function seedRelationsData() {
    await seedModel("user", users);
    await seedModel("like", likes);
    await seedModel("conversation", conversations);
    await seedModel("message", messages);
}

export default seedRelationsData;

if (require.main === module) {
    (async () => {
        await seedRelationsData();
    })();
}
