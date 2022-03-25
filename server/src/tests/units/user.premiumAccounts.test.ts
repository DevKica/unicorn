import mainSeed from "../../prisma/seed/main.seed";
import { SuccessResponse } from "../../utils/responses/main";
import { NotFoundInstance, UpgradeYourAccountInstance } from "../data/errors";
import { loginCredentials, basicActiveUserDataResponse } from "../data/user.auth";
import { blackUserDataResponse, goldUserDataResponse, silverUserDataResponse } from "../data/user.premiumAccounts";
import { testPOSTRequest } from "../helpers/testEndpoint";

describe("PREMIUM ACCOUNTS", () => {
    beforeAll(async () => {
        await mainSeed();
        // authenticate user( set valid tokens )
        await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);
    });
    describe("SILVER", () => {
        test("User with DEFAULT account type should NOT be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, UpgradeYourAccountInstance);
        });
        test("User with DEFAULT account type should NOT be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, UpgradeYourAccountInstance);
        });
        test("User with DEFAULT account type should NOT be able to access BLACK USER protected routes ", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/silverToken/token1`, {}, silverUserDataResponse);
        });
        test("User with SILVER account type should be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, SuccessResponse);
        });
        test("User with SILVER account type should NOT be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, UpgradeYourAccountInstance);
        });
        test("User with SILVER account type should NOT be able to access BLACK USER protected routes ", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
    });
    describe("GOLD", () => {
        test("User with SILVER account type should NOT be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, UpgradeYourAccountInstance);
        });
        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/goldToken/token2`, {}, goldUserDataResponse);
        });
        test("User with GOLD account type should be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, SuccessResponse);
        });
        test("User with GOLD account type should be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, SuccessResponse);
        });
        test("User with GOLD account type should NOT be able to access BLACK USER protected routes ", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
    });
    describe("BLACK", () => {
        test("User with GOLD account type should NOT be able to access BLACK USER protected routes", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/blackToken/token3`, {}, blackUserDataResponse);
        });
        test("User should NOT be able to upgrade his account with already used token", async () => {
            await testPOSTRequest(`/premiumAccount/activate/blackToken/token3`, {}, NotFoundInstance);
        });
        test("User with BLACK account type should be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, SuccessResponse);
        });
        test("User with BLACK account type should be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, SuccessResponse);
        });
        test("User with BLACK account type should be able to access BLACK USER protected routes ", async () => {
            await testPOSTRequest("/auth/black", {}, SuccessResponse);
        });
    });
});
