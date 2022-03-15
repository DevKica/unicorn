import path from "path";
import checkIfFileExists from "../../utils/user/upload/checkIfFileExists";
import { photoMessagesPath, userPhotosResolutions, usersPhotosPath, videoMessagesPath, voiceMessagesPath } from "../../config/upload.config";
import { MessageType } from "@prisma/client";
import pureOmit from "../../utils/responses/omit";
import { equalObjectType } from "../../@types/tests/requestObjectFormat";

export function expectToEqualObject(body: any, expectedData: object, propertiesToOmit: string[]) {
    expect(pureOmit(body, propertiesToOmit)).toEqual(expectedData);

    propertiesToOmit.forEach((property) => {
        expect(body).toHaveProperty(property);
    });
}

export function expectToEqualRes(res: any, { data: expectedData, status: expectedStatus, omit: propertiesToOmit }: equalObjectType) {
    if (res.body.content) {
        global.testMessagesContent.unshift(res.body.content);
    }

    expect(pureOmit(res.body, propertiesToOmit)).toEqual(expectedData);
    expect(res.status).toEqual(expectedStatus);

    propertiesToOmit.forEach((property) => {
        expect(res.body).toHaveProperty(property);
    });
}

export function expectToEqualCustom(res: any, error: any) {
    expect(res.body.msg).toEqual(error.msg);
    expect(res.status).toEqual(error.code);
}

export function expectUserPhotosToExists(res: any) {
    res.body.photos.forEach((photo: string) => {
        for (const key in userPhotosResolutions) {
            expect(checkIfFileExists(path.join(usersPhotosPath, `${key}.${photo}.jpg`))).toBeTruthy();
        }
    });
}

export function expectFileFromMessageToExists(type: MessageType, name: string) {
    switch (type) {
        case "photo":
            expect(checkIfFileExists(path.join(photoMessagesPath, `${name}.jpg`))).toBeTruthy();
            break;
        case "voice":
            expect(checkIfFileExists(path.join(voiceMessagesPath, `${name}.mp3`))).toBeTruthy();
            break;
        case "video":
            expect(checkIfFileExists(path.join(videoMessagesPath, `${name}.mp4`))).toBeTruthy();
            break;
    }
}
