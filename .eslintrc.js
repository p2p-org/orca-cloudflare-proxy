// @TODO make it pullable from npm
module.exports = {
  root: true,
  ignorePatterns: ["dist/", "*.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "import"],
  parserOptions: {
    project: "tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    curly: "error",
    eqeqeq: "error",
    "import/first": "warn",
    "import/order": "off",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-magic-numbers": "off",
    "require-await": "off",
    "simple-import-sort/exports": "warn",
    "space-before-blocks": "off",
    "padding-line-between-statements": "off",
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["interface", "type"],
      },
      {
        blankLine: "always",
        prev: ["interface", "type"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["if", "switch", "while", "function", "block-like"],
      },
    ],
    "@typescript-eslint/space-before-blocks": ["error"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // Enforce that private members are prefixed with an underscore
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: "property",
        modifiers: ["private", "public", "protected", "static", "readonly"],
        format: ["UPPER_CASE", "camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "method",
        format: ["camelCase"],
      },
    ],

    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^\\u0000"], // bare imports
          ["^react"], // react
          ["^[^\\.]"], // non-local imports
          [
            "^constants|^config|^lib|^utils|^types.ts|^store|^api|^app|^pages|^components|^styles|^assets",
          ], // internal
          ["^\\."], // local imports
        ],
      },
    ],
    "@typescript-eslint/no-magic-numbers": [
      "error",
      {
        ignore: [-1, 0, 1, 7],
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreArrayIndexes: true,
        ignoreReadonlyClassProperties: true,
      },
    ],

    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: false,
      },
    ],
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/unbound-method": "warn",
    "no-async-promise-executor": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/ban-types": "warn",
    "no-prototype-builtins": "warn",
    "no-constant-condition": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-var-requires": "warn",
  },
};
