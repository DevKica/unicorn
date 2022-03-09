import path from "path";
import { omit } from "lodash";
import checkIfFileExists from "../../utils/user/upload/checkIfFileExists";
import { userPhotosResolutions, usersPhotosPath } from "../../config/upload.config";
import { MessageType } from "@prisma/client";

export function expectToEqualCustom(res: any, error: any) {
    expect(res.body.msg).toEqual(error.msg);
    expect(res.status).toEqual(error.code);
}

export function expectToEqual(res: any, status: number, data: Object) {
    if (res.body.content) {
        global.testMessagesContent.push(res.body.content);
    }

    expect(omit(res.body, "id", "photos", "createdAt", "subExpiration", "content")).toEqual(data);
    expect(res.status).toEqual(status);
}

export function expectUserPhotosToExists(res: any) {
    res.body.photos.forEach((photo: string) => {
        for (const key in userPhotosResolutions) {
            expect(checkIfFileExists(path.join(usersPhotosPath, `${key}.${photo}.jpg`))).toBeTruthy();
        }
    });
}

export function expectFileMessagesToExists(type: MessageType) {
    switch (type) {
        case "photo":
            break;
        case "video":
            break;
        case "voice":
            break;
    }
}
