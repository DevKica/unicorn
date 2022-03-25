import { TEST_USER_EMAIL } from "../../config/env.config";
import { SuccessResponse } from "../../utils/responses/main";

export const basicUserData = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    active: false,
    accountType: "default",
    birthday: "2002-01-01T00:00:00.000Z",
    description: "",
    gender: "Male",
    city: "",
    sexualOrientation: ["Heterosexual", "Lesbian"],
    showMeGender: "All",
    showMeAgeLowerLimit: 18,
    showMeAgeUpperLimit: 24,
    showMeDistance: 50,
    longitude: 100.01,
    latitude: 50.05,
};

const email = "devKica777@gmail.com";
const newEmail = TEST_USER_EMAIL;
const nonExistentEmail = "example@gmail.com";
export const invalidEmailSchema = "dev@Kica@gmail.com";

const password = "Password1!";
const newPassword = `new${password}`;
const invalidPassword = "InvalidPassword1!";

export const invalidPasswordSchema = "invalidPassword1";

export const basicActiveUserData = { ...basicUserData, active: true };

export const basicNewUserData = { ...basicUserData, email: newEmail };

export const basicActiveNewUserData = { ...basicNewUserData, active: true };

export const userOmitProperties = ["id", "createdAt", "subExpiration", "photos"];

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
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1!",
    birthday: "2002-01-01",
    longitude: 100.01,
    latitude: 50.05,
    showMeGender: "All",
    gender: "Male",
    sexualOrientation: ["Heterosexual", "Lesbian"],
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
            email,
            password,
        },
        invalid: {
            credentials: {
                email,
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
export const newPasswordLoginCredentials = { email, password: newPassword };
// after changing email
export const newEmailAndPasswordLoginCredentials = { email: newEmail, password: newPassword };
// after setting new password to old password
export const newEmailLoginCredentials = { email: newEmail, password };
// another user
export const secondUserLoginCredentials = { email: "jennifer@lopez.com", password: "JenniferLopez1!" };

export const changePasswordData = {
    body: {
        valid: {
            oldPassword: password,
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
                email,
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
            password,
            passwordRepetition: password,
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
        valid: { password },
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
