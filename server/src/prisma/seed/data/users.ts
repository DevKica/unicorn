import argon2 from "argon2";

const users = [
    {
        id: "1",
        name: "Pawel",
        email: "devkica777@gmail.com",
        surname: "Kica",
        accountType: "Default",
        active: true,
        birthday: "2003-02-13T00:00:00.000Z",
        city: "",
        password: "Password1!",
        description: "",
        gender: "Male",
        latitude: "50.123",
        longitude: "170.123",
        sexualOrientation: ["Gay", "Lesbian", "Heterosexual"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 23,
        showMeGender: "Male",
        photos: ["pawelKica1", "pawelKica2"],
    },
];

users.forEach(async (e) => {
    e.password = await argon2.hash(e.password);
});

export default users;
