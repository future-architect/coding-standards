import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import markdown from "@eslint/markdown";
import markdownPreferences from "eslint-plugin-markdown-preferences";
import markdownLinks from "eslint-plugin-markdown-links";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

export default defineConfig([
  {
    ignores: ["node_modules/", "docs/", ".vitepress/cache/"],
  },
  {
    files: ["**/*.{js,mjs,cjs}", "*.{js,mjs,cjs}"],
    extends: [
      compat.extends("standard"),
      pluginVue.configs["flat/recommended"],
    ],

    rules: {
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  eslintConfigPrettier,
  {
    files: ["**/*.md", "*.md"],
    extends: [
      markdown.configs.recommended,
      markdownPreferences.configs.recommended,
      markdownLinks.configs.recommended,
    ],
    rules: {
      "markdown/no-multiple-h1": "off",
      // TODO 修正が大きいので一旦無効化
      "markdown-preferences/hard-linebreak-style": "off",
      "markdown-links/no-dead-urls": [
        "error",
        {
          allowedAnchors: {
            [String.raw`/^https:\/\/github\.com\//u`]: String.raw`/.*/u`,
          },
          timeout: 100_000,
          ignoreUrls: [
            // TODO なぜか SocketError: other side closed となる。。。
            "http://www.oracle.com/technetwork/java/codeconvtoc-136057.html",
            // サイトは削除されているがドキュメントとしては残すリンク
            "https://www.acroquest.co.jp/webworkshop/javacordingrule/Acroquest_JavaCodingStandard_6_7.pdf",
            "http://www.fedict.belgium.be/sites/default/files/downloads/Java_J2EE_conventions_and_guidelines_EN.pdf",
          ],
        },
      ],
    },
  },
]);
