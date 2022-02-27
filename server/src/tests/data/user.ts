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

export const newBasicUserData = Object.assign(basicUserData, newEmail);

export const newBasicActiveUserData = Object.assign(newBasicUserData, { active: true });

const email = {
    email: "devKica777@gmail.com",
};
const invalidEmailSchema = {
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
    name: "Pawel1",
    surname: "Kica1",
    email: "devkica777@gmail.com",
    password: "Password1!",
    passwordRepetition: "Password1! repetition heh",
    birthday: "2003-02-13",
    longitude: "11.11.11",
    latitude: "-380.21",
    showMeGender: "Malee",
    gender: 10,
    sexualOrientation: ["Gay", "Lesbian", "Heterosexualll"],
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

const invalidEmailBody = {
    email: "pkica123@@gmail.com",
};

export const createUserBody = {
    valid: validCreateUserBody,
    invalid: {
        schema: invalidSchemaCreateUserBody,
    },
};

export const loginBody = {
    valid: Object.assign(email, password),
    invalid: {
        credentials: Object.assign(email, invalidPassword),
        schema: Object.assign(invalidEmailSchema, invalidPasswordSchema),
    },
};

export const changePasswordBody = {
    valid: Object.assign(password, newPassword, newPasswordRepetition),
    invalid: {
        schema: Object.assign(invalidOldPasswordSchema, invalidPasswordSchema),
        oldPassword: Object.assign(invalidOldPassword, newPassword, newPasswordRepetition),
    },
};

export const changeEmailBody = {
    valid: Object.assign(newEmail, newPassword),
    invalid: {
        password: Object.assign(newEmail, invalidPassword),
        emailAlreadyExists: Object.assign(email, newPassword),
    },
};

export const newPasswordLoginCredentials = Object.assign(email, password);

export const newEmailAndPasswordLoginCredentials = Object.assign(newEmail, newPassword);
