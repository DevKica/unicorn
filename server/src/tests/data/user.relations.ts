import { MessageType } from "@prisma/client";
import { femalesUnder24showMale, femalesUnder24ShowAll } from "../../prisma/seed/data/users";
import { SuccessResponse } from "../../utils/responses/main";
import formatMatchedUsers from "../helpers/formatMatchedUsers";
import { basicActiveUserData, userOmitProperties } from "./user.auth";

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
                name: "1Dani!",
                surname: "!Crabgame1",
            },
            matching: {
                showMeGender: "Invalid value",
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
        valid: "pawelKica1",
        invalid: {
            size: "largeeeeee/pawelKica1",
            name: "large/invalidName",
        },
    },
};

export const getUsersToMatchResponse = {
    beforeOperations: {
        data: formatMatchedUsers([...femalesUnder24showMale, ...femalesUnder24ShowAll]),
        status: 200,
        omit: [],
    },
    afterOperations: {
        data: formatMatchedUsers([femalesUnder24showMale[0]]),
        status: 200,
        omit: [],
    },
};

export const createLikeData = {
    body: {
        valid: {
            basic: {
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
    },
    response: {
        basic: SuccessResponse,
        newPair: {
            data: {
                name: "Dani and Doda",
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
        userId: "1",
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
                conversationId: ["1", "3232"],
            },
            notFoundConversation: {
                content: "hello",
                conversationId: "12345",
            },
            notInConversationMembers: {
                content: "hello",
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
                    conversationId: "conversation1",
                    type: "voice",
                },
                schema: {
                    conversationId: "123",
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
                messageId: [1, 5, 2],
            },
            id: {
                messageId: "invalidId",
            },
            someones: {
                messageId: "message2",
            },
        },
    },
    response: {
        data: {
            userId: "1",
            conversationId: "conversation1",
            content: "",
            type: "default",
            isDeleted: true,
        },
        status: 200,
        omit: ["id", "createdAt"],
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
            conversationId: {
                conversationId: "invalid123",
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
            userId: "1",
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
        // before rename - name: "Pawel and Jennifer"
        name: "typescript enjoyers",
        updatedAt: "2022-03-10T21:23:09.006Z",
        createdAt: "2022-03-10T20:48:35.395Z",
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
        messages: [
            {
                id: "message1",
                userId: "1",
                content: "",
                type: "default",
                isDeleted: true,
                createdAt: "2022-03-10T20:48:42.399Z",
            },
            {
                id: "message2",
                userId: "7",
                content: "Hi Pawel",
                type: "default",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:42.399Z",
            },
            {
                id: "",
                userId: "1",
                content: "photoFileName",
                type: "photo",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:42.399Z",
            },
            {
                id: "",
                userId: "1",
                content: "voiceFileName",
                type: "voice",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:42.667Z",
            },
            {
                id: "",
                userId: "1",
                content: "videoFileName",
                type: "video",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:43.588Z",
            },
            {
                id: "message3",
                userId: "1",
                content: `Conversation name set to "typescript enjoyers"`,
                type: "info",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:42.399Z",
            },
        ],
    },
    {
        id: "",
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
                id: "12345",
                userId: "1",
                content: textMessageContent,
                type: "default",
                isDeleted: false,
                createdAt: "2022-03-10T20:48:38.224Z",
            },
        ],
    },
    {
        id: "conversation2",
        name: "Jennifer fanclub",
        updatedAt: "2022-03-10T21:23:09.006Z",
        createdAt: "2022-03-10T20:48:35.395Z",
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
    },
];
