import { testPOSTRequest } from "../helpers/testEndpoint";
import { EmailAlreadyExistsInstance, InvalidFileFormatInstance, InvalidRequestedBodyInstance, PhotoRequiredInstance } from "../data/config";
import { invalidCreateUserBody, validCreateUserBody, validCreateUserResponse, invalidFileFormat, validFileFormat } from "../data/users";
import { expectUploadFilesToExists } from "../helpers/customExceptions";

describe("AUTHENTICATION", () => {
    test(`User should not be able to create account with invalid body`, async () => {
        await testPOSTRequest("/users", invalidCreateUserBody, InvalidRequestedBodyInstance);
    });
    test(`User should not be able to create account with valid body but without at least one photo`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, PhotoRequiredInstance);
    });
    test(`User should not be able to create account with valid body but with file in invalid format`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, InvalidFileFormatInstance, undefined, invalidFileFormat);
    });
    test(`User should be able to create account with valid body`, async () => {
        const res = await testPOSTRequest("/users", validCreateUserBody, validCreateUserResponse, 201, validFileFormat);
        expectUploadFilesToExists(res);
    });
    test(`User should not be able to create account with email that already exists in database`, async () => {
        await testPOSTRequest("/users", validCreateUserBody, EmailAlreadyExistsInstance);
    });
});
