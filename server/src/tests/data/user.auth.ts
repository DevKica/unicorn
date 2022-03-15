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

export const invalidEmailSchema = "@devKica@.com";

const email = "devKica777@gmail.com";

const nonExistentEmail = "example@gmail.com";

const password = "Password1!";

export const invalidPasswordSchema = "invalidPassword1";

const invalidPassword = "invalidPassword1!";

const newEmail = TEST_USER_EMAIL;

const newPassword = `new${password}`;

const basicActiveUserData = {
    ...basicUserData,
    active: true,
};

const basicNewUserData = {
    ...basicUserData,
    email: newEmail,
};

const basicActiveNewUserData = {
    ...basicNewUserData,
    active: true,
};

export const basicUserDataResponse = {
    data: basicUserData,
    status: 200,
    omit: ["id", "createdAt", "subExpiration", "photos"],
};

export const basicNewUserResponse = {
    data: basicNewUserData,
    status: 200,
    omit: ["id", "createdAt", "subExpiration", "photos"],
};

export const basicActiveUserDataResponse = {
    data: basicActiveUserData,
    status: 200,
    omit: ["id", "createdAt", "subExpiration", "photos"],
};

export const basicActiveNewUserDataResponse = {
    data: basicActiveNewUserData,
    status: 200,
    omit: ["id", "createdAt", "subExpiration", "photos"],
};

export const invalidSchemaCreateUserBody = {
    name: "777",
    surname: "123",
    email: "devKica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1!",
    birthday: "2003-02-13",
    longitude: "170.123",
    latitude: "50.50.12",
    showMeGender: "All",
    gender: "10",
    sexualOrientation: ["empty", "emptyv2"],
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

export const loginCredentials = userLoginData.body.valid;

export const newEmailLoginCredentials = {
    email: newEmail,
    password,
};
export const newPasswordLoginCredentials = {
    email,
    password: newPassword,
};
export const newEmailAndPasswordLoginCredentials = {
    email: newEmail,
    password: newPassword,
};

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
        valid: "", // valid token is set during testing
        invalid: "invalidToken",
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
        valid: "",
        invalid: "invalid123",
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
