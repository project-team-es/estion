import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: ["resources/js/ziggy.js"],
  },
  // 標準的なJavaScriptのルール
  js.configs.recommended,
  // React用の推奨ルール
  reactPlugin.configs.flat.recommended,
  // Prettierと競合するルールをオフにする
  prettierConfig,
  {
    files: ["resources/js/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        route: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "import/no-default-export": "error",
    },
  },
  {
    files: ["resources/js/Pages/**/*.{js,jsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["resources/js/Pages/**/components/**/*.{js,jsx}"],
    rules: {
      "import/no-default-export": "error",
    },
  },
];