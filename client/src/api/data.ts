export const validCreateUserBody = {
  name: "Pawel",
  surname: "Kica",
  email: process.env.REACT_APP_TEST_USER_EMAIL,
  password: "password1!P",
  passwordRepetition: "password1!P",
  birthday: "2003-02-13",
  longitude: "170.123",
  latitude: "50.213",
  showMeGender: "Male",
  gender: "Male",
  sexualOrientation: ["Gay", "Lesbian", "Heterosexual"],
};

export const loginCredentials = [
  {
    email: "devkica777@gmail.com",
    password: "Password1!",
  },
  {
    email: "jennifer@lopez.com",
    password: "JenniferLopez1!",
  },
];
