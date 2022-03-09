import likes from "./data/likes";
import users from "./data/users";
import seedModel from "./seed.model";
import conversations from "./data/conversations";

async function seedRelationsData() {
    await seedModel("user", users);
    await seedModel("like", likes);
    await seedModel("conversation", conversations);
}

export default seedRelationsData;

if (require.main === module) {
    (async () => {
        await seedRelationsData();
    })();
}
