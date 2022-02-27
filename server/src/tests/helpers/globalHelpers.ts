export function removeTestTokens(): void {
    global.testAccessToken = "";
    global.testRefreshToken = "";
}

export function setUserId(res: any): void {
    global.testUserId = res.body.id;
}
