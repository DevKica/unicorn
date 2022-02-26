export function removeTestTokens(): void {
    global.accessToken = "";
    global.refreshToken = "";
}

export function setUserId(res: any): void {
    global.userId = res.body.id;
}
