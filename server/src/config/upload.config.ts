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

export const uploadDirname = path.join(localDirname, "..", "..", "public");
export const usersPhotosDirname = path.join(uploadDirname, "usersPhotos");
