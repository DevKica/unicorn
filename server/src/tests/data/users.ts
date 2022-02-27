import { valid } from "joi";
import { TEST_USER_EMAIL } from "../../config/env.config";

export const validFileFormat = "avatar123.jpg";

export const invalidFileFormat = "avatar123.bmp";

export const invalidCreateUserBody = {};

export const validCreateUserBody = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    password: "password1!P",
    passwordRepetition: "password1!P",
    birthday: "2003-02-13",
    longitude: "170.123",
    latitude: "50.213",
    showMeGender: "Male",
    gender: "Male",
    sexualOrientation: ["Gay", "Lesbian", "Heterosexual"],
};

export const generalUserDataResponse = {
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    birthday: "2003-02-13T00:00:00.000Z",
    active: false,
    accountType: "Default",
};

export const invalidLoginBody = {};

export const validLoginCredentials = {
    email: "devkica777@gmail.com",
    password: validCreateUserBody.password,
};

const { email: validEmail, password: validPassword } = validLoginCredentials;

export const invalidLoginCredentials = {
    email: "devkica777@gmail.com",
    password: `${validLoginCredentials.password}1`,
};

export const newGeneralUserDataResponse = {
    ...generalUserDataResponse,
    email: TEST_USER_EMAIL,
};

export const newActiveGeneralUserDataResponse = {
    ...newGeneralUserDataResponse,
    active: true,
};

export const invalidChangePasswordBody = {
    oldPassword: invalidLoginCredentials.password,
    password: "newPassword1!",
    passwordRepetition: "newPassword1!",
};

export const validChangePasswordBody = {
    ...invalidChangePasswordBody,
    oldPassword: validLoginCredentials.password,
};
const { password: newPassword } = validChangePasswordBody;

export const newPasswordLoginCredentials = {
    email: validEmail,
    password: newPassword,
};

export const validChangeEmailBody = {
    email: TEST_USER_EMAIL,
    password: newPassword,
};

const { email: newEmail } = validChangeEmailBody;

export const newEmailAndPasswordLoginCredentials = {
    email: newEmail,
    password: newPassword,
};
