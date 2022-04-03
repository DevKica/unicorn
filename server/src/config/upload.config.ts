import path from "path";

export const userPhotosResolutions = {
    thumbnail: {
        width: 56,
        height: 56,
    },
    small: {
        width: 168,
        height: 168,
    },
    medium: {
        width: 360,
        height: 360,
    },
    large: {
        width: 720,
        height: 720,
    },
};

const localDirname = __dirname;

export const uploadMainPath = process.env.NODE_ENV === "test" ? path.join(localDirname, "..", "..", "public", "test") : path.join(localDirname, "..", "..", "public", "dev");

export const mainMessagesPath = path.join(uploadMainPath, "messages");

export const usersPhotosPath = path.join(uploadMainPath, "usersPhotos");

export const voiceMessagesPath = path.join(mainMessagesPath, "voice");
export const photoMessagesPath = path.join(mainMessagesPath, "photo");
export const videoMessagesPath = path.join(mainMessagesPath, "video");
