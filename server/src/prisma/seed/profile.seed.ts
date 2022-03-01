import users from "./data/users";
import seedModel from "./seed.model";

async function seedProfile() {
    seedModel("user", users);
}

export default seedProfile;

if (require.main === module) {
    (async () => {
        await seedProfile();
    })();
}
