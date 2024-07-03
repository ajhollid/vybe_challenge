export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/src/__tests__/__mocks__/dummyImage.js",
  },
  testPathIgnorePatterns: ["/__mocks__/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.tests.json",
    },
  },
};
