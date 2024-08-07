"use strict";

const links = {
  "/documents/forJava/Javaコーディング規約_for_11.html": [
    "/documents/forJava/",
    "/documents/forJava/Javaコーディング規約.html",
    "/documents/forJava/Javaコーディング規約_for_11.html",
  ],
  "/documents/forJava/Javaコーディング規約_for_8.html": [
    "/documents/forJava/",
    "/documents/forJava/Javaコーディング規約.html",
    "/documents/forJava/Javaコーディング規約_for_8.html",
  ],
  "/documents/forJava/": [
    "/documents/forJava/",
    "/documents/forJava/Javaコーディング規約.html",
  ],
  "/documents/forSQL/": [
    "/documents/forSQL/",
    "/documents/forSQL/SQLコーディング規約（Oracle）.html",
    "/documents/forSQL/SQLコーディング規約（PostgreSQL）.html",
  ],
  "/documents/forAWSResource/": [
    "/documents/forAWSResource/",
    "/documents/forAWSResource/AWSインフラリソース命名規約.html",
  ],
  "/documents/forOpenAPISpecification/": [
    "/documents/forOpenAPISpecification/",
    "/documents/forOpenAPISpecification/OpenAPI_Specification_2.0.html",
    "/documents/forOpenAPISpecification/OpenAPI_Specification_3.0.3.html",
  ],
  "/documents/forGitBranch/": [
    "/documents/forGitBranch/",
    "/documents/forGitBranch/Gitブランチフロー規約.html",
    "/documents/forGitBranch/recommended_settings.html",
    "/documents/forGitBranch/each_branch.html",
    "/documents/forGitBranch/merge_develop_to_feature.html",
    "/documents/forGitBranch/merge_feature_to_develop.html",
    "/documents/forGitBranch/git_tag.html",
    "/documents/forGitBranch/commit_message_rule.html",
    "/documents/forGitBranch/vscode_git_ope.html",
  ],
};
console.log(links);

module.exports = {
  base: "/coding-standards/",
  title: "Future Enterprise Coding Standards",
  description:
    "フューチャー株式会社が作成するエンタープライズ領域に特化したコーディング規約",
  dest: "docs",
  serviceWorker: false,
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require("./markdown-it-plugin-header-shift"));
      md.use(require("markdown-it-task-lists"));
    },
    plugins: ["vuepress-plugin-mermaidjs"],
  },
  head: [],
  locales: {
    "/": {
      lang: "ja",
    },
  },
  plugins: ["vuepress-plugin-mermaidjs"],
  themeConfig: {
    logo: "/images/logo.svg",
    repo: "https://github.com/future-architect/coding-standards",
    docsRepo: "https://github.com/future-architect/coding-standards",
    docsBranch: "master",
    editLinks: true,
    lastUpdated: true,
    nav: [
      {
        text: "Java",
        items: [
          {
            text: "Home",
            link: "/documents/forJava/",
          },
          {
            text: "For Java17",
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
      },
      {
        text: "SQL",
        items: [
          {
            text: "Home",
            link: "/documents/forSQL/",
          },
          {
            text: "For Oracle",
            link: "/documents/forSQL/SQLコーディング規約（Oracle）.html",
          },
          {
            text: "For PostgreSQL",
            link: "/documents/forSQL/SQLコーディング規約（PostgreSQL）.html",
          },
        ],
      },
      {
        text: "Others",
        items: [
          {
            text: "AWS インフラリソース",
            items: [
              {
                text: "Home",
                link: "/documents/forAWSResource/",
              },
              {
                text: "AWSインフラ命名規約",
                link: "/documents/forAWSResource/AWSインフラリソース命名規約.html",
              },
            ],
          },
          {
            text: "OpenAPI Specification規約",
            items: [
              {
                text: "Home",
                link: "/documents/forOpenAPISpecification/",
              },
              {
                text: "For OAS 2.0（Swagger 2.0）",
                link: "/documents/forOpenAPISpecification/OpenAPI_Specification_2.0.html",
              },
              {
                text: "For OAS 3.0.3",
                link: "/documents/forOpenAPISpecification/OpenAPI_Specification_3.0.3.html",
              },
            ],
          },
          {
            text: "Gitブランチフロー規約",
            items: [
              {
                text: "Home",
                link: "/documents/forGitBranch/",
              },
              {
                text: "Gitブランチフロー規約",
                link: "/documents/forGitBranch/Gitブランチフロー規約.html",
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
  },
};
