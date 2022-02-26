import { testPATCHRequest, testPOSTRequest } from "../helpers/testEndpoint";
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
    newGeneralUserDataResponse,
    validChangeEmailBody,
    validLoginCredentials,
    newValidLoginCredentials,
    newActiveGeneralUserDataResponse,
} from "../data/users";
import { expectUploadFilesToExists } from "../helpers/customExceptions";
import { testUserAuthActiveEndpoint, testUserAuthEndpoint } from "../helpers/specifiedEndpointsTests";
import { removeTestTokens, setUserId } from "../helpers/globalHelpers";
import prepareEmailToken from "../helpers/prepareEmailToken";
import { SuccessResponse } from "../../utils/responses/main";

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
        test("User should NOT be able to access USER protected routes after removing tokens", async () => {
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
    describe("RELATED TO EMAILS", () => {
        test(`User should NOT be able to change his email on email that already exists in database`, async () => {
            await testPATCHRequest("/users/email", validLoginCredentials, EmailAlreadyExistsInstance);
        });
        test(`User should be able to change his email with valid body`, async () => {
            await testPATCHRequest("/users/email", validChangeEmailBody, newGeneralUserDataResponse, 200);
        });
        test(`User should be able to verify his email with valid link`, async () => {
            await testPATCHRequest(`/users/auth/verify-email/${await prepareEmailToken()}`, {}, SuccessResponse, 200);
        });
        test(`User should NOT be able to access USER protected routes after verifying his email`, async () => {
            await testUserAuthEndpoint(false);
        });
        test(`User should be able to access ACTIVE USER protected routes after logging in to active account`, async () => {
            await testPOSTRequest("/users/login", newValidLoginCredentials, newActiveGeneralUserDataResponse, 200);
            await testUserAuthActiveEndpoint(true);
        });
    });
});
