import fs from "fs";

function checkIfFileExists(path: string) {
    if (fs.existsSync(path)) {
        return true;
    }
    return false;
}
export default checkIfFileExists;
