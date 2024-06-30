export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: ["/__mocks__/"],
};
