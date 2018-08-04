module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
  },
  testMatch: ["**/__tests__/**/*.+(ts|js)"],
};
