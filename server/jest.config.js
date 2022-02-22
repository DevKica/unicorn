module.exports = {
  roots: ["./src/tests"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
  setupFilesAfterEnv: ["./src/tests/setupFilesAfterEnv.ts"],
};
