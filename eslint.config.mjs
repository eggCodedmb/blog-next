import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "hooks/**",
    "components/tiptap-ui/**",
    "components/tiptap-extension/**",
    "components/tiptap-icons/**",
    "components/tiptap-node/**",
    "components/tiptap-templates/**",
    "components/tiptap-ui-primitive/**",
    
  ]),
]);

export default eslintConfig;
