import seedProfile from "../../prisma/seed/profile.seed";
import { removeGlobals } from "../helpers/globalHelpers";
import { testGETRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { activeBasicUserData, loginCredentials } from "../data/user";

describe("PROFILE", () => {
    beforeAll(async () => {
        await seedProfile();
        await testPOSTRequest("/users/login", loginCredentials, activeBasicUserData, 200);
    });
    afterAll(async () => {
        removeGlobals();
    });
    test(`User should be able get private profile info`, async () => {
        await testGETRequest("/users/profile/private", activeBasicUserData, 200);
    });
});
