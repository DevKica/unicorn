import path from "path";
import fse from "fs-extra";
import sharp from "sharp";
import { Request } from "express";
import { promisify } from "util";
import { FileRequired, InvalidFileFormat, PhotoRequired, VoiceClipTooLong, VoiceClipTooShort } from "../../errors/main";
import { photoMessagesPath, userPhotosResolutions, usersPhotosPath, voiceMessagesPath } from "../../../config/upload.config";
import generateRandomString from "./generateRandomString";
const getMP3Duration = require("get-mp3-duration");

export async function uploadFileMessage(req: Request, type: string): Promise<string> {
    if (req.files) {
        const file = Object.values(req.files)[0];
        switch (type) {
            case "photo":
                const photoFileName = await uploadSinglePhoto(file, photoMessagesPath, false);
                return photoFileName;
            case "video":
                console.log("videooo");
                return "12";
            case "voice":
                const voiceFileName = await uploadVoiceMessage(file, voiceMessagesPath);
                return voiceFileName;
            default:
                throw Error();
        }
    } else {
        throw new FileRequired();
    }
}

export async function uploadVoiceMessage(file: any, dirPath: string): Promise<string> {
    const ext = file.name.split(".").slice(-1)[0];
    if (!["mp3"].includes(ext)) throw new InvalidFileFormat();

    const duration = getMP3Duration(file.data);
    if (duration < 2000) throw new VoiceClipTooShort();
    if (duration > 30000) throw new VoiceClipTooLong();

    await fse.ensureDir(dirPath);

    const fileName = generateRandomString();
    const uploadFile = promisify(file.mv);

    const uploadPath = path.join(dirPath, `${fileName}.mp3`);
    await uploadFile(uploadPath);

    return fileName;
}

export async function uploadSinglePhoto(file: any, dirPath: string, resize: boolean = true): Promise<string> {
    const ext = file.name.split(".").slice(-1)[0];

    if (!["jpg", "jpeg", "png"].includes(ext)) throw new InvalidFileFormat();
    await fse.ensureDir(dirPath);

    const fileName = generateRandomString();
    const uploadImg = promisify(file.mv);

    const uploadPath = path.join(dirPath, `${fileName}.jpg`);
    await uploadImg(uploadPath);

    if (resize) {
        const _createPath = (name: string) => path.join(dirPath, `${name}.jpg`);

        for (const [key, { width, height }] of Object.entries(userPhotosResolutions)) {
            await sharp(uploadPath)
                .resize(width, height)
                .toFile(_createPath(`${key}.${fileName}`));
        }
        await fse.remove(uploadPath);
    }

    return fileName;
}

export async function uploadUserPhotosFromReq(req: Request) {
    if (req.files) {
        const uploadPhotos = [];

        for (const [_key, value] of Object.entries(req.files)) {
            uploadPhotos.push(await uploadSinglePhoto(value, usersPhotosPath));
        }

        return uploadPhotos;
    } else {
        throw new PhotoRequired();
    }
}
