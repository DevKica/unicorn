import { testPOSTRequest } from "./testEndpoint";
import { SuccessResponse } from "../../utils/responses/main";
import { UnauthorizedInstance, EmailNotVerifiedInstance, apiVersion } from "../data/config";

export async function testUserAuthEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/auth/user", {}, SuccessResponse);
    } else {
        await testPOSTRequest("/auth/user", {}, UnauthorizedInstance);
    }
}

export async function testUserAuthActiveEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/auth/active", {}, SuccessResponse);
    } else {
        await testPOSTRequest("/auth/active", {}, EmailNotVerifiedInstance);
    }
}

export async function getAuthToken(loginCredentials: { email: string; password: string }): Promise<string> {
    try {
        const res = await global.request.post(`/api/${apiVersion}/users/login`).field(loginCredentials);

        return res.header["set-cookie"][0].split(";")[0].split("=")[1];
    } catch (e) {
        return "";
    }
}
