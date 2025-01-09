import globals from "globals";
import pluginJs from "@eslint/js";
import pluginNode from "eslint-plugin-node";

/** @type {import('eslint').Linter.Config} */
export default {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.commonjs
    }
  },
  plugins: {
    node: pluginNode
  },
  rules: {
    "node/no-unsupported-features/es-syntax": ["error", { version: ">=14.0.0" }],
    "node/no-unpublished-import": "off",
    "node/no-missing-import": "off"
  },
  ...pluginJs.configs.recommended
};