// functions/eslint.config.js
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["lib"],
    },
    ...tseslint.configs.recommended, // <- espalha o array, não aninha
    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];
