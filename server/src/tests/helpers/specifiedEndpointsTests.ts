import { SuccessResponse } from "../../utils/responses/main";
import { ForbiddenInstance, EmailNotVerifiedInstance } from "../data/config";
import { testPOSTRequest } from "./testEndpoint";

export async function testUserAuthEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/users/auth/", {}, SuccessResponse, 200);
    } else {
        await testPOSTRequest("/users/auth/", {}, ForbiddenInstance);
    }
}

export async function testUserAuthActiveEndpoint(success: boolean): Promise<void> {
    if (success) {
        await testPOSTRequest("/users/auth/", {}, SuccessResponse, 200);
    } else {
        await testPOSTRequest("/users/auth/active", {}, EmailNotVerifiedInstance);
    }
}
