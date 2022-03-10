import { basicActiveUserData } from "./user.auth";
import { MessageType } from "@prisma/client";

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
        success: {
            judgedUserId: "6",
            typeOfLike: "default",
        },
        newPair: {
            judgedUserId: "5",
            typeOfLike: "default",
        },
        reject: {
            judgedUserId: "4",
            typeOfLike: "notInterested",
        },
    },
    invalid: {
        schema: {
            typeOfLike: "superr",
        },
        inactiveUser: {
            judgedUserId: "-1",
            typeOfLike: "default",
        },
        nonPremium: {
            judgedUserId: "3",
            typeOfLike: "super",
        },
    },
};

export const getMatchedResponse = {
    name: "Dani and Doda",
    messages: [],
};

export const createTextMessageBody = {
    valid: {
        content: "hello",
    },
    invalid: {
        schema: {
            content: "",
            conversationId: ["1", "3232"],
        },
        notFoundConversation: {
            content: "hello",
            conversationId: "12345",
        },
        notInConversaionMembers: {
            content: "hello",
            conversationId: "conversation1",
        },
    },
};

export const createMessageResponse = (type: MessageType) => {
    const response = {
        isDeleted: false,
        userId: "1",
        type: "",
    };
    response["type"] = type;

    return response;
};
