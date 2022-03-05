import { testPOSTRequest } from "./testEndpoint";
import { SuccessResponse } from "../../utils/responses/main";
import { UnauthorizedInstance, EmailNotVerifiedInstance } from "../data/config";

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
