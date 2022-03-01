import users from "./data/users";
import seedModel from "./seed.model";

async function seedUsersRelations() {
    await seedModel("user", users);
}

export default seedUsersRelations;

if (require.main === module) {
    (async () => {
        await seedUsersRelations();
    })();
}
