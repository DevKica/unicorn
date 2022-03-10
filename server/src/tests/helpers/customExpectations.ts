import path from "path";
import { omit } from "lodash";
import checkIfFileExists from "../../utils/user/upload/checkIfFileExists";
import { photoMessagesPath, userPhotosResolutions, usersPhotosPath, videoMessagesPath, voiceMessagesPath } from "../../config/upload.config";
import { MessageType } from "@prisma/client";

export function expectToEqualCustom(res: any, error: any) {
    expect(res.body.msg).toEqual(error.msg);
    expect(res.status).toEqual(error.code);
}

export function expectToEqual(res: any, status: number, data: Object) {
    if (res.body.content) {
        global.testMessagesContent.push(res.body.content);
    }

    expect(omit(res.body, "id", "photos", "createdAt", "subExpiration", "content", "updatedAt")).toEqual(data);
    expect(res.status).toEqual(status);
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
