module.exports = {
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  extends: [
    "eslint-config-react-app",
    "react-app",
    "airbnb-typescript-prettier",
    "plugin:sonarjs/recommended",
  ],
  plugins: ["sonarjs"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/no-array-index-key": 0,
    "react/jsx-fragments": ["off", "element"],
    "react/jsx-props-no-spreading": 0,
    "react/destructuring-assignment": 0,
    "no-invalid-double-slash-comments": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "@typescript-eslint/triple-slash-reference": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-ts-ignore ": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "styled-components",
            message: "Please import from styled-components/macro.",
          },
        ],
        patterns: ["!styled-components/macro"],
      },
    ],
  },
  /*overrides: [
    {
      files: ['**!/!*.ts?(x)'],
      rules: {
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'react/destructuring-assignment': 0,
        'react/jsx-fragments': 0,
        'react/jsx-props-no-spreading': 0,
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/triple-slash-reference': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-ignore ': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-function': 0,
        'no-underscore-dangle': 'off',
        'no-useless-escape': 'off',
      },
    },
  ],*/
};
