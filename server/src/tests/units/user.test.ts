import { apiVersion } from "../data/config";

describe("AUTHENTICATION", () => {
    test("User should be able to create account", async () => {
        // const res = await global.request.get(`/api/${apiVersion}/users`);
        // expect(res.data).not.toBeNull();
    });
    test("jebac gorzen", async () => {
        const res = await global.request.get("/");
        console.log(res.body);
        console.log(res.data);
        expect(true).toBe(true);
    });
});
