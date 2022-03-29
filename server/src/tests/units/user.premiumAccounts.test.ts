import mainSeed from "../../prisma/seed/main.seed";
import likesLimitSeed from "../../prisma/seed/likesLimit.seed";
import { removeGlobals } from "../helpers/globalHelpers";
import { testGETRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { SuccessResponse } from "../../utils/responses/main";
import { NotFoundInstance, NumberOfLikesExceededInstance, UpgradeYourAccountInstance } from "../data/errors";
import { loginCredentials, basicActiveUserDataResponse } from "../data/user.auth";
import { blackTokenData, blackUserDataResponse, goldTokenData, goldUserDataResponse, premiumLikeData, silverTokenData, silverUserDataResponse } from "../data/user.premiumAccounts";

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
        const { validId, validToken, invalidToken, invalidId, validExpired } = silverTokenData;

        test("User with DEFAULT account type should be able to like another user before exceeding the number of likes limit", async () => {
            await testPOSTRequest("/likes", premiumLikeData.default, SuccessResponse);
        });
        test("User with DEFAULT account type should NOT be able to match users after exceeding the number of likes limit", async () => {
            await testGETRequest("/users", NumberOfLikesExceededInstance);
        });
        test("User with DEFAULT account type should NOT be able to like another user after exceeding the number of likes limit", async () => {
            await testPOSTRequest("/likes", premiumLikeData.default, NumberOfLikesExceededInstance);
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
            await testPOSTRequest(`/premiumAccount/activate/${validId}/${invalidToken}`, {}, NotFoundInstance);
        });
        test("User should NOT be able to upgrade his account with valid token and invalid id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/${invalidId}/${validToken}`, {}, NotFoundInstance);
        });
        // expired
        test("User should be able to upgrade his account with valid expired token ( days of validity = 0 )", async () => {
            await testPOSTRequest(`/premiumAccount/activate/${validExpired}`, {}, blackUserDataResponse);
        });
        test("User with EXPIRED SILVER account type should NOT be able to access SILVER USER protected routes ", async () => {
            await testPOSTRequest("/auth/silver", {}, UpgradeYourAccountInstance);
        });
        test("User should have the ACCOUNT TYPE set to DEFAULT after making the request with EXPIRED account type", async () => {
            await testGETRequest("/users/profile/", basicActiveUserDataResponse);
        });
        //
        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/${validId}/${validToken}`, {}, silverUserDataResponse);
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

        test("User with SILVER OR HIGHER account type type should be able to SUPERLIKE another user after exceeding the number of likes limit", async () => {
            await testPOSTRequest("/likes", premiumLikeData.super, SuccessResponse);
        });
        //  test("User should be able to get properly filtered users to match", async () => {
        // await testGETRequest("/users", getUsersToMatchResponse.beforeOperations);
        // });
    });
    describe("GOLD", () => {
        const { validId, validToken } = goldTokenData;

        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/${validId}/${validToken}`, {}, goldUserDataResponse);
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
        const { validId, validToken } = blackTokenData;

        test("User should be able to upgrade his account with valid token and id", async () => {
            await testPOSTRequest(`/premiumAccount/activate/${validId}/${validToken}`, {}, blackUserDataResponse);
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
