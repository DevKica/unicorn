import { supertest } from "supertest";

declare global {
    var request: supertest.SuperTest<supertest.Test>;
    var testAccessToken: string;
    var testSecondAccessToken: string;
    var testRefreshToken: string;
    var testUserId: string;
    var testConversationId: string;
    var testMessagesContent: string[];
}
