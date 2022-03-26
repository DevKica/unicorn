import seedModel from "./seed.model";
import likesLimit from "./data/likesLimit/likes";
import usersRelationsLimit from "./data/likesLimit/usersRelations";

async function likesLimitSeed() {
    await seedModel("like", likesLimit);
    await seedModel("usersRelation", usersRelationsLimit);
}

export default likesLimitSeed;
