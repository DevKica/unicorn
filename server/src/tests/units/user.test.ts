import { EmailAlreadyExistsInstance, InvalidRequestedBodyInstance } from "../data/config";
import { unvalidCreateUserBody, validCreateUserBody, validCreateUserResponse } from "../data/users";
import { testPOSTRequest } from "../helpers/testEndpoint";

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
