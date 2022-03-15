import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { removeGlobals } from "../helpers/globalHelpers";
import { testGETRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { basicActiveUserDataResponse, loginCredentials } from "../data/user.auth";
// import { updateUserProfileBody } from "../data/user.relations";
// import {
//     afterFullUpdateUserData,
//     createMessageResponse,
//     createLikeBody,
//     createTextMessageBody,
//     getMatchedResponse,
//     newGeneralUpdateUserData,
//     updateUserProfileBody,
//     getConversationsResponse,
//     createTextMessageResponse,
// } from "../data/user.relations";
// import {
//     apiVersion,
//     InvalidUpdateUserGeneralInfoInstance,
//     InvalidUpdateUserMatchingInfoInstance,
//     InvalidCreateLikeInstance,
//     UpgradeYourAccountInstance,
//     ForbiddenInstance,
//     InvalidCreateTextMessageInstance,
//     NotFoundInstance,
//     InvalidCreateFileMessageInstance,
//     InvalidFileFormatInstance,
//     VoiceClipTooShortInstance,
//     VoiceClipTooLongInstance,
// } from "../data/config";
// import formatMatchedUsers from "../helpers/formatMatchedUsers";
// import { femalesUnder24showMale } from "../../prisma/seed/data/users";
// import { SuccessResponse } from "../../utils/responses/main";
// import { femalesUnder24ShowAll } from "./../../prisma/seed/data/users";
// import {
//     invalidFileTooLarge,
//     invalidPhotoFile,
//     invalidVideoFormat,
//     invalidVoiceFormat,
//     invalidVoiceTooLong,
//     invalidVoiceTooShort,
//     validPhotoFile,
//     validVideoFile,
//     validVoiceFile,
// } from "../data/files";
// import { TooLargeFileInstance } from "./../data/config";
// import { expectFileFromMessageToExists } from "../helpers/customExpectations";
// import { COOKIE_TYPE } from "../../config/cookies.config";
// import { omit } from "lodash";
// const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

describe("RELATIONS", () => {
    beforeAll(async () => {
        await seedRelationsData();
        await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);
    });
    afterAll(async () => {
        removeGlobals();
    });

    describe("PROFILE", () => {
        // const { valid, invalid } = updateUserProfileBody;

        test(`User should be able get private profile info`, async () => {
            await testGETRequest("/users/profile/", basicActiveUserDataResponse);
        });
        // test(`The server should return not found in case the image does not exist`, async () => {
        //     await testGETRequest("/users/profile/photo/123/123", NotFoundInstance);
        // });
        // test(`Everyone should be able to access user photos with secret name and size `, async () => {
        //     const res = await global.request.get(`/api/${apiVersion}/users/profile/photo/large/pawelKica1`);
        //     expect(res.headers["content-type"]).toEqual("image/jpeg");
        // });
        // test(`User should NOT be able to update his general settings with invalid body`, async () => {
        //     await testPATCHRequest("/users/profile/general", invalid.general, InvalidUpdateUserGeneralInfoInstance);
        // });
        // test(`User should NOT be able to update his matching settings with invalid body`, async () => {
        //     await testPATCHRequest("/users/profile/matching", invalid.matching, InvalidUpdateUserMatchingInfoInstance);
        // });
        // test(`User should be able to update his general profile settings with valid body`, async () => {
        //     await testPATCHRequest("/users/profile/general", valid.general, newGeneralUpdateUserData, 200);
        // });
        // test(`User should be able to update his matching profile settings with valid body`, async () => {
        //     await testPATCHRequest("/users/profile/matching", valid.matching, afterFullUpdateUserData, 200);
        // });
    });
    // describe("MATCHING", () => {
    //     const { valid, invalid } = createLikeBody;

    //     test("User should be able to get properly filtered users to match", async () => {
    //         await testGETRequest("/users", formatMatchedUsers([...femalesUnder24showMale, ...femalesUnder24ShowAll]), 200);
    //     });
    //     test(`User should NOT be able to pass createLikeSchema with invalid body`, async () => {
    //         await testPOSTRequest("/likes", invalid.schema, InvalidCreateLikeInstance);
    //     });
    //     test(`User should NOT be able to like inactive user`, async () => {
    //         await testPOSTRequest("/likes", invalid.inactiveUser, NotFoundInstance);
    //     });
    //     test(`User should NOT be able to superlike without a premium account`, async () => {
    //         await testPOSTRequest("/likes", invalid.nonPremium, UpgradeYourAccountInstance);
    //     });
    //     test(`User should be able to reject another user`, async () => {
    //         await testPOSTRequest("/likes", valid.reject, SuccessResponse);
    //     });
    //     test(`User should NOT be able to reject already rejected user`, async () => {
    //         await testPOSTRequest("/likes", valid.reject, ForbiddenInstance);
    //     });
    //     test(`User should be able to like another user`, async () => {
    //         await testPOSTRequest("/likes", valid.success, SuccessResponse);
    //     });
    //     test(`User should NOT be able to like already liked user`, async () => {
    //         await testPOSTRequest("/likes", valid.success, ForbiddenInstance);
    //     });
    //     test(`User should be able to match with user who liked him`, async () => {
    //         const res = await testPOSTRequest("/likes", valid.newPair, getMatchedResponse, 201);
    //         setTestConversationId(res);
    //     });
    //     test(`User should NOT be able to like already matched user`, async () => {
    //         await testPOSTRequest("/likes", valid.newPair, ForbiddenInstance);
    //     });
    //     test(`User should be able get properly filtered users after some operations`, async () => {
    //         await testGETRequest("/users", formatMatchedUsers([femalesUnder24showMale[0]]), 200);
    //     });
    // });
    // describe("MESSAGES", () => {
    //     const { valid, invalid } = createTextMessageBody;

    //     beforeAll(() => {
    //         valid.conversationId = global.testConversationId;
    //         createTextMessageResponse.data.conversationId = global.testConversationId;
    //     });

    //     // text messages
    //     test(`User should NOT be able to send text message to a conversation with invalid body`, async () => {
    //         await testPOSTRequest("/messages/text", invalid.schema, InvalidCreateTextMessageInstance);
    //     });
    //     test(`User should NOT be able to send text message to a conversation that does not exist`, async () => {
    //         await testPOSTRequest("/messages/text", invalid.notFoundConversation, NotFoundInstance);
    //     });
    //     test(`User should NOT be able to send text message to a conversation in which he is not a member`, async () => {
    //         await testPOSTRequest("/messages/text", invalid.notInConversationMembers, NotFoundInstance);
    //     });
    //     test(`User should be able to send text message to a conversation with invalid body`, async () => {
    //         await testPOSTRequest("/messages/text", valid, createTextMessageResponse, 201);
    //     });

    //     // files
    //     test(`User should NOT be able to send file to a conversation with too large size(?)`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "voice" }, TooLargeFileInstance, undefined, invalidFileTooLarge);
    //     });
    //     test(`User should NOT be able to send file to a conversation with invalid body`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "invalidPhoto123heh" }, InvalidCreateFileMessageInstance);
    //     });

    //     // photos
    //     test(`User should NOT be able to send photo to a conversation with invalid format`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "photo" }, InvalidFileFormatInstance, undefined, invalidPhotoFile);
    //     });
    //     test(`User should be able to send valid photo to a conversation`, async () => {
    //         const res = await testPOSTRequest(
    //             "/messages/file",
    //             { conversationId: global.testConversationId, type: "photo" },
    //             { ...createMessageResponse("photo"), conversationId: global.testConversationId },
    //             201,
    //             validPhotoFile
    //         );
    //         expectFileFromMessageToExists("photo", res.body.content);
    //     });

    //     // voice messages
    //     test(`User should NOT be able to send voice message to a conversation with invalid format`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "voice" }, InvalidFileFormatInstance, undefined, invalidVoiceFormat);
    //     });
    //     test(`User should NOT be able to send too short voice message to a conversation`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "voice" }, VoiceClipTooShortInstance, undefined, invalidVoiceTooShort);
    //     });
    //     test(`User should NOT be able to send too long voice message to a conversation`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "voice" }, VoiceClipTooLongInstance, undefined, invalidVoiceTooLong);
    //     });
    //     test(`User should be able to send valid voice messages to a conversation`, async () => {
    //         const res = await testPOSTRequest(
    //             "/messages/file",
    //             { conversationId: global.testConversationId, type: "voice" },
    //             { ...createMessageResponse("voice"), conversationId: global.testConversationId },
    //             201,
    //             validVoiceFile
    //         );
    //         expectFileFromMessageToExists("voice", res.body.content);
    //     });

    //     // videos
    //     test(`User should NOT be able to send videos to a conversation with invalid format`, async () => {
    //         await testPOSTRequest("/messages/file", { conversationId: global.testConversationId, type: "video" }, InvalidFileFormatInstance, undefined, invalidVideoFormat);
    //     });

    //     test(`User should be able to send valid videos messages to a conversation`, async () => {
    //         const res = await testPOSTRequest(
    //             "/messages/file",
    //             { conversationId: global.testConversationId, type: "video" },
    //             { ...createMessageResponse("video"), conversationId: global.testConversationId },
    //             201,
    //             validVideoFile
    //         );

    //         expectFileFromMessageToExists("video", res.body.content);
    //     });

    //     test("User should be able to view messages with photo", async () => {
    //         const res = await global.request.get(`/api/${apiVersion}/messages/photo/${global.testMessagesContent[2]}`);
    //         expect(res.headers["content-type"]).toEqual("image/jpeg");
    //     });
    //     test("User should be able to view voice messages", async () => {
    //         const res = await global.request.get(`/api/${apiVersion}/messages/voice/${global.testMessagesContent[1]}`);
    //         expect(res.headers["content-type"]).toEqual("audio/mpeg");
    //     });
    //     test("User should be able to view messages with video", async () => {
    //         const res = await global.request.get(`/api/${apiVersion}/messages/video/${global.testMessagesContent[0]}`);
    //         expect(res.headers["content-type"]).toEqual("video/mp4");
    //     });
    // });
    // describe("CONVERSATIONS", () => {
    //     test("User should be able to get properly filtered conversations", async () => {
    //         const { body: conversations } = await global.request
    //             .get(`/api/${apiVersion}/conversations`)
    //             .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`]);

    //         conversations.forEach((conversation: any, conversationsIndex: number) => {
    //             // assign to variable specific conversation
    //             const expectedConversation = getConversationsResponse[conversationsIndex];

    //             // main - members,name,etc
    //             expect(omit(conversation, "id", "messages", "createdAt", "updatedAt")).toEqual(omit(expectedConversation, "id", "messages", "createdAt", "updatedAt"));

    //             // messages
    //             conversation.messages.forEach((message: any, messagesIndex: number) => {
    //                 expect(omit(expectedConversation.messages[messagesIndex], "id", "content", "createdAt")).toEqual(omit(message, "id", "content", "createdAt"));
    //                 expect(global.testMessagesContent.includes(message.content)).toBeTruthy();
    //             });
    //         });
    //     });
    // });
});
