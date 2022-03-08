import path from "path";
import fse from "fs-extra";
import { Request } from "express";
import sharp from "sharp";
import { promisify } from "util";
import { InvalidFileFormat, PhotoRequired } from "../../errors/main";
import { userPhotosResolutions, usersPhotosDirname } from "../../../config/upload.config";
import generateRandomString from "./generateRandomString";

export async function uploadSinglePhoto(file: any, dirPath: string): Promise<string> {
    const ext = file.name.split(".").slice(-1)[0];

    if (!["jpg", "jpeg", "png"].includes(ext)) throw new InvalidFileFormat();
    await fse.ensureDir(dirPath);

    const fileName = generateRandomString();
    const uploadImg = promisify(file.mv);

    const uploadPath = path.join(dirPath, `${fileName}.jpg`);
    await uploadImg(uploadPath);

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
            uploadPhotos.push(await uploadSinglePhoto(value, usersPhotosDirname));
        }

        return uploadPhotos;
    } else {
        throw new PhotoRequired();
    }
}
