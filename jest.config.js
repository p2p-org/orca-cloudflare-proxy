module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  notify: true,
  notifyMode: "always",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
