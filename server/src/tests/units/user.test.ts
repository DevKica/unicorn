import { omit } from "lodash";
import { EmailAlreadyExistsInstance, InvalidRequestedBodyInstance } from "../data/config";
import { unvalidCreateUserBody, validCreateUserBody, validCreateUserResponse } from "../data/users";
import { testPOSTRequest } from "../helpers/testEndpoint";

export function expectToEqualError(res: any, error: any) {
    expect(res.body.msg).toEqual(error.msg);
    expect(res.status).toEqual(error.code);
}

export function expectToEqual(res: any, status: number, data: Object) {
    expect(omit(res.body, "id")).toEqual(data);
    expect(res.status).toEqual(status);
}

describe("AUTHENTICATION", () => {
    beforeAll(() => {});
    test("User should not be able to create account with invalid body", async () => {
        await testPOSTRequest("/users", unvalidCreateUserBody, InvalidRequestedBodyInstance);
    });
    test("User should be able to create account with valid body", async () => {
        await testPOSTRequest("/users", validCreateUserBody, validCreateUserResponse, 201);
    });
    test("User should not be able to create account with email that already exists in database", async () => {
        await testPOSTRequest("/users", validCreateUserBody, EmailAlreadyExistsInstance);
    });
});
