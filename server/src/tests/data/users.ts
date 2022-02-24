import { TEST_USER_EMAIL } from "../../config/env.config";

export const unvalidCreateUserBody = {};

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
    birthday: "2003-02-13T00:00:00.000Z",
    email: "unicorn.user.777@gmail.com",
    name: "Pawel",
    surname: "Kica",
    active: false,
};
