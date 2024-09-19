import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  // Apply to all JavaScript, TypeScript, JSX, and TSX files
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    languageOptions: {
      // Include global variables from browser and node environments
      globals: { 
        ...globals.browser, 
        ...globals.node 
      },
    }
  },
  
  // Use ESLint's recommended settings for JavaScript
  pluginJs.configs.recommended,

  // Use TypeScript ESLint's recommended settings for TypeScript files
  ...tseslint.configs.recommended,

  // Use the flat recommended settings for React, but disable 'react-in-jsx-scope'
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off', // Turn off this rule as it's not needed in React 17+
    }
  }
];
