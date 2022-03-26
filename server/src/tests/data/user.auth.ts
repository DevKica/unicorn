import { TEST_USER_EMAIL } from "../../config/env.config";
import { mainUser } from "../../prisma/seed/data/main/users";
import { SuccessResponse } from "../../utils/responses/main";
import pureOmit from "../../utils/responses/omit";

export const userOmitProperties = ["id", "createdAt", "subExpiration", "photos"];

export const basicUserData = {
    ...pureOmit(mainUser, [...userOmitProperties, "password"]),
    active: false,
    birthday: "2002-01-10T00:00:00.000Z",
};

export const invalidEmailSchema = `invalid@${mainUser.email}`;

const newEmail = TEST_USER_EMAIL;
const nonExistentEmail = "example@gmail.com";

const newPassword = `new${mainUser.password}`;
const invalidPassword = "InvalidPassword1!";

export const invalidPasswordSchema = "invalidPassword";

export const basicActiveUserData = { ...basicUserData, active: true };

export const basicNewUserData = { ...basicUserData, email: newEmail };

export const basicActiveNewUserData = { ...basicNewUserData, active: true };

export const basicUserDataResponse = {
    data: basicUserData,
    status: 200,
    omit: userOmitProperties,
};

export const basicNewUserResponse = {
    data: basicNewUserData,
    status: 200,
    omit: userOmitProperties,
};

export const basicActiveUserDataResponse = {
    data: basicActiveUserData,
    status: 200,
    omit: userOmitProperties,
};

export const basicActiveNewUserDataResponse = {
    data: basicActiveNewUserData,
    status: 200,
    omit: userOmitProperties,
};

export const invalidSchemaCreateUserBody = {
    name: "123",
    surname: "123",
    email: "devKica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1!",
    birthday: "2010-10-10",
    longitude: "50.50",
    latitude: "50.50.50",
    showMeGender: "All",
    gender: "123",
    sexualOrientation: ["invalid1", "invalid2"],
};

export const validCreateUserBody = {
    ...pureOmit(basicUserData, ["description", "city", "showMeAgeLowerLimit", "showMeAgeUpperLimit", "showMeDistance", "active", "accountType"]),
    password: mainUser.password,
    passwordRepetition: mainUser.password,
    birthday: "2002-01-10",
};

export const createUserData = {
    body: {
        valid: validCreateUserBody,
        invalid: {
            schema: invalidSchemaCreateUserBody,
        },
    },
    response: { ...basicUserDataResponse, status: 201 },
};

export const userLoginData = {
    body: {
        valid: {
            email: mainUser.email,
            password: mainUser.password,
        },
        invalid: {
            credentials: {
                email: mainUser.email,
                password: invalidPassword,
            },
            schema: {
                email: invalidEmailSchema,
                password: invalidPasswordSchema,
            },
        },
    },
    response: basicUserDataResponse,
};

// basic login credentials
export const loginCredentials = userLoginData.body.valid;
// after changing password
export const newPasswordLoginCredentials = { email: mainUser.email, password: newPassword };
// after changing email
export const newEmailAndPasswordLoginCredentials = { email: newEmail, password: newPassword };
// after setting new password to old password
export const newEmailLoginCredentials = { email: newEmail, password: mainUser.password };
// another user
export const secondUserLoginCredentials = { email: "user2@gmail.com", password: "AQ1!user2" };

export const changePasswordData = {
    body: {
        valid: {
            oldPassword: mainUser.password,
            password: newPassword,
            passwordRepetition: newPassword,
        },
        invalid: {
            schema: {
                oldPassword: invalidPassword,
                password: newPassword,
                // passwordRepetition is required
            },
            oldPassword: {
                oldPassword: invalidPassword,
                password: newPassword,
                passwordRepetition: newPassword,
            },
        },
    },
    response: SuccessResponse,
};

export const changeEmailData = {
    body: {
        valid: newEmailAndPasswordLoginCredentials,
        invalid: {
            password: {
                email: newEmail,
                password: invalidPassword,
            },
            emailAlreadyExists: {
                email: mainUser.email,
                password: newPassword,
            },
        },
    },
    response: basicNewUserResponse,
};

export const verifyEmailData = {
    token: {
        valid: "", // valid token is set while testing
        invalid: "invalid",
    },
    response: SuccessResponse,
};

export const passwordResetData = {
    body: {
        valid: {
            email: newEmail,
        },
        invalid: {
            nonExistentEmail: {
                email: nonExistentEmail,
            },
            schema: {
                email: invalidEmailSchema,
            },
        },
    },
    response: SuccessResponse,
};

export const setNewPasswordData = {
    token: {
        valid: "", // valid token is set during testing
        invalid: "invalid",
    },
    body: {
        valid: {
            password: mainUser.password,
            passwordRepetition: mainUser.password,
        },
        invalid: {
            schema: {
                password: invalidPasswordSchema,
            },
        },
    },
    response: SuccessResponse,
};

export const deleteAccountData = {
    body: {
        valid: { password: mainUser.password },
        invalid: {
            schema: {
                password: invalidPasswordSchema,
            },
            credentials: {
                password: invalidPassword,
            },
        },
    },
    response: SuccessResponse,
};
