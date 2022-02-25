import path from "path";
import { send } from "process";
import { COOKIE_TYPE } from "../../config/cookies.config";
import { apiVersion } from "../data/config";
import { expectToEqual, expectToEqualError } from "./customExceptions";
import fs from "fs";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

export async function testPOSTRequest(endpoint: string, data: any, equalObject: any = false, equalStatus: any = 0, attachFileName: string = "") {
    let buffer: any = "";
    if (attachFileName) {
        buffer = fs.readFileSync(path.join(__dirname, "..", "data", "images", attachFileName));
    }
    const res = await global.request
        .post(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.accessToken}`, `${REFRESH_TOKEN}=${global.refreshToken}`])
        .field(data)
        .attach("random", buffer, attachFileName);

    try {
        global.accessToken = res.header["set-cookie"][0].split(";")[0].split("=")[1];
        global.refreshToken = res.header["set-cookie"][1].split(";")[0].split("=")[1];
    } catch (e: unknown) {}
    if (equalStatus) {
        if (equalObject) {
            expectToEqual(res, equalStatus, equalObject);
        }
    } else {
        expectToEqualError(res, equalObject);
    }
}
