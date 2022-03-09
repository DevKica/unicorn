import path from "path";
import fse from "fs-extra";
import sharp from "sharp";
import { Request } from "express";
import { promisify } from "util";
import { FileRequired, InvalidFileFormat, PhotoRequired, VoiceClipTooLong, VoiceClipTooShort } from "../../errors/main";
import { photoMessagesPath, userPhotosResolutions, usersPhotosPath, videoMessagesPath, voiceMessagesPath } from "../../../config/upload.config";
import generateRandomString from "./generateRandomString";
const getMP3Duration = require("get-mp3-duration");

function checkFileFormat(file: any, exts: string[]) {
    const ext = file.name.split(".").slice(-1)[0];
    if (!exts.includes(ext)) throw new InvalidFileFormat();
}

function checkVoiceMessageDuration(file: any) {
    const duration = getMP3Duration(file.data);
    if (duration < 2000) throw new VoiceClipTooShort();
    if (duration > 30000) throw new VoiceClipTooLong();
}

async function uploadFile(file: any, type: string[], dirPath: string): Promise<string> {
    checkFileFormat(file, type);

    await fse.ensureDir(dirPath);

    const fileName = generateRandomString();
    const uploadFile = promisify(file.mv);

    const uploadPath = path.join(dirPath, `${fileName}.${type[0]}`);
    await uploadFile(uploadPath);

    return fileName;
}

export async function uploadFileMessage(req: Request, type: string): Promise<string> {
    if (req.files) {
        const file = Object.values(req.files)[0];
        let ext: string[] = [];
        let dir: string = "";
        switch (type) {
            case "photo":
                ext = ["jpg", "jpeg", "png"];
                dir = photoMessagesPath;
                break;
            case "voice":
                ext = ["mp3"];
                dir = voiceMessagesPath;
                checkVoiceMessageDuration(file);
                break;
            case "video":
                ext = ["mp4"];
                dir = videoMessagesPath;
                break;
        }
        const fileName = await uploadFile(file, ext, dir);
        return fileName;
    } else {
        throw new FileRequired();
    }
}

export async function uploadAndResizePhoto(file: any, dirPath: string): Promise<string> {
    const fileName = await uploadFile(file, ["jpg", "jpeg", "png"], dirPath);

    const uploadPath = path.join(dirPath, `${fileName}.jpg`);

    const _createPath = (name: string) => path.join(dirPath, `${name}.jpg`);

    for (const [key, { width, height }] of Object.entries(userPhotosResolutions)) {
        await sharp(uploadPath)
            .resize(width, height)
            .toFile(_createPath(`${key}.${fileName}`));
    }
    await fse.remove(uploadPath);

    return fileName;
}

export async function uploadUserPhotosFromReq(req: Request) {
    if (req.files) {
        const uploadPhotos = [];

        for (const [_key, value] of Object.entries(req.files)) {
            uploadPhotos.push(await uploadAndResizePhoto(value, usersPhotosPath));
        }

        return uploadPhotos;
    } else {
        throw new PhotoRequired();
    }
}
