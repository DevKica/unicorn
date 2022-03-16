import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { removeGlobals, setTestConversationId } from "../helpers/globalHelpers";
import { testGETRequest, testPATCHRequest, testPOSTRequest } from "../helpers/testEndpoint";
import { basicActiveUserDataResponse, loginCredentials } from "../data/user.auth";
import {
    NotFoundInstance,
    apiVersion,
    InvalidUpdateUserGeneralInfoInstance,
    InvalidUpdateUserMatchingInfoInstance,
    ForbiddenInstance,
    InvalidCreateLikeInstance,
    UpgradeYourAccountInstance,
    InvalidCreateTextMessageInstance,
    InvalidCreateFileMessageInstance,
    TooLargeFileInstance,
    InvalidFileFormatInstance,
    VoiceClipTooLongInstance,
    VoiceClipTooShortInstance,
} from "../data/config";
import {
    afterUpdatesUserDataResponse,
    createFileMessageData,
    createLikeData,
    createTextMessageData,
    getConversationsResponse,
    getUserPhotoData,
    getUsersToMatchResponse,
    messageOmitProperties,
    updateUserProfileData,
} from "../data/user.relations";
import {
    invalidFileTooLarge,
    invalidPhotoFile,
    invalidVideoFormat,
    invalidVoiceFormat,
    invalidVoiceTooLong,
    invalidVoiceTooShort,
    validPhotoFile,
    validVideoFile,
    validVoiceFile,
} from "../data/files";
import { checkTheExistenceOfUserPhotos, expectFileFromMessageToExists, expectToEqualObject } from "../helpers/customExpectations";
import { COOKIE_TYPE } from "../../config/cookies.config";
import pureOmit from "../../utils/responses/omit";
import { userPhotosResolutions } from "../../config/upload.config";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

describe("RELATIONS", () => {
    beforeAll(async () => {
        await seedRelationsData();
        // authenticate user
        await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);
    });
    afterAll(async () => {
        removeGlobals();
    });

    describe("PROFILE", () => {
        describe("VIEWING PHOTOS", () => {
            const { photoName } = getUserPhotoData;

            test(`The server should return "not found" in case the photo does not exist`, async () => {
                await testGETRequest(`/users/profile/photo/${photoName.invalid.name}`, NotFoundInstance);
            });
            test(`The server should return "not found" in case the photo does exist,but size is invalid`, async () => {
                await testGETRequest(`/users/profile/photo/${photoName.invalid.size}`, NotFoundInstance);
            });
            test.each(Object.keys(userPhotosResolutions))(`The server should return image/jpeg content-type on request for USER photo of various sizes and valid name `, async (size) => {
                const res = await global.request.get(`/api/${apiVersion}/users/profile/photo/${size}/${photoName.valid}`);
                expect(res.headers["content-type"]).toEqual("image/jpeg");
            });
        });

        describe("UPDATE", () => {
            let oldPhotos: string[], newPhotoName: string;

            const { body, response } = updateUserProfileData;

            test(`User should be able get private profile info`, async () => {
                const res = await testGETRequest("/users/profile/", basicActiveUserDataResponse);
                oldPhotos = res.body.photos;
            });
            test(`User should NOT be able to update his general settings with invalid body`, async () => {
                await testPATCHRequest("/users/profile/general", body.invalid.general, InvalidUpdateUserGeneralInfoInstance);
            });
            test(`User should NOT be able to update his matching settings with invalid body`, async () => {
                await testPATCHRequest("/users/profile/matching", body.invalid.matching, InvalidUpdateUserMatchingInfoInstance);
            });
            test(`User should be able to update his general profile settings with valid body`, async () => {
                await testPATCHRequest("/users/profile/general", body.valid.general, response.general);
            });
            test(`User should be able to update his matching profile settings with valid body`, async () => {
                await testPATCHRequest("/users/profile/matching", body.valid.matching, response.matching);
            });
            test(`User should be able to update his profile photos`, async () => {
                const res = await testPATCHRequest("/users/profile/photos", {}, afterUpdatesUserDataResponse, validPhotoFile);
                newPhotoName = res.body.photos[0];
                checkTheExistenceOfUserPhotos(oldPhotos, false);
                checkTheExistenceOfUserPhotos(res.body.photos, true);
            });
            test.each(Object.keys(userPhotosResolutions))(`The server should return "not found" on request for USER photo of various sizes with OLD name`, async (size) => {
                await testGETRequest(`/users/profile/photo/${size}/${oldPhotos[0]}`, NotFoundInstance);
            });

            test.each(Object.keys(userPhotosResolutions))(`The server should return image/jpeg content-type on request for USER photo of various sizes with NEW name`, async (size) => {
                const res = await global.request.get(`/api/${apiVersion}/users/profile/photo/${size}/${newPhotoName}`);
                expect(res.headers["content-type"]).toEqual("image/jpeg");
            });
        });
    });
    describe("MATCHING", () => {
        const { body, response } = createLikeData;

        test("User should be able to get properly filtered users to match", async () => {
            await testGETRequest("/users", getUsersToMatchResponse.beforeOperations);
        });
        test(`User should NOT be able to pass createLikeSchema with invalid body`, async () => {
            await testPOSTRequest("/likes", body.invalid.schema, InvalidCreateLikeInstance);
        });
        test(`User should NOT be able to like inactive user`, async () => {
            await testPOSTRequest("/likes", body.invalid.inactiveUser, NotFoundInstance);
        });
        test(`User should NOT be able to superlike without a premium account`, async () => {
            await testPOSTRequest("/likes", body.invalid.nonPremium, UpgradeYourAccountInstance);
        });
        test(`User should be able to reject another user`, async () => {
            await testPOSTRequest("/likes", body.valid.reject, response.reject);
        });
        test(`User should NOT be able to reject already rejected user`, async () => {
            await testPOSTRequest("/likes", body.valid.reject, ForbiddenInstance);
        });
        test(`User should be able to like another user`, async () => {
            await testPOSTRequest("/likes", body.valid.basic, response.basic);
        });
        test(`User should NOT be able to like already liked user`, async () => {
            await testPOSTRequest("/likes", body.valid.basic, ForbiddenInstance);
        });
        test(`User should be able to match with user who liked him`, async () => {
            const res = await testPOSTRequest("/likes", body.valid.newPair, response.newPair);
            setTestConversationId(res);
        });
        test(`User should NOT be able to like already matched user`, async () => {
            await testPOSTRequest("/likes", body.valid.newPair, ForbiddenInstance);
        });
        test(`User should be able get properly filtered users after some operations`, async () => {
            await testGETRequest("/users", getUsersToMatchResponse.afterOperations);
        });
    });
    describe("MESSAGES", () => {
        describe("TEXT", () => {
            const { body, response } = createTextMessageData;

            beforeAll(() => {
                body.valid.conversationId = global.testConversationId;
                response.data.conversationId = global.testConversationId;
            });

            test(`User should NOT be able to send text message to a conversation with invalid body`, async () => {
                await testPOSTRequest("/messages/text", body.invalid.schema, InvalidCreateTextMessageInstance);
            });
            test(`User should NOT be able to send text message to a conversation that does not exist`, async () => {
                await testPOSTRequest("/messages/text", body.invalid.notFoundConversation, NotFoundInstance);
            });
            test(`User should NOT be able to send text message to a conversation in which he is not a member`, async () => {
                await testPOSTRequest("/messages/text", body.invalid.notInConversationMembers, NotFoundInstance);
            });
            test(`User should be able to send text message to a conversation with valid body`, async () => {
                await testPOSTRequest("/messages/text", body.valid, response);
            });
        });
        describe("FILES", () => {
            const { body, response } = createFileMessageData;

            beforeAll(() => {
                body.general.invalid.tooLargeFile.conversationdId = global.testConversationId;
                body.general.invalid.schema.conversationdId = global.testConversationId;
                body.photo.valid.conversationId = global.testConversationId;
                body.voice.valid.conversationId = global.testConversationId;
                body.video.valid.conversationId = global.testConversationId;

                Object.keys(response).forEach((key) => {
                    // @ts-ignore
                    response[key].data.conversationId = global.testConversationId;
                });
            });

            // files
            test(`User should NOT be able to send file to a conversation with too large size(?)`, async () => {
                await testPOSTRequest("/messages/file", body.general.invalid.tooLargeFile, TooLargeFileInstance, invalidFileTooLarge);
            });
            test(`User should NOT be able to send file to a conversation with invalid body`, async () => {
                await testPOSTRequest("/messages/file", body.general.invalid.schema, InvalidCreateFileMessageInstance);
            });

            // photos
            test(`User should NOT be able to send photo to a conversation with invalid format`, async () => {
                await testPOSTRequest("/messages/file", body.photo.valid, InvalidFileFormatInstance, invalidPhotoFile);
            });
            test(`User should be able to send valid photo to a conversation`, async () => {
                const res = await testPOSTRequest("/messages/file", body.photo.valid, response.photo, validPhotoFile);
                expectFileFromMessageToExists("photo", res.body.content);
            });
            // voice messages
            test(`User should NOT be able to send voice message to a conversation with invalid format`, async () => {
                await testPOSTRequest("/messages/file", body.voice.valid, InvalidFileFormatInstance, invalidVoiceFormat);
            });
            test(`User should NOT be able to send too short voice message to a conversation`, async () => {
                await testPOSTRequest("/messages/file", body.voice.valid, VoiceClipTooShortInstance, invalidVoiceTooShort);
            });
            test(`User should NOT be able to send too long voice message to a conversation`, async () => {
                await testPOSTRequest("/messages/file", body.voice.valid, VoiceClipTooLongInstance, invalidVoiceTooLong);
            });
            test(`User should be able to send valid voice messages to a conversation`, async () => {
                const res = await testPOSTRequest("/messages/file", body.voice.valid, response.voice, validVoiceFile);
                expectFileFromMessageToExists("voice", res.body.content);
            });
            // videos
            test(`User should NOT be able to send videos to a conversation with invalid format`, async () => {
                await testPOSTRequest("/messages/file", body.video.valid, InvalidFileFormatInstance, invalidVideoFormat);
            });

            test(`User should be able to send valid videos messages to a conversation`, async () => {
                const res = await testPOSTRequest("/messages/file", body.video.valid, response.video, validVideoFile);

                expectFileFromMessageToExists("video", res.body.content);
            });

            test("User should be able to view messages with photo", async () => {
                const res = await global.request.get(`/api/${apiVersion}/messages/photo/${global.testMessagesContent[2]}`);
                expect(res.headers["content-type"]).toEqual("image/jpeg");
            });
            test("User should be able to view voice messages", async () => {
                const res = await global.request.get(`/api/${apiVersion}/messages/voice/${global.testMessagesContent[1]}`);
                expect(res.headers["content-type"]).toEqual("audio/mpeg");
            });
            test("User should be able to view messages with video", async () => {
                const res = await global.request.get(`/api/${apiVersion}/messages/video/${global.testMessagesContent[0]}`);
                expect(res.headers["content-type"]).toEqual("video/mp4");
            });
        });
    });
    describe("CONVERSATIONS", () => {
        test("User should be able to get properly filtered conversations", async () => {
            const conversationOmitProperties = ["id", "messages", "createdAt", "updatedAt"];

            const { body: conversations } = await global.request
                .get(`/api/${apiVersion}/conversations`)
                .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`]);

            conversations.forEach((conversation: any, conversationsIndex: number) => {
                // assign to variable specific conversation
                const expectedConversation = getConversationsResponse[conversationsIndex];

                // main - members,name,etc
                expectToEqualObject(conversation, pureOmit(expectedConversation, conversationOmitProperties), conversationOmitProperties);

                // messages
                conversation.messages.forEach((message: any, messagesIndex: number) => {
                    expectToEqualObject(message, pureOmit(expectedConversation.messages[messagesIndex], messageOmitProperties), messageOmitProperties);

                    expect(global.testMessagesContent.includes(message.content)).toBeTruthy();
                });
            });
        });
    });
});
