import path from "path";
import fse, { existsSync } from "fs-extra";
import sharp from "sharp";
import { Request } from "express";
import { promisify } from "util";
import { FileRequired, Forbidden, InvalidFileFormat, NotFound, PhotoRequired, TooManyPhotos, VoiceClipTooLong, VoiceClipTooShort } from "../../errors/main";
import { photoMessagesPath, userPhotosResolutions, usersPhotosPath, videoMessagesPath, voiceMessagesPath } from "../../../config/upload.config";
import generateRandomString from "./generateRandomString";
import { findUniqueUser } from "../../../services/user/user.services";
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

async function uploadFile(file: any, type: string[], dirPath: string): Promise<string> {
    checkFileFormat(file, type);

    await fse.ensureDir(dirPath);

    const fileName = generateRandomString();
    const uploadFile = promisify(file.mv);

    const uploadPath = path.join(dirPath, `${fileName}.${type[0]}`);
    await uploadFile(uploadPath);

    return fileName;
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

        if (Object.entries(req.files).length > 9) throw new TooManyPhotos();

        for (const [_key, value] of Object.entries(req.files)) {
            uploadPhotos.push(await uploadAndResizePhoto(value, usersPhotosPath));
        }

        return uploadPhotos;
    } else {
        throw new PhotoRequired();
    }
}

export async function removeUserPhotos(userId: string) {
    const user = await findUniqueUser({ id: userId }, { photos: true });
    if (!user) throw new Forbidden();

    for (const fileName of user.photos) {
        for (const key in userPhotosResolutions) {
            await fse.remove(path.join(usersPhotosPath, `${key}.${fileName}.jpg`));
        }
    }
}

export function getFileMessagePath(type: string, content: string): string {
    let filePath = "";
    switch (type) {
        case "photo":
            filePath = path.join(photoMessagesPath, `${content}.jpg`);
            break;
        case "voice":
            filePath = path.join(voiceMessagesPath, `${content}.mp3`);
            break;
        case "video":
            filePath = path.join(videoMessagesPath, `${content}.mp4`);
            break;
    }

    if (!existsSync(filePath)) throw new NotFound();

    return filePath;
}
