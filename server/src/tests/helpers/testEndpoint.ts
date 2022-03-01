import fs from "fs";
import path from "path";
import { COOKIE_TYPE } from "../../config/cookies.config";
import { apiVersion } from "../data/config";
import { expectToEqual, expectToEqualCustom } from "./customExceptions";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

export const afterTest = (res: any, equalObject: any, equalStatus: any = 0) => {
    try {
        global.testAccessToken = res.header["set-cookie"][0].split(";")[0].split("=")[1];
        global.testRefreshToken = res.header["set-cookie"][1].split(";")[0].split("=")[1];
    } catch (e: unknown) {}
    if (equalStatus) {
        expectToEqual(res, equalStatus, equalObject);
    } else {
        expectToEqualCustom(res, equalObject);
    }
};
export async function testGETRequest(endpoint: string, equalObject: any, equalStatus: number = 0) {
    const res = await global.request.get(`/api/${apiVersion}${endpoint}`).set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`]);

    afterTest(res, equalObject, equalStatus);

    return res;
}

export async function testPOSTRequest(endpoint: string, data: any, equalObject: any, equalStatus: number = 0, attachFileName: string = "") {
    let buffer: any = "";
    if (attachFileName) {
        buffer = fs.readFileSync(path.join(__dirname, "..", "data", "images", attachFileName));
    }
    const res = await global.request
        .post(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`])
        .field(data)
        .attach("random", buffer, attachFileName);

    afterTest(res, equalObject, equalStatus);

    return res;
}

export async function testPATCHRequest(endpoint: string, data: any, equalObject: any, equalStatus: number = 0, attachFileName: string = "") {
    let buffer: any = "";
    if (attachFileName) {
        buffer = fs.readFileSync(path.join(__dirname, "..", "data", "images", attachFileName));
    }
    const res = await global.request
        .patch(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`])
        .field(data)
        .attach("random", buffer, attachFileName);

    afterTest(res, equalObject, equalStatus);

    return res;
}
