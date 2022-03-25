import { basicActiveUserData, userOmitProperties } from "./user.auth";

const silverUserData = { ...basicActiveUserData, accountType: "silver" };
const goldUserData = { ...basicActiveUserData, accountType: "gold" };
const blackUserData = { ...basicActiveUserData, accountType: "black" };

export const silverUserDataResponse = {
    data: silverUserData,
    status: 200,
    omit: userOmitProperties,
};

export const goldUserDataResponse = {
    data: goldUserData,
    status: 200,
    omit: userOmitProperties,
};

export const blackUserDataResponse = {
    data: blackUserData,
    status: 200,
    omit: userOmitProperties,
};
