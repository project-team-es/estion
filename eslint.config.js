import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

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
        version: "detect", // Reactのバージョンを自動検出
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // import React from 'react' を不要にする
      "react/prop-types": "off"
    },
  },
];