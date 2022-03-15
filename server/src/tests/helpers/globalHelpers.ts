export function removeAuthTokens(): void {
    global.testAccessToken = "";
    global.testRefreshToken = "";
}
export function removeGlobals(): void {
    removeAuthTokens();
    global.testUserId = "";
    global.testConversationId = "";
    global.testSecondAccessToken = "";
    global.testMessagesContent = [];
}

export function setTestUserId(res: any): void {
    global.testUserId = res.body.id;
}

export function setTestConversationId(res: any): void {
    global.testConversationId = res.body.id;
}
