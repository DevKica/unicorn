import { testDELETERequest, testPATCHRequest, testPOSTRequest } from "../helpers/testEndpoint";
import {
    EmailAlreadyExistsInstance,
    ForbiddenInstance,
    InvalidChangePasswordBodyInstance,
    InvalidCredentialsInstance,
    InvalidEmailBodyInstance,
    InvalidFileFormatInstance,
    InvalidPasswordSchemaInstance,
    InvalidRequestedCreateUserBodyInstance,
    InvalidRequestedLoginBodyInstance,
    InvalidSetNewPasswordBodyInstance,
    NotFoundInstance,
    PhotoRequiredInstance,
    UnauthorizedInstance,
} from "../data/config";
import {
    basicUserData,
    changeEmailBody,
    changePasswordBody,
    createUserBody,
    deleteAccountBody,
    loginBody,
    newBasicActiveUserData,
    newBasicUserData,
    newEmailAndPasswordLoginCredentials,
    newEmailLoginCredentials,
    newPasswordLoginCredentials,
    passwordResetBody,
    setNewPasswordBody,
} from "../data/user.auth";
import { expectUserPhotosToExists } from "../helpers/customExpectations";
import { testUserAuthActiveEndpoint, testUserAuthEndpoint } from "../helpers/specifiedEndpointsTests";
import { removeAuthTokens, removeGlobals, setUserId } from "../helpers/globalHelpers";
import { prepareEmailVericationToken, preparePasswordResetToken } from "../helpers/prepareEmailToken";
import { invalidPhotoFile, validPhotoFile } from "../data/files";
import { removeTables } from "../../prisma/cleanup/cleanUpDev";
import { SuccessResponse } from "../../utils/responses/main";

describe("AUTHENTICATION", () => {
    beforeAll(async () => {
        await removeTables();
    });
    afterAll(() => {
        removeGlobals();
    });
    describe("CREATING AN ACCOUNT", () => {
        const { valid, invalid } = createUserBody;

        test(`User should NOT be able access USER protected routes before creating account`, async () => {
            await testUserAuthEndpoint(false);
        });
        test(`User should NOT be able pass create user schema validation with invalid body`, async () => {
            await testPOSTRequest("/users", invalid.schema, InvalidRequestedCreateUserBodyInstance);
        });
        test(`User should NOT be able to create account with valid body but without at least one photo`, async () => {
            await testPOSTRequest("/users", valid, PhotoRequiredInstance);
        });
        test(`User should NOT be able to create account with valid body but with file in invalid format`, async () => {
            await testPOSTRequest("/users", valid, InvalidFileFormatInstance, undefined, invalidPhotoFile);
        });
        test(`User should be able to create account with valid body, images should be saved correctly`, async () => {
            const res = await testPOSTRequest("/users", valid, basicUserData, 201, validPhotoFile);
            expectUserPhotosToExists(res);
            setUserId(res);
        });
        test(`User should NOT be able to create account with email that already exists in database`, async () => {
            await testPOSTRequest("/users", valid, EmailAlreadyExistsInstance);
        });
        test(`User should be able to access USER protected routes after creating an account`, async () => {
            await testUserAuthEndpoint(true);
        });
        test(`User should NOT be able to access ACTIVE USER protected routes after creating an account`, async () => {
            await testUserAuthActiveEndpoint(false);
            removeAuthTokens();
        });
        test("User should NOT be able to access USER protected routes after removing tokens", async () => {
            await testUserAuthEndpoint(false);
        });
    });
    describe("LOGGING IN", () => {
        const { valid, invalid } = loginBody;

        test("User should NOT be able to pass schema validation with invalid body", async () => {
            await testPOSTRequest("/users/login", invalid.schema, InvalidRequestedLoginBodyInstance);
        });
        test("User should NOT be able to login with invalid credentials", async () => {
            await testPOSTRequest("/users/login", invalid.credentials, InvalidCredentialsInstance);
        });
        test("User should be able to login with valid credentials", async () => {
            await testPOSTRequest("/users/login", valid, basicUserData, 200);
        });
        test(`User should be able to access USER protected routes after logging in`, async () => {
            await testUserAuthEndpoint(true);
        });
        test(`User should NOT be able to access ACTIVE USER protected routes after logging in to account with unverified email`, async () => {
            await testUserAuthActiveEndpoint(false);
        });
    });
    describe("USER ONLY PROTECTED ROUTES", () => {
        describe("Change password", () => {
            const { valid, invalid } = changePasswordBody;

            test(`User should NOT be able to pass change password schema validation with invalid body`, async () => {
                await testPATCHRequest("/users/password", invalid.schema, InvalidChangePasswordBodyInstance);
            });
            test(`User should NOT be able to change password with invalid old password`, async () => {
                await testPATCHRequest("/users/password", invalid.oldPassword, InvalidCredentialsInstance);
            });
            test(`User should be able to change  password with valid body`, async () => {
                await testPATCHRequest("/users/password", valid, SuccessResponse);
            });
            test(`User should NOT be able to access USER protected routes after changing password`, async () => {
                await testUserAuthEndpoint(false);
            });
            test("User should NOT be able to login with old password", async () => {
                await testPOSTRequest("/users/login", loginBody.valid, InvalidCredentialsInstance);
            });
            test("User should be able to login with new password", async () => {
                await testPOSTRequest("/users/login", newPasswordLoginCredentials, basicUserData, 200);
            });
        });
        describe("Change and verify email", () => {
            const { valid, invalid } = changeEmailBody;

            test(`User should NOT be able to change email on email that already exists in database`, async () => {
                await testPATCHRequest("/users/email", invalid.emailAlreadyExists, EmailAlreadyExistsInstance);
            });
            test(`User should NOT be able to change email with invalid password`, async () => {
                await testPATCHRequest("/users/email", invalid.password, InvalidCredentialsInstance);
            });
            test(`User should be able to change email with valid body`, async () => {
                await testPATCHRequest("/users/email", valid, newBasicUserData, 200);
            });
            test(`User should be able to resend email verification with previous request`, async () => {
                await testPOSTRequest("/users/resend-verification-email", {}, SuccessResponse);
            });
            test(`User should be able to verify email with valid link`, async () => {
                await testPATCHRequest(`/users/verify-email/${await prepareEmailVericationToken()}`, {}, SuccessResponse, 200);
            });
            test(`User should NOT be able to access USER protected routes after verifying email`, async () => {
                await testUserAuthEndpoint(false);
            });
            test(`User should be able to access ACTIVE USER protected routes after logging in to active account`, async () => {
                await testPOSTRequest("/users/login", newEmailAndPasswordLoginCredentials, newBasicActiveUserData, 200);
                await testUserAuthActiveEndpoint(true);
            });
            test(`User should NOT be able to resend email verification without previous request`, async () => {
                await testPOSTRequest("/users/resend-verification-email", {}, NotFoundInstance);
            });
        });
        describe("Reset password", () => {
            const { valid, invalid } = passwordResetBody;

            test(`User should NOT be able to send reset password request to email that does not exists`, async () => {
                await testPOSTRequest("/users/reset-password", invalid.nonExistentEmail, NotFoundInstance);
            });
            test(`User should NOT be able to send reset password request to an email that does not match schema`, async () => {
                await testPOSTRequest("/users/reset-password", invalid.schema, InvalidEmailBodyInstance);
            });
            test(`User should be able to send reset password request to valid email`, async () => {
                await testPOSTRequest("/users/reset-password", valid, SuccessResponse);
            });
        });
        describe("Set new password from email", () => {
            const { valid, invalid } = setNewPasswordBody;

            test(`User should NOT be able to access set new password route without valid token`, async () => {
                await testPOSTRequest("/users/verify-link/123", {}, ForbiddenInstance);
            });
            test(`User should NOT be able to set new password with valid link but invalid body`, async () => {
                await testPATCHRequest(`/users/new-password/${await preparePasswordResetToken()}`, invalid.schema, InvalidSetNewPasswordBodyInstance);
            });
            test(`User should be able to set new password with valid link`, async () => {
                await testPATCHRequest(`/users/new-password/${await preparePasswordResetToken()}`, valid, SuccessResponse);
            });
            test(`User should NOT be able to login with old password`, async () => {
                await testPOSTRequest("/users/login", newEmailAndPasswordLoginCredentials, InvalidCredentialsInstance);
            });
            test(`User should be able to login with new password`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, newBasicActiveUserData, 200);
            });
        });
        describe("Log out", () => {
            test(`User should be able to log out`, async () => {
                await testDELETERequest("/sessions", {}, SuccessResponse);
            });
            test(`User should NOT be able to access USER protected routes after logging out`, async () => {
                await testDELETERequest("/sessions", {}, UnauthorizedInstance);
            });
            test(`User should be able to delete all sessions`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, newBasicActiveUserData, 200);
                await testDELETERequest("/sessions/all", {}, SuccessResponse);
            });
            test(`User should NOT be able to access USER protected routes deleting all sessions`, async () => {
                await testUserAuthEndpoint(false);
            });
        });
        describe("Delete account", () => {
            const { valid, invalid } = deleteAccountBody;

            test(`Not authenticated user should NOT be able to delete account`, async () => {
                await testDELETERequest("/users", valid, UnauthorizedInstance);
            });
            test(`User should NOT be able to pass password schema with invalid value of it`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, newBasicActiveUserData, 200);
                await testDELETERequest("/users", invalid.schema, InvalidPasswordSchemaInstance);
            });
            test(`User should NOT be able to delete account with invalid password`, async () => {
                await testDELETERequest("/users", invalid.credentials, InvalidCredentialsInstance);
            });
            test(`User should be able to delete account with valid password`, async () => {
                await testDELETERequest("/users", valid, SuccessResponse);
            });
            test(`User should NOT be to login to deleted account`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, InvalidCredentialsInstance);
            });
        });
    });
});
