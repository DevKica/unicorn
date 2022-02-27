import { supertest } from "supertest";

declare global {
    var request: supertest.SuperTest<supertest.Test>;
    var testAccessToken: string;
    var testRefreshToken: string;
    var counter: number;
    var testUserId: string;
}
