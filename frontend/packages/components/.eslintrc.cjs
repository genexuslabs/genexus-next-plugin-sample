module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@stencil-community/recommended", // Enables @stencil-community/eslint-plugin.
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    tsconfigRootDir: __dirname, // Make the parser resolve the project configuration relative to the "components" project
    project: "./tsconfig.json",
    sourceType: "module" // Allows for the use of imports
  },
  rules: {
    // - - - - - - - - - - - -
    // ESLint
    // - - - - - - - - - - - -
    camelcase: ["error", { allow: [] }], // Enforce camelcase naming convention
    curly: "error", // Enforce consistent brace style for all control statements
    eqeqeq: ["error", "always", { null: "ignore" }], // Require the use of === and !==   "ignore" -------> Do not apply this rule to null
    "logical-assignment-operators": [
      "error",
      "always",
      { enforceForIfStatements: true }
    ], // This rule checks for expressions that can be shortened using logical assignment operator
    "dot-notation": "error", // This rule is aimed at maintaining code consistency and improving code readability by encouraging use of the dot notation style whenever possible. As such, it will warn when it encounters an unnecessary use of square-bracket notation.
    "max-depth": ["error", 3], // Enforce a maximum depth that blocks can be nested. Many developers consider code difficult to read if blocks are nested beyond a certain depth
    "no-alert": "error", // Disallow the use of alert, confirm, and prompt
    "no-console": "warn", // Warning when using console.log, console.warn or console.error
    "no-else-return": ["warn", { allowElseIf: false }], // Disallow else blocks after return statements in if statements
    "no-extra-boolean-cast": "error", // Disallow unnecessary boolean casts
    "no-debugger": "error", // Error when using debugger;
    "no-duplicate-case": "error", // This rule disallows duplicate test expressions in case clauses of switch statements
    "no-empty": "error", // Disallow empty block statements
    "no-lonely-if": "error", // Disallow if statements as the only statement in else blocks
    "no-multi-assign": "error", // Disallow use of chained assignment expressions
    "no-nested-ternary": "error", // Warns the use of nested ternary expressions
    "no-sequences": "error", // Disallow comma operators
    "no-undef": "off", // Allows defining undefined variables
    "no-unneeded-ternary": "error", // Disallow ternary operators when simpler alternatives exist
    "no-useless-return": "error", // Disallow redundant return statements
    "spaced-comment": ["error", "always", { exceptions: ["-", "+", "/"] }], // Enforce consistent spacing after the // or /* in a comment

    // - - - - - - - - - - - -
    // TypeScript ESLint
    // - - - - - - - - - - - -
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^(h)$" }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // - - - - - - - - - - - -
    // Prettier
    // - - - - - - - - - - - -
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],

    // - - - - - - - - - - - -
    // StencilJS
    // - - - - - - - - - - - -
    "@stencil-community/async-methods": "warn", // This rule catches Stencil public methods that are not async
    "@stencil-community/decorators-context": "warn", // This rule catches Stencil decorators in bad locations
    "@stencil-community/decorators-style": [
      "warn",
      {
        // prop: "inline", // And multiline
        state: "inline",
        element: "inline",
        method: "multiline",
        watch: "multiline",
        listen: "multiline"
      }
    ],
    "@stencil-community/ban-exported-const-enums": "warn", // Exported const enums are not allowed
    "@stencil-community/ban-prefix": ["error", ["gx-", "ch-", "st-"]], // Ensures that a Component's tag does not use any of the given prefixes.
    "@stencil-community/element-type": "error", // This rule catches Stencil Element decorator have the correct type
    "@stencil-community/methods-must-be-public": "error", // This rule catches Stencil Methods marked as private or protected
    "@stencil-community/no-unused-watch": "error", // This rule catches Stencil Watchs with non existing Props or States
    "@stencil-community/own-methods-must-be-private": "error", // This rule catches own class methods marked as public
    "@stencil-community/own-props-must-be-private": "error", // This rule catches own class properties marked as public
    "@stencil-community/prefer-vdom-listener": "warn", // This rule catches Stencil Listen with vdom events
    "@stencil-community/props-must-be-public": "warn", // This rule catches Stencil Props marked as private or protected
    "@stencil-community/props-must-be-readonly": "error", // This rule catches Stencil Props marked as non readonly, excluding mutable ones
    "@stencil-community/required-jsdoc": "error", // This rule catches Stencil Props, Methods and Events to define jsdoc
    "@stencil-community/required-prefix": ["error", ["sv-"]], // Ensures that a Component's tag use the "sv" prefix. Now is sv, which stands for sample-vendor..
    "@stencil-community/reserved-member-names": "warn", // Ensures that any of reserved global HTML attribute names are used as @Prop or @Method
    "@stencil-community/single-export": "error", // This rule catches modules that expose more than just the Stencil Component itself
    "@stencil-community/strict-boolean-conditions": "off",
    "@stencil-community/ban-default-true": "warn",

    // WA to fix false positive errors
    "@stencil-community/strict-mutable": "warn" // This rule catches Stencil Prop marked as mutable but not changing value in code
  }
};
