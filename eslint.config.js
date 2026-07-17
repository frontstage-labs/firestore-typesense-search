const js = require("@eslint/js");
const globals = require("globals");
const {FlatCompat} = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

// eslint-config-google (unmaintained since 2018) still references core rules that
// ESLint 9 removed (`valid-jsdoc`, `require-jsdoc`). Strip them so the config loads.
const REMOVED_RULES = ["valid-jsdoc", "require-jsdoc"];
const google = compat.extends("google").map((cfg) => {
  if (cfg.rules) {
    for (const rule of REMOVED_RULES) delete cfg.rules[rule];
  }
  return cfg;
});

module.exports = [
  {
    ignores: ["**/node_modules/**", "coverage/**", "emulator_data/**", "extensions/**", "assets/**", "**/lib/**"],
  },
  js.configs.recommended,
  ...google,
  ...compat.extends("prettier"),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      quotes: ["error", "double"],
      "max-len": [1, {code: 200}],
      "quote-props": [1, "as-needed"],
      indent: ["error", 2],
      "linebreak-style": 0,
    },
  },
];
