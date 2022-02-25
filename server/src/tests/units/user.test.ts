import { EmailAlreadyExistsInstance, InvalidRequestedBodyInstance } from "../data/config";
import { invalidCreateUserBody, validCreateUserBody, validCreateUserResponse } from "../data/users";
import { testPOSTRequest } from "../helpers/testEndpoint";

describe("AUTHENTICATION", () => {
    test(`User should not be able to create account with invalid body`, async () => {
        // await testPOSTRequest("/users", invalidCreateUserBody, InvalidRequestedBodyInstance);
    });
    test(`User should be able to create account with valid body`, async () => {
        // await testPOSTRequest("/users", validCreateUserBody, validCreateUserResponse, 201);
    });
    test(`User should not be able to create account with email that already exists in database`, async () => {
        // await testPOSTRequest("/users", validCreateUserBody, EmailAlreadyExistsInstance);
    });
    test(`Form data test`, async () => {
        await testPOSTRequest("/", { name: "hehe" }, { msg: "2115" }, 200);
    });
    test(`Form data test`, async () => {
        await testPOSTRequest("/", { name: "hehe" }, { msg: "2115" }, 400);
    });
});
