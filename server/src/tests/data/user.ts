import { TEST_USER_EMAIL } from "../../config/env.config";

export const basicUserData = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    birthday: "2003-02-13T00:00:00.000Z",
    active: false,
    accountType: "Default",
};

const email = "devKica777@gmail.com";

const password = "Password1!";

export const invalidEmailSchema = "@devKica@.com";

const invalidPasswordSchema = "invalidPassword1";

const invalidPassword = "invalidPassword1!";

const newEmail = TEST_USER_EMAIL;

const newPassword = `new${password}`;

export const newBasicUserData = {
    ...basicUserData,
    email: newEmail,
};

export const newBasicActiveUserData = {
    ...newBasicUserData,
    active: true,
};

export const invalidSchemaCreateUserBody = {
    name: "777",
    surname: "123",
    email: "devKica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1!",
    birthday: "2003-02-13",
    longitude: "170.123",
    latitude: "50.213",
    showMeGender: "Male",
    gender: "10",
    sexualOrientation: ["empty", "emptyv2"],
};

export const validCreateUserBody = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1!",
    birthday: "2003-02-13",
    longitude: "170.123",
    latitude: "50.123",
    showMeGender: "Male",
    gender: "Male",
    sexualOrientation: ["Gay", "Lesbian", "Heterosexual"],
};

const nonExistentEmail = "example@gmail.com";

export const createUserBody = {
    valid: validCreateUserBody,
    invalid: {
        schema: invalidSchemaCreateUserBody,
    },
};

export const loginBody = {
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
};

export const loginCredentials = loginBody.valid;

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

export const changeEmailBody = {
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
};

export const changePasswordBody = {
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
};

export const passwordResetBody = {
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
};

export const setNewPasswordBody = {
    valid: {
        password,
        passwordRepetition: password,
    },
    invalid: {
        schema: {
            password: invalidPasswordSchema,
        },
    },
};
