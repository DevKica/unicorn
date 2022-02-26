import { testPOSTRequest } from "./testEndpoint";
import { SuccessResponse } from "../../utils/responses/main";
import { UnauthorizedInstance, EmailNotVerifiedInstance } from "../data/config";

export async function testUserAuthEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/users/auth/user", {}, SuccessResponse, 200);
    } else {
        await testPOSTRequest("/users/auth/user", {}, UnauthorizedInstance);
    }
}

export async function testUserAuthActiveEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/users/auth/active", {}, SuccessResponse, 200);
    } else {
        await testPOSTRequest("/users/auth/active", {}, EmailNotVerifiedInstance);
    }
}
