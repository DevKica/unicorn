import dayjs from "dayjs";

export const mainUser = {
    id: "user1",
    name: "Pawel",
    surname: "Kica",
    email: "devkica777@gmail.com",
    password: "Password1!",
    active: true,
    accountType: "default",
    birthday: new Date("2002-01-10"),
    city: "",
    description: "",
    gender: "Male",
    showMeGender: "All",
    sexualOrientation: ["Heterosexual", "Lesbian"],
    showMeDistance: 50,
    showMeAgeLowerLimit: 18,
    showMeAgeUpperLimit: 24,
    latitude: 55.55,
    longitude: 99.99,
    photos: ["user1-first", "user1-second"],
};

const womanToSeedData = {
    gender: "Female",
    showMeGender: "Male",
    showMeDistance: 50,
    showMeAgeLowerLimit: 18,
    showMeAgeUpperLimit: 30,
    latitude: mainUser.latitude - 0.22,
    longitude: mainUser.longitude,
};

const womenunder24_showMale_showDistance50_inRange = {
    quantity: 25,
    data: womanToSeedData,
};

const womenunder24_showFemale_showDistance50_inRange = {
    quantity: 5,
    data: {
        ...womanToSeedData,
        showMeGender: "Female",
    },
};
const womenunder24_showMale_showDistance10_inRange = {
    quantity: 5,
    data: {
        ...womanToSeedData,
        showMeDistance: 10,
    },
};

const womenunder24_showMale_showDistance50_notInRange = {
    quantity: 5,
    data: {
        ...womanToSeedData,
        latitude: mainUser.latitude + 10,
        longitude: mainUser.longitude + 10,
    },
};

const womenabove24_showMale_showDistance50_inRange = {
    quantity: 5,
    data: {
        ...womanToSeedData,
        birthday: new Date("1990-01-10"),
    },
};

export const generateUsers = (object: { quantity: number; data: any }, start: number) => {
    const result = [];
    for (let i = 0; i < object.quantity; i++) {
        const tmp = `user${start}`;
        result.push({
            id: tmp,
            name: `${tmp}name`,
            surname: `${tmp}surname`,
            email: `${tmp}@gmail.com`,
            password: `AQ1!${tmp}`,
            active: true,
            accountType: "default",
            city: tmp,
            description: tmp,
            photos: [tmp],
            sexualOrientation: ["Heterosexual"],
            birthday: dayjs(new Date(mainUser.birthday)).add(start, "m").toDate(),
            ...object.data,
        });
        start += 1;
    }
    return result;
};

export const generatedwomen_under24_showMale_showDistance50_inRange = generateUsers(womenunder24_showMale_showDistance50_inRange, 2);
// showDistance
export const generatedwomen_under24_showMale_showDistance10_inRange = generateUsers(womenunder24_showMale_showDistance10_inRange, 28);
// not in range
export const generatedwomen_under24_showMale_showDistance50_notInRange = generateUsers(womenunder24_showMale_showDistance50_notInRange, 33);
// show female
export const generatedwomen_under24_showFemale_showDistance50_inRange = generateUsers(womenunder24_showFemale_showDistance50_inRange, 38);
// above 24
export const generatedwomen_above24_showMale_showDistance50_inRange = generateUsers(womenabove24_showMale_showDistance50_inRange, 43);

const users = [
    // not active
    {
        id: "user0",
        name: "user0",
        surname: "user0",
        email: "user0@gmail.com",
        password: "AQ1!user0",
        active: false,
        accountType: "default",
        birthday: new Date("2002-01-10"),
        city: "user0",
        description: "user0",
        photos: ["user0"],
        sexualOrientation: ["Heterosexual"],
        gender: "user0",
        showMeGender: "Female",
        showMeDistance: 50,
        showMeAgeLowerLimit: 18,
        showMeAgeUpperLimit: 30,
        latitude: 55.55,
        longitude: 99.99,
    },
    mainUser,
    ...generatedwomen_under24_showMale_showDistance50_inRange,
    ...generatedwomen_under24_showMale_showDistance10_inRange,
    ...generatedwomen_under24_showMale_showDistance50_notInRange,
    ...generatedwomen_under24_showFemale_showDistance50_inRange,
    ...generatedwomen_above24_showMale_showDistance50_inRange,
];

export default users;
