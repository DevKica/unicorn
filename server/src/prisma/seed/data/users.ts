import argon2 from "argon2";

const users = [
    {
        id: "1",
        name: "Pawel",
        surname: "Kica",
        email: "devkica777@gmail.com",
        password: "Password1!",
        active: true,
        accountType: "Default",
        birthday: "2002-01-01T00:00:00.000Z",
        city: "",
        description: "",
        gender: "Male",
        showMeGender: "Female",
        sexualOrientation: ["Heterosexual", "Lesbian"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 24,
        latitude: "50.05",
        longitude: "100.01",
        photos: ["pawelKica1", "pawelKica2"],
    },
    // show me oposite gender, age 18-30 all
    {
        id: "2",
        name: "Kacper",
        surname: "Ksiazek",
        email: "kacper@ksiazek.com",
        password: "KacperKsiazek1!",
        active: false,
        accountType: "Default",
        birthday: "2002-01-01T00:00:00.000Z",
        city: "Gorzen",
        description: "I'm the greatest fighter of this fucking institution of all time",
        gender: "The warrior of gorzen",
        showMeGender: "Female",
        sexualOrientation: ["Heterosexual"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 30,
        latitude: "50.05",
        longitude: "100.01",
        photos: ["kacperKsiazek1", "kacperKsiazek2"],
    },
    {
        id: "3",
        name: "Elon",
        surname: "Musk",
        email: "elon@musk.com",
        password: "ElonMusk1!",
        active: true,
        accountType: "Default",
        birthday: "2002-01-01T00:00:00.000Z",
        city: "California",
        description: "Space-x enjoyer",
        gender: "Male",
        showMeGender: "Female",
        sexualOrientation: ["Heterosexual"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 30,
        latitude: "50.05",
        longitude: "100.01",
        photos: ["elonMusk1"],
    },
    {
        id: "4",
        name: "Madison",
        surname: "Beer",
        email: "madison@beer.com",
        password: "MadisonBeer1!",
        active: true,
        accountType: "Default",
        birthday: "2002-01-01T00:00:00.000Z",
        city: "New York",
        description: "I am a part time singer, I was born in Jericho, currently I am looking for someone to go out for a drink",
        gender: "Female",
        showMeGender: "Male",
        sexualOrientation: ["Heterosexual"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 30,
        latitude: "50.05",
        longitude: "100.01",
        photos: ["madisonBeer1"],
    },
    {
        id: "5",
        name: "Miss",
        surname: "Fortune",
        email: "miss@fortune.com",
        password: "MissFortune1!",
        active: true,
        accountType: "Default",
        birthday: "2002-01-01T00:00:00.000Z",
        city: "Aram",
        description: "For demacia",
        gender: "Female",
        showMeGender: "Male",
        sexualOrientation: ["Heterosexual"],
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 30,
        latitude: "50.05",
        longitude: "100.01",
        photos: ["missFortune1"],
    },
];

users.forEach(async (e) => {
    e.password = await argon2.hash(e.password);
});

export default users;
