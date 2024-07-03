export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
    "\\.svg$": "<rootDir>/src/__tests__/__mocks__/svgMock.js",
  },
  testPathIgnorePatterns: ["/__mocks__/"],
};
