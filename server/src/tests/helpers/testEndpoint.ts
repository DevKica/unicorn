import fs from "fs";
import path from "path";
import { equalObjectType } from "../../@types/tests/requestObjectFormat";
import { COOKIE_TYPE } from "../../config/cookies.config";
import { apiVersion } from "../data/config";
import { expectToEqualRes, expectToEqualCustom } from "./customExpectations";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

export const afterTest = (res: any, equalObject: equalObjectType) => {
    try {
        global.testAccessToken = res.header["set-cookie"][0].split(";")[0].split("=")[1];
        global.testRefreshToken = res.header["set-cookie"][1].split(";")[0].split("=")[1];
    } catch (e: unknown) {}

    if (equalObject.status) {
        expectToEqualRes(res, equalObject);
    } else {
        expectToEqualCustom(res, equalObject);
    }
};

export async function testGETRequest(endpoint: string, equalObject: equalObjectType | any) {
    const res = await global.request.get(`/api/${apiVersion}${endpoint}`).set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`]);

    afterTest(res, equalObject);

    return res;
}

export async function testPOSTRequest(endpoint: string, data: object, equalObject: equalObjectType | any, attachFileName: string = "") {
    let buffer: any = "";
    if (attachFileName) {
        buffer = fs.readFileSync(path.join(__dirname, "..", "data", "files", attachFileName));
    }
    const res = await global.request
        .post(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`])
        .field(data)
        .attach("file", buffer, attachFileName);

    afterTest(res, equalObject);

    return res;
}

export async function testPATCHRequest(endpoint: string, data: object, equalObject: equalObjectType | any, attachFileName: string = "") {
    let buffer: any = "";

    if (attachFileName) {
        buffer = fs.readFileSync(path.join(__dirname, "..", "data", "files", attachFileName));
    }
    const res = await global.request
        .patch(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`])
        .field(data)
        .attach("file", buffer, attachFileName);

    afterTest(res, equalObject);

    return res;
}

export async function testDELETERequest(endpoint: string, data: any, equalObject: equalObjectType | any) {
    const res = await global.request
        .delete(`/api/${apiVersion}${endpoint}`)
        .set("Cookie", [`${ACCESS_TOKEN}=${global.testAccessToken}`, `${REFRESH_TOKEN}=${global.testRefreshToken}`])
        .field(data);

    afterTest(res, equalObject);

    return res;
}
