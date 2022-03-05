import { basicActiveUserData } from "./user.auth";

export const updateUserProfileBody = {
    valid: {
        general: {
            name: "Dani",
            surname: "Crabgame",
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
