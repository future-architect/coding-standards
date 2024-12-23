import { fileURLToPath } from "url";
import { defineConfig as defineConfigBase } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { Module } from "module";
import markdownItTaskLists from "markdown-it-task-lists";
import markdownItFootnote from "markdown-it-footnote";
import markdownItHeaderShift from "./lib/markdown-it-plugin-header-shift.mjs";
import * as plantumlLanguage from "./lib/plantuml.tmlanguage.mjs";
const __filename = fileURLToPath(import.meta.url);
const pkg = Module.createRequire(__filename)("../package.json");

const repoUrl = pkg.repository.url
  .replace(/\.git$/u, "")
  .replace(/^git\+/u, "");

/** @type {import("vitepress").DefaultTheme.Sidebar} */
const links = {
  "/documents/forJava/": [
    { text: "Introduction", link: "/documents/forJava/" },
    {
      text: "Javaコーディング規約",
      link: "/documents/forJava/Javaコーディング規約.html",
    },
    {
      text: "For Java11",
      link: "/documents/forJava/Javaコーディング規約_for_11.html",
    },
    {
      text: "For Java8",
      link: "/documents/forJava/Javaコーディング規約_for_8.html",
    },
  ],
  "/documents/forSQL/": [
    { text: "Introduction", link: "/documents/forSQL/" },
    {
      text: "SQLコーディング規約（PostgreSQL）",
      link: "/documents/forSQL/SQLコーディング規約（PostgreSQL）.html",
    },
    {
      text: "SQLコーディング規約（Oracle）",
      link: "/documents/forSQL/SQLコーディング規約（Oracle）.html",
    },
  ],
  "/documents/forAWSResource/": [
    { text: "Introduction", link: "/documents/forAWSResource/" },
    {
      text: "AWSインフラ命名規約",
      link: "/documents/forAWSResource/AWSインフラリソース命名規約.html",
    },
  ],
  "/documents/forOpenAPISpecification/": [
    { text: "Introduction", link: "/documents/forOpenAPISpecification/" },
    {
      text: "OpenAPI Specification 2.0規約",
      link: "/documents/forOpenAPISpecification/OpenAPI_Specification_2.0.html",
    },
    {
      text: "OpenAPI Specification 3.0.3規約",
      link: "/documents/forOpenAPISpecification/OpenAPI_Specification_3.0.3.html",
    },
  ],
  "/documents/forGitBranch/": [
    { text: "Introduction", link: "/documents/forGitBranch/" },
    {
      text: "Gitブランチフロー規約",
      link: "/documents/forGitBranch/git_branch_standards.html",
    },
  ],
  "/documents/forSlack/": [
    { text: "Introduction", link: "/documents/forSlack/" },
    {
      text: "Slack利用ガイドライン",
      link: "/documents/forSlack/slack_usage_guidelines.html",
    },
  ],
};

/**
 * @typedef {import('vitepress').UserConfig<import('vitepress').DefaultTheme.Config>} VitepressConfig
 */
/**
 * @param {VitepressConfig} config config
 * @returns {VitepressConfig} config
 */
function defineConfig(config) {
  return withMermaid(defineConfigBase(config));
}

export default defineConfig({
  title: "Future Enterprise Coding Standards",
  description:
    "フューチャー株式会社が作成するエンタープライズ領域に特化したコーディング規約",
  outDir: "docs",
  ignoreDeadLinks: "localhostLinks",
  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(markdownItHeaderShift);
      md.use(markdownItTaskLists);
      md.use(markdownItFootnote);
    },
    languages: [plantumlLanguage],
  },
  locales: {
    root: {
      lang: "ja",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/coding-standards/images/logo-system.svg`,
        type: "image/svg+xml",
      },
    ],
  ],
  srcExclude: ["./README.md"],
  base: "/coding-standards/",
  themeConfig: {
    siteTitle: "Future Enterprise <wbr>Coding Standards",
    logo: {
      light: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
    },
    footer: {
      copyright: `©2015 - ${new Date().getFullYear()} Future Enterprise Coding Standards - Future Corporation`,
    },
    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },
    editLink: {
      pattern: repoUrl + "/edit/master/:path",
    },
    outline: {
      level: "deep",
    },
    nav: [
      {
        text: "Standards",
        items: [
          {
            text: "Java",
            items: [
              {
                text: "Introduction",
                link: "/documents/forJava/",
              },
              {
                text: "Javaコーディング規約",
                link: "/documents/forJava/Javaコーディング規約.html",
              },
              {
                text: "Javaコーディング規約 for Java11",
                link: "/documents/forJava/Javaコーディング規約_for_11.html",
              },
              {
                text: "Javaコーディング規約 for Java8",
                link: "/documents/forJava/Javaコーディング規約_for_8.html",
              },
            ],
          },
          {
            text: "SQL",
            items: [
              {
                text: "Introduction",
                link: "/documents/forSQL/",
              },
              {
                text: "SQLコーディング規約（PostgreSQL）",
                link: "/documents/forSQL/SQLコーディング規約（PostgreSQL）.html",
              },
              {
                text: "SQLコーディング規約（Oracle）",
                link: "/documents/forSQL/SQLコーディング規約（Oracle）.html",
              },
            ],
          },
          {
            text: "AWS インフラリソース",
            items: [
              {
                text: "Introduction",
                link: "/documents/forAWSResource/",
              },
              {
                text: "AWSインフラ命名規約",
                link: "/documents/forAWSResource/AWSインフラリソース命名規約.html",
              },
            ],
          },
          {
            text: "OpenAPI Specification",
            items: [
              {
                text: "Introduction",
                link: "/documents/forOpenAPISpecification/",
              },
              {
                text: "OpenAPI Specification 2.0規約（Swagger 2.0）",
                link: "/documents/forOpenAPISpecification/OpenAPI_Specification_2.0.html",
              },
              {
                text: "OpenAPI Specification 3.0.3規約",
                link: "/documents/forOpenAPISpecification/OpenAPI_Specification_3.0.3.html",
              },
            ],
          },
          {
            text: "Git",
            items: [
              {
                text: "Introduction",
                link: "/documents/forGitBranch/",
              },
              {
                text: "Gitブランチフロー規約",
                link: "/documents/forGitBranch/git_branch_standards.html",
              },
            ],
          },
          {
            text: "Markdown設計ドキュメント規約",
            link: "/documents/forMarkdown/",
          },
          {
            text: "Slack",
            items: [
              {
                text: "Introduction",
                link: "/documents/forSlack/",
              },
              {
                text: "Slack利用ガイドライン",
                link: "/documents/forSlack/slack_usage_guidelines.html",
              },
            ],
          },
        ],
      },
      {
        text: "About Us",
        items: [
          {
            text: "フューチャー株式会社",
            link: "https://www.future.co.jp/",
          },
          {
            text: "Blog",
            link: "https://future-architect.github.io/",
          },
          {
            text: "Qiita",
            link: "https://qiita.com/organizations/future",
          },
          {
            text: "Twitter",
            link: "https://twitter.com/future_techblog",
          },
          {
            text: "Facebook",
            link: "https://www.facebook.com/future.saiyo/",
          },
          {
            text: "Email <techblog@future.co.jp>",
            link: "mailto:techblog@future.co.jp",
          },
        ],
      },
    ],

    sidebar: links,

    socialLinks: [
      {
        icon: "github",
        link: repoUrl,
      },
    ],
  },
});
