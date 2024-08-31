export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
  // モックディレクトリの明示的な指定
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  // __mocks__ディレクトリの場所を指定（必要に応じてパスを調整してください）
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^__mocks__/(.*)$": "<rootDir>/src/__mocks__/$1"
  }
};
