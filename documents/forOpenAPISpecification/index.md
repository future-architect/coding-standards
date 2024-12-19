---
sidebarDepth: 4
author: フューチャー株式会社
layout: home
hero:
  name:  '<span style="white-space: nowrap">OpenAPI Specification規約</span>'
  tagline: Future Enterprise Naming Convention Standards for OpenAPI Specification
  actions:
    - theme: brand
      text: OAS 3.0.3 規約
      link: ./OpenAPI_Specification_3.0.3.md
    - theme: brand
      text: OAS 2.0（Swagger 2.0）規約
      link: ./OpenAPI_Specification_2.0.md
---

OpenAPI Specification（OAS）の規約を、設計・開発・テスト・可読性・保守性・ツールによるコード生成や静的解析の観点からまとめています。

# 対応するバージョンについて

OpenAPI Specification（OAS）の規約を設計、開発、テスト、可読性、保守性、ツールによるコード生成や静的解析の観点からまとめています。

OAS は次のように複数のバージョンが存在します。

| Version | Date       | Notes                                            |
| ------- | ---------- | ------------------------------------------------ |
| 3.1.0   | 2021-02-15 | Release of the OpenAPI Specification 3.1.0       |
| 3.0.3   | 2020-02-20 | Patch release of the OpenAPI Specification 3.0.3 |
| 3.0.2   | 2018-10-08 | Patch release of the OpenAPI Specification 3.0.2 |
| 3.0.1   | 2017-12-06 | Patch release of the OpenAPI Specification 3.0.1 |
| 3.0.0   | 2017-07-26 | Release of the OpenAPI Specification 3.0.0       |
| 2.0     | 2014-09-08 | Release of Swagger 2.0                           |
| 1.2     | 2014-03-14 | Initial release of the formal document.          |
| 1.1     | 2012-08-22 | Release of Swagger 1.1                           |
| 1.0     | 2011-08-10 | First release of the Swagger Specification       |

本規約はコード生成などのエコシステムがよく対応している、 `3.0.3` と `2.0` の 2 つに対応しています。2023 年 3 月時点における最新の `3.1.0` には対応していないのでご注意ください。

もし、新規に OpenAPI Specification で Web API の設計開発をする方は、 `3.0.3` 系を利用することを推奨しています。 `2.0` 系の規約に関しては、既存で利用しているシステムの存在や、利用を想定しているツールの制限などで必要な場面が少なからずあるということで公開しています。

どのツールがどのバージョンに対応しているかは、以下のサイトを参考ください。

[https://openapi.tools/](https://openapi.tools/)

# OpenAPI Specification Standards

| Version | コーディング規約                                             |
| ------- | ------------------------------------------------------------ |
| 3.0.3   | [OAS 3.0.3 規約](./OpenAPI_Specification_3.0.3.md)           |
| 2.0     | [OAS 2.0（Swagger 2.0）規約](./OpenAPI_Specification_2.0.md) |

# Resources

次のリンクから単一ファイルで作成されたコーディング規約を取得できます。
(これらのファイルは[Pandoc]を利用して作成しています。)

- [Markdown](https://github.com/future-architect/coding-standards/blob/master/documents/forOpenAPISpecification/OpenAPI_Specification_2.0.md)
- [HTML](https://github.com/future-architect/coding-standards/blob/gh-pages/resources/OpenAPI_Specification_2.0.html)
- [Word](https://github.com/future-architect/coding-standards/raw/gh-pages/resources/OpenAPI_Specification_2.0.docx)

[pandoc]: https://pandoc.org/
