import { testPOSTRequest } from "../helpers/testEndpoint";
import {
    EmailAlreadyExistsInstance,
    InvalidCredentialsInstance,
    InvalidFileFormatInstance,
    InvalidRequestedBodyInstance,
    InvalidRequestedLoginBodyInstance,
    PhotoRequiredInstance,
} from "../data/config";
import {
    invalidCreateUserBody,
    validCreateUserBody,
    generalUserDataResponse,
    invalidFileFormat,
    validFileFormat,
    invalidLoginBody,
    invalidLoginCredentials,
    validLoginCredentials,
} from "../data/users";
import { expectUploadFilesToExists } from "../helpers/customExceptions";
import { testUserAuthActiveEndpoint, testUserAuthEndpoint } from "../helpers/specifiedEndpointsTests";
import { removeTestTokens, setUserId } from "../helpers/globalHelpers";

describe("AUTHENTICATION", () => {
    describe("CREATING AN ACCOUNT", () => {
        test(`User should NOT be able access USER protected routes before creating account`, async () => {
            await testUserAuthEndpoint(false);
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
            const res = await testPOSTRequest("/users", validCreateUserBody, generalUserDataResponse, 201, validFileFormat);
            expectUploadFilesToExists(res);
            setUserId(res);
        });
        test(`User should NOT be able to create account with email that already exists in database`, async () => {
            await testPOSTRequest("/users", validCreateUserBody, EmailAlreadyExistsInstance);
        });
        test(`User should be able to access USER protected routes after creating an account`, async () => {
            await testUserAuthEndpoint(true);
        });
        test(`User should NOT be able to access ACTIVE USER protected routes after creating an account`, async () => {
            await testUserAuthActiveEndpoint(false);
            removeTestTokens();
        });
        test("User should NOT be able to access USER and USER ACTIVE protected routes after removing tokens", async () => {
            await testUserAuthEndpoint(false);
        });
    });
    describe("LOGGING IN", () => {
        test("User should NOT be able to pass schema validation with invalid body", async () => {
            await testPOSTRequest("/users/login", invalidLoginBody, InvalidRequestedLoginBodyInstance);
        });
        test("User should NOT be able to login with invalid credentials", async () => {
            await testPOSTRequest("/users/login", invalidLoginCredentials, InvalidCredentialsInstance);
        });
        test("User should be able to login with valid credentials", async () => {
            await testPOSTRequest("/users/login", validLoginCredentials, generalUserDataResponse, 200);
        });
        test(`User should be able to access USER protected routes after logging in`, async () => {
            await testUserAuthEndpoint(true);
        });
        test(`User should NOT be able to access ACTIVE USER protected routes after logging in to account with unverified email`, async () => {
            await testUserAuthActiveEndpoint(false);
        });
    });
    describe("USER PROTECTED ROUTES", () => {});
});
