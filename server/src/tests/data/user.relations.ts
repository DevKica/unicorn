import { MessageType } from "@prisma/client";
import { SuccessResponse } from "../../utils/responses/main";
import formatMatchedUsers from "../helpers/formatMatchedUsers";
import { basicActiveUserData, userOmitProperties } from "./user.auth";
import { generatedwomen_under24_showMale_showDistance50_inRange } from "../../prisma/seed/data/main/users";

const updateGeneralUserData = {
    name: "Dani",
    surname: "Crabgame",
    description: "steam goes brra",
};

const updateMatchingUserData = {
    showMeGender: "Female",
};

const newGeneralUserData = { ...basicActiveUserData, ...updateGeneralUserData };

const newMatchingUserData = { ...newGeneralUserData, ...updateMatchingUserData };

export const generalUpdateUserDataResponse = {
    data: newGeneralUserData,
    status: 200,
    omit: userOmitProperties,
};

export const afterUpdatesUserDataResponse = {
    data: newMatchingUserData,
    status: 200,
    omit: userOmitProperties,
};

export const updateUserProfileData = {
    body: {
        valid: {
            general: updateGeneralUserData,
            matching: updateMatchingUserData,
        },
        invalid: {
            general: {
                name: "Dani1",
                surname: "Crabgame1",
            },
            matching: {
                showMeGender: "invalid",
            },
        },
    },
    response: {
        general: generalUpdateUserDataResponse,
        matching: afterUpdatesUserDataResponse,
    },
};

export const getUserPhotoData = {
    photoName: {
        valid: "user1-first",
        invalid: {
            size: "largeeeeee/user1-first",
            name: "large/invalidName",
        },
    },
};

export const getUsersToMatchResponse = {
    beforeOperations: {
        data: formatMatchedUsers(generatedwomen_under24_showMale_showDistance50_inRange.slice(5, 10)),
        status: 200,
        omit: [],
    },
    afterOperations: {
        data: formatMatchedUsers(generatedwomen_under24_showMale_showDistance50_inRange.slice(9, 14)),
        status: 200,
        omit: [],
    },
};

export const createLikeData = {
    body: {
        valid: {
            newLike: {
                judgedUserId: "user10",
                typeOfLike: "default",
            },
            basic: {
                judgedUserId: "user9",
                typeOfLike: "default",
            },
            newPair: {
                judgedUserId: "user8",
                typeOfLike: "default",
            },
            reject: {
                judgedUserId: "user7",
                typeOfLike: "notInterested",
            },
        },
        invalid: {
            schema: {
                typeOfLike: "invalidTypeOfLike",
            },
            inactiveUser: {
                judgedUserId: "user0",
                typeOfLike: "default",
            },
            nonPremium: {
                judgedUserId: "user15",
                typeOfLike: "super",
            },
        },
    },
    response: {
        basic: SuccessResponse,
        newPair: {
            data: {
                name: "Dani and user8name",
                messages: [],
            },
            status: 201,
            omit: ["id", "createdAt", "updatedAt"],
        },
        reject: SuccessResponse,
    },
};

export const createMessageResponse = (type: MessageType, content = "", conversationId = "conversation1") => {
    const response: { [key: string]: string | boolean } = {
        userId: "user1",
        conversationId,
        type,
        isDeleted: false,
    };
    if (content) {
        response.content = content;
    }

    return response;
};

const textMessageContent = "hello";

export const messageOmitProperties = ["id", "content", "createdAt"];

const createTextMessageResponse = {
    data: createMessageResponse("default", textMessageContent),
    status: 201,
    omit: ["id", "createdAt"],
};

const createPhotoMessageResponse = {
    data: createMessageResponse("photo"),
    status: 201,
    omit: messageOmitProperties,
};

const createVoiceMessageResponse = {
    data: createMessageResponse("voice"),
    status: 201,
    omit: messageOmitProperties,
};

const createVideoMessageResponse = {
    data: createMessageResponse("video"),
    status: 201,
    omit: messageOmitProperties,
};

export const createTextMessageData = {
    body: {
        valid: {
            content: textMessageContent,
            conversationId: "",
        },
        invalid: {
            schema: {
                content: "",
                conversationId: ["invalid", "arrayIsNotAllowed"],
            },
            conversationIdNotFound: {
                content: "Hello",
                conversationId: "conversation0",
            },
            notInConversationMembers: {
                content: "Hello",
                conversationId: "conversation3",
            },
        },
    },
    response: createTextMessageResponse,
};

export const createFileMessageData = {
    body: {
        general: {
            invalid: {
                tooLargeFile: {
                    // valid, too large file in request
                    conversationId: "conversation1",
                    type: "voice",
                },
                schema: {
                    conversationId: "valid",
                    // invalid type
                    type: "info",
                },
            },
        },
        photo: {
            valid: {
                conversationId: "conversation1",
                type: "photo",
            },
        },
        voice: {
            valid: {
                conversationId: "conversation1",
                type: "voice",
            },
        },
        video: {
            valid: {
                conversationId: "conversation1",
                type: "video",
            },
        },
    },
    response: {
        photo: createPhotoMessageResponse,
        voice: createVoiceMessageResponse,
        video: createVideoMessageResponse,
    },
};

export const deleteMessageData = {
    body: {
        valid: {
            messageId: "message1",
        },
        invalid: {
            schema: {
                messageId: ["invalid", "arrayIsNot", "allowed"],
            },
            messageIdNotFound: {
                messageId: "message0",
            },
            someones: {
                messageId: "message2",
            },
        },
    },
    response: {
        data: {
            userId: "user1",
            conversationId: "conversation1",
            content: "",
            type: "default",
            isDeleted: true,
        },
        status: 200,
        omit: ["id", "createdAt"],
    },
};

export const deleteConversationData = {
    body: {
        fileMessage: {
            conversationId: "conversation4",
            type: "photo",
        },
    },
    params: {
        valid: "conversation4",
        invalid: {
            notInConversationMembers: "conversation3",
        },
    },
    response: {
        delete: SuccessResponse,
        fileMessage: {
            data: createMessageResponse("photo", "", "conversation4"),
            status: 201,
            omit: messageOmitProperties,
        },
    },
};

export const renameConversationData = {
    body: {
        valid: {
            conversationId: "conversation1",
            name: "typescript enjoyers",
        },
        invalid: {
            schema: {
                conversationId: "conversation1",
                name: "over 70 characters over 70 characters over 70 characters over 70 charactersover 70 charactersover 70 charactersover 70 characters",
            },
            conversationIdNotFound: {
                conversationId: "conversation0",
                name: "typescript enjoyers",
            },
            notInConversationMembers: {
                conversationId: "conversation3",
                name: "typescript enjoyers",
            },
        },
    },
    response: {
        data: {
            userId: "user1",
            conversationId: "conversation1",
            content: `Conversation name set to "typescript enjoyers"`,
            type: "info",
            isDeleted: false,
        },
        status: 201,
        omit: ["id", "createdAt"],
    },
};

export const getConversationsResponse = [
    {
        id: "conversation1",
        // before rename - name: "user1 and user2"
        name: "typescript enjoyers",
        updatedAt: "",
        createdAt: "",
        members: [
            {
                id: "user1",
                name: "Dani",
                surname: "Crabgame",
            },
            {
                id: "user2",
                name: "user2name",
                surname: "user2surname",
            },
        ],

        messages: [
            {
                id: "message1",
                userId: "user1",
                content: "",
                type: "default",
                isDeleted: true,
                createdAt: "",
            },
            {
                id: "message2",
                userId: "user2",
                content: "Hi Pawel",
                type: "default",
                isDeleted: false,
                createdAt: "",
            },
            {
                id: "",
                userId: "user1",
                content: "photoFileName",
                type: "photo",
                isDeleted: false,
                createdAt: "",
            },
            {
                id: "",
                userId: "user1",
                content: "voiceFileName",
                type: "voice",
                isDeleted: false,
                createdAt: "",
            },
            {
                id: "",
                userId: "user1",
                content: "videoFileName",
                type: "video",
                isDeleted: false,
                createdAt: "",
            },
            {
                id: "",
                userId: "user1",
                content: `Conversation name set to "typescript enjoyers"`,
                type: "info",
                isDeleted: false,
                createdAt: "",
            },
        ],
    },
    {
        id: "",
        name: "Dani and user8name",
        updatedAt: "",
        createdAt: "",
        members: [
            {
                id: "user1",
                name: "Dani",
                surname: "Crabgame",
            },
            {
                id: "user8",
                name: "user8name",
                surname: "user8surname",
            },
        ],
        messages: [
            {
                id: "",
                userId: "user1",
                content: textMessageContent,
                type: "default",
                isDeleted: false,
                createdAt: "",
            },
        ],
    },
    {
        id: "conversation2",
        name: "user1 and user3",
        updatedAt: "",
        createdAt: "",
        members: [
            {
                id: "user1",
                name: "Dani",
                surname: "Crabgame",
            },
            {
                id: "user3",
                name: "user3name",
                surname: "user3surname",
            },
        ],
        messages: [],
    },
];
