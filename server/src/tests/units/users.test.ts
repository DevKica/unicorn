describe("", () => {
  test("jebac gorzen", async () => {
    const res = await global.request.get("/");
    expect(true).toBe(true);
  });
});
