import mainSeed from "../../prisma/seed/main.seed";
import { UpgradeYourAccountInstance } from "../data/errors";
import { loginCredentials, basicActiveUserDataResponse } from "../data/user.auth";
import { testPOSTRequest } from "../helpers/testEndpoint";

describe("PREMIUM ACCOUNTS", () => {
    beforeAll(async () => {
        await mainSeed();
        // authenticate user( set valid tokens )
        await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);
    });
    describe("SILVER", () => {
        test("User with default account type should NOT be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, UpgradeYourAccountInstance);
        });
    });
    describe("GOLD", () => {
        test("User with default account type should NOT be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, UpgradeYourAccountInstance);
        });
    });
    describe("BLACK", () => {
        test("User with default account type should NOT be able to access BLACK USER protected routess", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
    });
});
