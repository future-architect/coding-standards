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
  ],
  "/documents/forAWSResource/": [
    "/documents/forAWSResource/",
    "/documents/forAWSResource/AWSインフラリソース命名規約.html",
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
  },
  head: [],
  locales: {
    "/": {
      lang: "ja",
    },
  },
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
        ],
      },
      {
        text: "AWSResource",
        items: [
          {
            text: "Home",
            link: "/documents/forAWSResource/",
          },
          {
            text: "For AWSインフラリソース",
            link: "/documents/forAWSResource/SAWSインフラリソース命名規約.html",
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
