import { TEST_USER_EMAIL } from "../../config/env.config";

export const basicUserData = {
    accountType: "Default",
    active: false,
    birthday: "2002-01-01T00:00:00.000Z",
    city: "",
    description: "",
    email: "devkica777@gmail.com",
    gender: "Male",
    longitude: 100.01,
    latitude: 50.05,
    name: "Pawel",
    sexualOrientation: ["Heterosexual", "Lesbian"],
    showMeDistance: 50,
    showMeAgeLowerLimit: 18,
    showMeAgeUpperLimit: 24,
    showMeGender: "All",
    surname: "Kica",
};

export const invalidEmailSchema = "@devKica@.com";

const email = "devKica777@gmail.com";

const nonExistentEmail = "example@gmail.com";

const password = "Password1!";

export const invalidPasswordSchema = "invalidPassword1";

const invalidPassword = "invalidPassword1!";

const newEmail = TEST_USER_EMAIL;

const newPassword = `new${password}`;

export const activeBasicUserData = {
    ...basicUserData,
    active: true,
};

export const newBasicUserData = {
    ...basicUserData,
    email: newEmail,
};

export const basicActiveUserData = {
    ...basicUserData,
    active: true,
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

export const deleteAccountBody = {
    valid: { password },
    invalid: {
        schema: {
            password: invalidPasswordSchema,
        },
        credentials: {
            password: invalidPassword,
        },
    },
};
