import { basicActiveUserData } from "./user.auth";

export const updateUserProfileBody = {
    valid: {
        general: {
            name: "Dani",
            surname: "Crabgame",
            description: "steam goes brra",
        },
        matching: {
            showMeGender: "Female",
        },
    },
    invalid: {
        general: {
            name: "1Dani!",
            surname: "!Crabgame1",
        },
        matching: {
            showMeGender: "Invalid value",
        },
    },
};

export const newGeneralUpdateUserData = {
    ...basicActiveUserData,
    ...updateUserProfileBody.valid.general,
};

export const afterFullUpdateUserData = {
    ...newGeneralUpdateUserData,
    ...updateUserProfileBody.valid.matching,
};

export const createLikeBody = {
    valid: {
        judgedUserId: "4",
        typeOfLike: "default",
    },
    invalid: {
        schema: {
            judgedUserId: "1",
            typeOfLike: "superr",
        },
        inactiveUser: {
            judgedUserId: "2",
            typeOfLike: "default",
        },
        nonPremium: {
            judgedUserId: "4",
            typeOfLike: "super",
        },
    },
};

export const getMatchedResponse = {
    name: "Dani and MissFortune",
};
