import { logInfo } from "../../utils/logger";

export function removeAuthTokens(): void {
    global.testAccessToken = "";
    global.testRefreshToken = "";
}
export function removeGlobals(): void {
    removeAuthTokens();
    global.testUserId = "";
    global.testConversationId = "";
    global.testMessagesContent = [];
    logInfo("Globals have been removed");
}

export function setTestUserId(res: any): void {
    global.testUserId = res.body.id;
}

export function setTestConversationId(res: any): void {
    global.testConversationId = res.body.id;
}
