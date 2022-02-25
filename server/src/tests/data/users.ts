import { TEST_USER_EMAIL } from "../../config/env.config";
// import FormData from "form-data";
// import path from "path";
// import fse from "fs-extra";

export const invalidCreateUserBody = {};

export const validCreateUserBody = {
    name: "Pawel",
    surname: "Kica",
    email: TEST_USER_EMAIL,
    password: "1password1!P",
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

// export const formData: FormData = (() => {
//     // console.log(fse.createReadStream(path.join(__dirname, "random123.jpg")));
//     const body = new FormData();
//     // body.append("name", validCreateUserBody.name);
//     // body.append("surname", validCreateUserBody.surname);
//     // body.append("email", validCreateUserBody.email);
//     // body.append("password", validCreateUserBody.password);
//     // body.append("passwordRepetition", validCreateUserBody.passwordRepetition);
//     // body.append("birthday", validCreateUserBody.birthday);
//     // body.append("longitude", validCreateUserBody.longitude);
//     // body.append("latitude", validCreateUserBody.latitude);
//     // body.append("showMeGender", validCreateUserBody.showMeGender);
//     // body.append("gender", validCreateUserBody.gender);
//     // body.append("sexualOrientation", JSON.stringify(validCreateUserBody.sexualOrientation));
//     body.append("avatar", fse.createReadStream(path.join(__dirname, "random123.jpg")));

//     return body;
// })();
