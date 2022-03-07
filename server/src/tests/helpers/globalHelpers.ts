import { logInfo } from "../../utils/logger";

export function removeAuthTokens(): void {
    global.testAccessToken = "";
    global.testRefreshToken = "";
}
export function removeGlobals(): void {
    removeAuthTokens();
    global.testUserId = "";
    logInfo("Globals have been removed");
}

export function setUserId(res: any): void {
    global.testUserId = res.body.id;
}

export function setConversationId(res: any): void {
    global.testConversationId = res.body.id;
}
