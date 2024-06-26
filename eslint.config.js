import svelte_config from "@sveltejs/eslint-config";
import lube from "eslint-plugin-lube";
import boundaries from "eslint-plugin-boundaries";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...svelte_config,
  {
    plugins: {
      lube,
      boundaries,
    },
    extends: [
      "plugin:boundaries/recommended",
    ],
    rules: {
      "no-console": "error",
      "lube/svelte-naming-convention": ["error", { fixSameNames: true }],
      "object-shorthand": "off",
      "no-var": "off",
      "@stylistic/quotes": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": "off",
      // Append the rules from boundaries configuration here
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          "type": "app",
          "pattern": "app"
        },
        {
          "type": "pages",
          "pattern": "pages/*",
          "capture": ["page"]
        },
        {
          "type": "widgets",
          "pattern": "widgets/*",
          "capture": ["widget"]
        },
        {
          "type": "features",
          "pattern": "features/*",
          "capture": ["feature"]
        },
        {
          "type": "entities",
          "pattern": "entities/*",
          "capture": ["entity"]
        },
        {
          "type": "shared",
          "pattern": "shared/*",
          "capture": ["segment"]
        }
      ],
      "boundaries/entry-point": [
        {
          "default": "disallow",
          "rules": [
            {
              "target": [
                [
                  "shared",
                  {
                    "segment": "lib"
                  }
                ]
              ],
              "allow": "*/index.ts"
            },
            {
              "target": [
                [
                  "shared",
                  {
                    "segment": "lib"
                  }
                ]
              ],
              "allow": "*.(ts|tsx)"
            },
            {
              "target": [
                [
                  "shared",
                  {
                    "segment": "constants"
                  }
                ]
              ],
              "allow": "index.ts"
            },
            {
              "target": [
                [
                  "shared",
                  {
                    "segment": "(ui|api)" // ("ui"|"constants")
                  }
                ]
              ],
              "allow": "**"
            },
            {
              "target": ["app", "pages", "widgets", "features", "entities"],
              "allow": "index.(ts|tsx)"
            },
            {
              "target": ["app", "pages", "widgets", "features", "entities"],
              "allow": "pub/*.(ts|tsx)"
            }
          ]
        }
      ],
      "boundaries/element-types": [
        {
          "default": "allow",
          "message": "${file.type} is not allowed to import (${dependency.type})",
          "rules": [
            {
              "from": ["shared"],
              "disallow": ["app", "pages", "widgets", "features", "entities"],
              "message": "Shared module must not import upper layers (${dependency.type})"
            },
            {
              "from": ["entities"],
              "message": "Entity must not import upper layers (${dependency.type})",
              "disallow": ["app", "pages", "widgets", "features"]
            },
            {
              "from": ["entities"],
              "message": "Entity must not import other entity",
              "disallow": [
                [
                  "entities",
                  {
                    "entity": "!${entity}"
                  }
                ]
              ]
            },
            {
              "from": ["features"],
              "message": "Feature must not import upper layers (${dependency.type})",
              "disallow": ["app", "pages", "widgets"]
            },
            {
              "from": ["features"],
              "message": "Feature must not import other feature",
              "disallow": [
                [
                  "features",
                  {
                    "feature": "!${feature}"
                  }
                ]
              ]
            },
            {
              "from": ["widgets"],
              "message": "Feature must not import upper layers (${dependency.type})",
              "disallow": ["app", "pages"]
            },
            {
              "from": ["widgets"],
              "message": "Widget must not import other widget",
              "disallow": [
                [
                  "widgets",
                  {
                    "widget": "!${widget}"
                  }
                ]
              ]
            },
            {
              "from": ["pages"],
              "message": "Page must not import upper layers (${dependency.type})",
              "disallow": ["app"]
            },
            {
              "from": ["pages"],
              "message": "Page must not import other page",
              "disallow": [
                [
                  "pages",
                  {
                    "page": "!${page}"
                  }
                ]
              ]
            }
          ]
        }
      ]
    },
  },
  {
    files: ["playgrounds/**/*"],
    rules: {
      "lube/svelte-naming-convention": "off",
      "no-console": "off",
    },
  },
  {
    ignores: [
      "**/*.d.ts",
      "**/tests",
    ],
  },
];
