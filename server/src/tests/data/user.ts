import { TEST_USER_EMAIL } from "../../config/env.config";

const newEmail = {
    email: TEST_USER_EMAIL,
};

export const basicUserData = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    birthday: "2003-02-13T00:00:00.000Z",
    active: false,
    accountType: "Default",
};

export const newBasicUserData = {
    ...basicUserData,
    ...newEmail,
};

export const newBasicActiveUserData = {
    ...newBasicUserData,
    ...{ active: true },
};

const email = {
    email: "devKica777@gmail.com",
};
export const invalidEmailSchema = {
    email: "@devKica@.com",
};

const password = {
    password: "Password1!",
};
const passwordRepetition = {
    passwordRepetition: password.password,
};

const invalidPassword = {
    password: "invalidPassword1!",
};
const invalidOldPassword = {
    oldPassword: "invalidOldPassword1!",
};

const invalidPasswordSchema = {
    password: "invalidPassword1",
};
const invalidOldPasswordSchema = {
    oldPassword: invalidPasswordSchema.password,
};

const newPassword = {
    password: `new${password.password}`,
};
const newPasswordRepetition = {
    passwordRepetition: newPassword.password,
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

const nonExistentEmail = {
    email: "example@gmail.com",
};

export const createUserBody = {
    valid: validCreateUserBody,
    invalid: {
        schema: invalidSchemaCreateUserBody,
    },
};

export const loginBody = {
    valid: {
        ...email,
        ...password,
    },
    invalid: {
        credentials: {
            ...email,
            ...invalidPassword,
        },
        schema: {
            ...invalidEmailSchema,
            ...invalidPasswordSchema,
        },
    },
};

export const loginCredentials = loginBody.valid;

export const newEmailLoginCredentials = {
    ...newEmail,
    ...password,
};
export const newPasswordLoginCredentials = {
    ...email,
    ...newPassword,
};
export const newEmailAndPasswordLoginCredentials = {
    ...newEmail,
    ...newPassword,
};

export const changeEmailBody = {
    valid: newEmailAndPasswordLoginCredentials,
    invalid: {
        password: {
            ...newEmail,
            ...invalidPassword,
        },
        emailAlreadyExists: {
            ...email,
            ...newPassword,
        },
    },
};

export const changePasswordBody = {
    valid: {
        oldPassword: password.password,
        ...newPassword,
        ...newPasswordRepetition,
    },
    invalid: {
        schema: {
            ...invalidOldPasswordSchema,
            ...invalidPasswordSchema,
        },
        oldPassword: {
            ...invalidOldPassword,
            ...newPassword,
            ...newPasswordRepetition,
        },
    },
};

export const passwordResetBody = {
    valid: {
        ...newEmail,
    },
    invalid: {
        nonExistentEmail: {
            ...nonExistentEmail,
        },
        schema: {
            ...invalidEmailSchema,
        },
    },
};

export const setNewPasswordBody = {
    valid: {
        ...password,
        ...passwordRepetition,
    },
    invalid: {
        schema: {
            ...invalidPasswordSchema,
        },
    },
};
