import { TEST_USER_EMAIL } from "../../config/env.config";

export const validFileFormat = "avatar123.jpg";

export const invalidFileFormat = "avatar123.bmp";

export const invalidCreateUserBody = {};

export const validCreateUserBody = {
    name: "Pawel",
    surname: "Kica",
    email: TEST_USER_EMAIL,
    password: "password1!P",
    passwordRepetition: "password1!P",
    birthday: "2003-02-13",
    longitude: "170.123",
    latitude: "50.213",
    showMeGender: "Male",
    gender: "Male",
    sexualOrientation: ["Gay", "Lesbian", "Heterosexual"],
};

export const validCreateUserResponse = {
    name: "Pawel",
    surname: "Kica",
    email: TEST_USER_EMAIL,
    birthday: "2003-02-13T00:00:00.000Z",
    active: false,
};
