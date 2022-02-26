import { testPOSTRequest } from "../helpers/testEndpoint";
import { EmailAlreadyExistsInstance, EmailNotVerifiedInstance, ForbiddenInstance, InvalidFileFormatInstance, InvalidRequestedBodyInstance, PhotoRequiredInstance } from "../data/config";
import { invalidCreateUserBody, validCreateUserBody, validCreateUserResponse, invalidFileFormat, validFileFormat } from "../data/users";
import { expectUploadFilesToExists } from "../helpers/customExceptions";
import { SuccessResponse } from "../../utils/responses/main";

describe("AUTHENTICATION", () => {
    test(`User should NOT be able access USER protected routes`, async () => {
        await testPOSTRequest("/users/auth/", {}, ForbiddenInstance);
    });
    test(`User should NOT be able to create account with invalid body`, async () => {
        await testPOSTRequest("/users", invalidCreateUserBody, InvalidRequestedBodyInstance);
    });
    test(`User should NOT be able to create account with valid body but without at least one photo`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, PhotoRequiredInstance);
    });
    test(`User should NOT be able to create account with valid body but with file in invalid format`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, InvalidFileFormatInstance, undefined, invalidFileFormat);
    });
    test(`User should be able to create account with valid body, images should be saved correctly`, async () => {
        const res = await testPOSTRequest("/users", validCreateUserBody, validCreateUserResponse, 201, validFileFormat);
        expectUploadFilesToExists(res);
    });
    test(`User should NOT be able to create account with email that already exists in database`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, EmailAlreadyExistsInstance);
    });
    test(`Authenticated new user should be able to access USER protected routes`, async () => {
        await testPOSTRequest("/users/auth/", {}, SuccessResponse, 200);
    });
    test(`Authenticated new user should NOT be able to access ACTIVE USER protected routes`, async () => {
        await testPOSTRequest("/users/auth/active", {}, EmailNotVerifiedInstance);
    });
});
