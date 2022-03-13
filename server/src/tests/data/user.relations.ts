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
            conversationId: "conversation2",
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

export const getConversationsResponse = [
    {
        id: "conversation3",
        name: "Jennifer fanclub",
        members: [
            {
                id: "7",
                name: "Jennifer",
                surname: "Lopez",
            },
            {
                id: "1",
                name: "Dani",
                surname: "Crabgame",
            },
        ],
        messages: [],
        updatedAt: "2022-03-10T21:23:09.006Z",
        createdAt: "2022-03-10T20:48:35.395Z",
    },
    {
        updatedAt: "2022-03-10T21:23:09.006Z",
        createdAt: "2022-03-10T20:48:35.395Z",
        id: "conversation2",
        messages: [
            {
                id: "message1",
                content: "Hi Lopez",
                type: "default",
                isDeleted: false,
                userId: "1",
            },
            {
                id: "message2",
                content: "Hi Pawel",
                type: "default",
                isDeleted: false,
                userId: "7",
            },
        ],
        members: [
            {
                id: "7",
                name: "Jennifer",
                surname: "Lopez",
            },
            {
                id: "1",
                name: "Dani",
                surname: "Crabgame",
            },
        ],
        name: "Pawel and Jennifer",
    },
    {
        id: "cl0gpwaz0265qou8wbbxy02f",
        name: "Dani and Doda",
        updatedAt: "2022-03-10T21:23:09.006Z",
        createdAt: "2022-03-10T20:48:37.835Z",
        members: [
            {
                id: "5",
                name: "Doda",
                surname: "Dorota",
            },
            {
                id: "1",
                name: "Dani",
                surname: "Crabgame",
            },
        ],
        messages: [
            {
                id: "cl0lgpwls0382qou8cew1h3cw",
                userId: "1",
                content: "hello",
                isDeleted: false,
                type: "default",
                createdAt: "2022-03-10T20:48:38.224Z",
            },
            {
                id: "cl0lgpztr0417qou80ycglbpu",
                userId: "1",
                content: "fbcf736e1c5d6b2faf8d25783603606f195dc0db12445e08c8932fcfcb4d7f375cd548e4dbefc9b79dc3fb59834ca76ab1859d73564581ae7207d136786702a11646945322387",
                isDeleted: false,
                type: "photo",
                createdAt: "2022-03-10T20:48:42.399Z",
            },
            {
                id: "cl0lgq0170470qou870q99bxs",
                userId: "1",
                content: "2b3a17dc5a1c0035cee0653238b64e47bb30c35cca78a2dbc8ee917c695cea25458b8310991e5af5a4ca47a8a1bbf6300a167569945396f9f2e2826fe83a3de21646945322652",
                isDeleted: false,
                type: "voice",
                createdAt: "2022-03-10T20:48:42.667Z",
            },
            {
                id: "cl0lgq0qs0502qou8igdgb93q",
                userId: "1",
                content: "9377d0d02cf7ba2949c76a8f82a7bd24919172ecc2555af6a983dd82e2c7c1808bdf79da325af327645d94bb09b17313160d323b842714476cf9c52c6cbb8f1a1646945323572",
                isDeleted: false,
                type: "video",
                createdAt: "2022-03-10T20:48:43.588Z",
            },
        ],
    },
];
