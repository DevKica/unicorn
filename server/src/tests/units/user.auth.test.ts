import { removeTables } from "../../prisma/cleanup/cleanUpDev";
import { SuccessResponse } from "../../utils/responses/main";
import {
    InvalidCreateUserBodyInstance,
    PhotoRequiredInstance,
    InvalidFileFormatInstance,
    EmailAlreadyExistsInstance,
    InvalidCredentialsInstance,
    InvalidLoginBodyInstance,
    InvalidChangePasswordBodyInstance,
    NotFoundInstance,
    ForbiddenInstance,
    InvalidEmailBodyInstance,
    InvalidSetNewPasswordBodyInstance,
    UnauthorizedInstance,
    InvalidPasswordSchemaInstance,
} from "../data/errors";
import { invalidPhotoFile, validPhotoFile } from "../data/files";
import {
    basicUserDataResponse,
    changeEmailData,
    changePasswordData,
    createUserData,
    newEmailAndPasswordLoginCredentials,
    newPasswordLoginCredentials,
    verifyEmailData,
    loginCredentials,
    userLoginData,
    basicActiveNewUserDataResponse,
    passwordResetData,
    newEmailLoginCredentials,
    setNewPasswordData,
    deleteAccountData,
} from "../data/user.auth";
import { checkTheExistenceOfUserPhotos } from "../helpers/customExpectations";
import { removeAuthTokens, removeGlobals, setTestUserId } from "../helpers/globalHelpers";
import { prepareEmailVericationToken, preparePasswordResetToken } from "../helpers/prepareJWTToken";
import { testUserAuthActiveEndpoint, testUserAuthEndpoint } from "../helpers/specifiedEndpointsTests";
import { testDELETERequest, testPATCHRequest, testPOSTRequest } from "../helpers/testEndpoint";

describe("AUTHENTICATION", () => {
    beforeAll(async () => {
        await removeTables();
    });
    afterAll(() => {
        removeGlobals();
    });
    describe("CREATING AN ACCOUNT", () => {
        const { body, response } = createUserData;

        test(`User should NOT be able access USER protected routes before creating account`, async () => {
            await testUserAuthEndpoint(false);
        });
        test(`User should NOT be able pass create user schema validation with invalid body`, async () => {
            await testPOSTRequest("/users", body.invalid.schema, InvalidCreateUserBodyInstance);
        });
        test(`User should NOT be able to create account with valid body but without at least one photo`, async () => {
            await testPOSTRequest("/users", body.valid, PhotoRequiredInstance);
        });
        test(`User should NOT be able to create account with valid body but with file in invalid format`, async () => {
            await testPOSTRequest("/users", body.valid, InvalidFileFormatInstance, invalidPhotoFile);
        });
        test(`User should be able to create account with valid body, images should be saved correctly`, async () => {
            const res = await testPOSTRequest("/users", body.valid, response, validPhotoFile);
            checkTheExistenceOfUserPhotos(res.body.photos, true);
            setTestUserId(res);
        });
        test(`User should NOT be able to create account with email that already exists in database`, async () => {
            await testPOSTRequest("/users", body.valid, EmailAlreadyExistsInstance);
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
        const { body, response } = userLoginData;

        test("User should NOT be able to pass schema validation with invalid body", async () => {
            await testPOSTRequest("/users/login", body.invalid.schema, InvalidLoginBodyInstance);
        });
        test("User should NOT be able to login with invalid credentials", async () => {
            await testPOSTRequest("/users/login", body.invalid.credentials, InvalidCredentialsInstance);
        });
        test("User should be able to login with valid credentials", async () => {
            await testPOSTRequest("/users/login", body.valid, response);
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
            const { body, response } = changePasswordData;

            test(`User should NOT be able to pass change password schema validation with invalid body`, async () => {
                await testPATCHRequest("/users/password", body.invalid.schema, InvalidChangePasswordBodyInstance);
            });
            test(`User should NOT be able to change password with invalid old password`, async () => {
                await testPATCHRequest("/users/password", body.invalid.oldPassword, InvalidCredentialsInstance);
            });
            test(`User should be able to change  password with valid body`, async () => {
                await testPATCHRequest("/users/password", body.valid, response);
            });
            test(`User should NOT be able to access USER protected routes after changing password`, async () => {
                await testUserAuthEndpoint(false);
            });
            test("User should NOT be able to login with old password", async () => {
                await testPOSTRequest("/users/login", loginCredentials, InvalidCredentialsInstance);
            });
            test("User should be able to login with new password", async () => {
                await testPOSTRequest("/users/login", newPasswordLoginCredentials, basicUserDataResponse);
            });
        });
        describe("Change email", () => {
            const { body, response } = changeEmailData;

            test(`User should NOT be able to change email on email that already exists in database`, async () => {
                await testPATCHRequest("/users/email", body.invalid.emailAlreadyExists, EmailAlreadyExistsInstance);
            });
            test(`User should NOT be able to change email with invalid password`, async () => {
                await testPATCHRequest("/users/email", body.invalid.password, InvalidCredentialsInstance);
            });
            test(`User should be able to change email with valid body`, async () => {
                await testPATCHRequest("/users/email", body.valid, response);
            });
        });
        describe("Verify email", () => {
            const { token, response } = verifyEmailData;

            beforeAll(async () => {
                token.valid = await prepareEmailVericationToken();
            });

            test(`User should be able to resend email verification with previous request`, async () => {
                await testPOSTRequest("/users/resend-verification-email", {}, SuccessResponse);
            });
            test(`User should NOT be able to verify email with invalid link`, async () => {
                await testPATCHRequest(`/users/verify-email/${token.invalid}`, {}, ForbiddenInstance);
            });
            test(`User should be able to verify email with valid link`, async () => {
                await testPATCHRequest(`/users/verify-email/${token.valid}`, {}, response);
            });
            test(`User should NOT be able to access USER protected routes after verifying email`, async () => {
                await testUserAuthEndpoint(false);
            });
            test(`User should be able to access ACTIVE USER protected routes after logging in to active account`, async () => {
                // authenticate user
                await testPOSTRequest("/users/login", newEmailAndPasswordLoginCredentials, basicActiveNewUserDataResponse);
                // test
                await testUserAuthActiveEndpoint(true);
            });
            test(`User should NOT be able to resend email verification without previous request`, async () => {
                await testPOSTRequest("/users/resend-verification-email", {}, NotFoundInstance);
            });
        });
        describe("Reset password", () => {
            const { body, response } = passwordResetData;

            test(`User should NOT be able to send reset password request to email that does not exists`, async () => {
                await testPOSTRequest("/users/reset-password", body.invalid.nonExistentEmail, NotFoundInstance);
            });
            test(`User should NOT be able to send reset password request to an email that does not match schema`, async () => {
                await testPOSTRequest("/users/reset-password", body.invalid.schema, InvalidEmailBodyInstance);
            });
            test(`User should be able to send reset password request to valid email`, async () => {
                await testPOSTRequest("/users/reset-password", body.valid, response);
            });
        });
        describe("Set new password from email", () => {
            const { body, response, token } = setNewPasswordData;

            beforeAll(async () => {
                token.valid = await preparePasswordResetToken();
            });

            test(`User should NOT be able to access set new password route without valid token`, async () => {
                await testPOSTRequest(`/users/verify-link/${token.invalid}`, {}, ForbiddenInstance);
            });
            test(`User should NOT be able to set new password with valid link but invalid body`, async () => {
                await testPATCHRequest(`/users/new-password/${token.valid}`, body.invalid.schema, InvalidSetNewPasswordBodyInstance);
            });
            test(`User should be able to set new password with valid link`, async () => {
                await testPATCHRequest(`/users/new-password/${token.valid}`, body.valid, response);
            });
            test(`User should NOT be able to login with old password`, async () => {
                await testPOSTRequest("/users/login", newEmailAndPasswordLoginCredentials, InvalidCredentialsInstance);
            });
            test(`User should be able to login with new password`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, basicActiveNewUserDataResponse);
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
                // authenticate user
                await testPOSTRequest("/users/login", newEmailLoginCredentials, basicActiveNewUserDataResponse);
                // test
                await testDELETERequest("/sessions/all", {}, SuccessResponse);
            });
            test(`User should NOT be able to access USER protected routes deleting all sessions`, async () => {
                await testUserAuthEndpoint(false);
            });
        });
        describe("Delete account", () => {
            const { body, response } = deleteAccountData;

            test(`Not authenticated user should NOT be able to delete account`, async () => {
                await testDELETERequest("/users", body.valid, UnauthorizedInstance);
            });
            test(`User should NOT be able to pass password schema with invalid value of it`, async () => {
                // authenticate user
                await testPOSTRequest("/users/login", newEmailLoginCredentials, basicActiveNewUserDataResponse);
                // test
                await testDELETERequest("/users", body.invalid.schema, InvalidPasswordSchemaInstance);
            });
            test(`User should NOT be able to delete account with invalid password`, async () => {
                await testDELETERequest("/users", body.invalid.credentials, InvalidCredentialsInstance);
            });
            test(`User should be able to delete account with valid password`, async () => {
                await testDELETERequest("/users", body.valid, response);
            });
            test(`User should NOT be to login to deleted account`, async () => {
                await testPOSTRequest("/users/login", newEmailLoginCredentials, InvalidCredentialsInstance);
            });
        });
    });
});
