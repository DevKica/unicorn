import { supertest } from "supertest";

declare global {
    var request: supertest.SuperTest<supertest.Test>;
    var accessToken: string;
    var refreshToken: string;
    var counter: number;
    var userId: string;
}
