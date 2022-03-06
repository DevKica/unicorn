import likes from "./data/likes";
import users from "./data/users";
import seedModel from "./seed.model";

async function seedRelationsData() {
    await seedModel("user", users);
    await seedModel("like", likes);
}

export default seedRelationsData;

if (require.main === module) {
    (async () => {
        await seedRelationsData();
    })();
}
