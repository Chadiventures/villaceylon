import nextCoreWebVitals from "eslint-config-next/core-web-vitals"

const config = Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals]

const eslintConfig = [
  ...config,
  {
    ignores: [
      ".next/**",
      ".next-*/**",
      "papaya-tree-*/**",
      "papaya-tree-site/**",
      "node_modules/**",
      "public/**",
      "main.js",
      "scripts/**",
    ],
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
]

export default eslintConfig
