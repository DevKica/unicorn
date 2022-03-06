import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { removeGlobals } from "../helpers/globalHelpers";
import { testGETRequest, testPATCHRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { activeBasicUserData, loginCredentials } from "../data/user.auth";
import { afterFullUpdateUserData, createLikeBody, getMatchedResponse, newGeneralUpdateUserData, updateUserProfileBody } from "../data/user.relations";
import {
    NotFoundInstance,
    apiVersion,
    InvalidUpdateUserGeneralInfoInstance,
    InvalidUpdateUserMatchingInfoInstance,
    UnauthorizedInstance,
    InvalidCreateLikeInstance,
    UpgradeYourAccountInstance,
    ForbiddenInstance,
} from "../data/config";
import formatMatchedUsers from "../helpers/formatMatchedUsers";
import { allShowMeGenderFemalesUnder24, opositeShowMeGenderFemalesUnder24 } from "../../prisma/seed/data/users";
import { SuccessResponse } from "../../utils/responses/main";

describe("RELATIONS", () => {
    beforeAll(async () => {
        await seedRelationsData();
        await testPOSTRequest("/users/login", loginCredentials, activeBasicUserData, 200);
    });
    afterAll(async () => {
        removeGlobals();
    });
    describe("PROFILE", () => {
        const { valid, invalid } = updateUserProfileBody;

        test(`User should be able get private profile info`, async () => {
            await testGETRequest("/users/profile/", activeBasicUserData, 200);
        });
        test(`The server should return not found in case the image does not exist`, async () => {
            await testGETRequest("/users/profile/photo/123/123", NotFoundInstance);
        });
        test(`Everyone should be able to access user photos with secret name and size `, async () => {
            const res = await global.request.get(`/api/${apiVersion}/users/profile/photo/large/pawelKica1`);
            expect(res.headers["content-type"]).toEqual("image/jpeg");
        });
        test(`User should NOT be able to update his general settings with invalid body`, async () => {
            await testPATCHRequest("/users/profile/general", invalid.general, InvalidUpdateUserGeneralInfoInstance);
        });
        test(`User should NOT be able to update his matching settings with invalid body`, async () => {
            await testPATCHRequest("/users/profile/matching", invalid.matching, InvalidUpdateUserMatchingInfoInstance);
        });
        test(`User should be able to update his general profile settings with valid body`, async () => {
            await testPATCHRequest("/users/profile/general", valid.general, newGeneralUpdateUserData, 200);
        });
        test(`User should be able to update his matching profile settings with valid body`, async () => {
            await testPATCHRequest("/users/profile/matching", valid.matching, afterFullUpdateUserData, 200);
        });
    });
    describe("MATCHING", () => {
        const { valid, invalid } = createLikeBody;

        test("User should be able to get properly filtered users to match", async () => {
            await testGETRequest("/users", formatMatchedUsers([...opositeShowMeGenderFemalesUnder24, ...allShowMeGenderFemalesUnder24]), 200);
        });
        test(`User should NOT be able to pass createLikeSchema with invalid body`, async () => {
            await testPOSTRequest("/likes", invalid.schema, InvalidCreateLikeInstance);
        });
        test(`User should NOT be able to like inactive user`, async () => {
            await testPOSTRequest("/likes", invalid.inactiveUser, NotFoundInstance);
        });
        test(`User should NOT be able to superlike without a premium account`, async () => {
            await testPOSTRequest("/likes", invalid.nonPremium, UpgradeYourAccountInstance);
        });
        test(`User should be able to like another user`, async () => {
            await testPOSTRequest("/likes", valid, SuccessResponse);
        });
        test(`User should NOT be able to like already liked user`, async () => {
            await testPOSTRequest("/likes", valid, ForbiddenInstance);
        });
        test(`User should NOT be able to like already liked user`, async () => {
            await testPOSTRequest("/likes", { ...valid, judgedUserId: "5" }, getMatchedResponse, 201);
        });
    });
});
