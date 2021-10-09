const { defaults } = require("jest-config");

module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: [...defaults.moduleFileExtensions],
    testMatch: ["**/*.test.ts"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    verbose: true,
    preset: "ts-jest",
};
