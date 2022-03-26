import mainSeed from "../../prisma/seed/main.seed";
import likesLimitSeed from "../../prisma/seed/likesLimit.seed";
import { removeGlobals } from "../helpers/globalHelpers";
import { testGETRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { SuccessResponse } from "../../utils/responses/main";
import { NotFoundInstance, NumberOfLikesExceededInstance, UpgradeYourAccountInstance } from "../data/errors";
import { loginCredentials, basicActiveUserDataResponse } from "../data/user.auth";
import { blackUserDataResponse, goldUserDataResponse, silverUserDataResponse } from "../data/user.premiumAccounts";

describe("PREMIUM ACCOUNTS", () => {
    beforeAll(async () => {
        await mainSeed();
        await likesLimitSeed();
        // authenticate user( set valid tokens )
        await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);
    });
    afterAll(async () => {
        removeGlobals();
    });
    describe("SILVER", () => {
        test("User with DEFAULT account type should NOT be able to match users after exceeding the number of likes limit", async () => {
            await testGETRequest("/users", NumberOfLikesExceededInstance);
        });
        test("User with DEFAULT account type should NOT be able to like another user after exceeding the number of likes limit", async () => {
            await testPOSTRequest("/likes", { judgedUserId: "user0", typeOfLike: "default" }, NumberOfLikesExceededInstance);
        });
        test("User with DEFAULT account type should NOT be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, UpgradeYourAccountInstance);
        });
        test("User with DEFAULT account type should NOT be able to access GOLD USER protected routes ", async () => {
            await testPOSTRequest("/auth/gold", {}, UpgradeYourAccountInstance);
        });
        test("User with DEFAULT account type should NOT be able to access BLACK USER protected routes ", async () => {
            await testPOSTRequest("/auth/black", {}, UpgradeYourAccountInstance);
        });
        test("User should NOT be able to upgrade his account with invalid token and valid id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/silverToken/invalidToken`, {}, NotFoundInstance);
        });
        //
        test("User should be able to upgrade his account with valid token ( days of validity = 0 ) and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/tokenZero/token0`, {}, blackUserDataResponse);
        });
        test("User with EXPIRED SILVER account type should NOT be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, UpgradeYourAccountInstance);
        });
        test("User should have the ACCOUNT TYPE set to DEFAULT after making the request with EXPIRED account type", async () => {
            await testGETRequest("/users/profile/", basicActiveUserDataResponse);
        });
        //
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
