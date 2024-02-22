---
sidebarDepth: 4
author: フューチャー株式会社
home: true
heroText: Markdown設計ドキュメント規約
tagline: Future Enterprise Markdown Design Document Standards
pageClass: lang-home
footer: ©2015 - 2024 Future Enterprise Coding Standards - Future Corporation
---

Markdownベースの設計ドキュメントの規約をまとめる。

システム開発にて利用する設計ドキュメントをMarkdownベースにすることで、コーディングと同じ慣れたツールを用いて、Gitによるバージョン管理、レビュープロセス、CI/CDなどに自動化（静的解析、自動生成）を行いやすくし、ドキュメントを陳腐化させず、俊敏な設計開発を目指す。

Markdownに限った話では無いが、どういった内容を設計書に記載すべきかは悩むポイントは多い。

本規約では、アプリケーションの種別ごとに記載すべき内容と、それをどのようなMarkdownの構造で記載するかを規約化し、各チームで悩む余地を減らし、注力すべきことに集中できる環境を提供することを目的とする。

## 前提

本規約は以下の前提で作成されている

- チーム/プロジェクトが3～30名程度規模程度
- Git（GitHub, GitLab）で管理され、コードと設計書が同一リポジトリで管理される
- システム開発で必要なアプリケーション開発

## フォルダ階層

リポジトリ直下に `docs` フォルダを作成し、その配下に設計ドキュメントとなるMarkdownファイルを配備する。
<!-- TODO 【相談】docsだと公開フォルダとみなされるかもなので、documentsとかにしたほうが良いか？ -->

次はバックエンド、フロントエンド、インフラのコードをモノリポで管理している例である。

```sh
.
├── backend # バックエンド系のコード
├── docs
├── frontend # フロントエンド系のコード
├── infrastructure # インフラ系のコード
```

`docs` 配下は以下のルールにしたがった構造を取る。

- `01_`、`02_` といったプレフィックスを持つ
- 番号には体系をもたせず、必要になったタイミングでインクリメントさせる
- オンボーディングコストを抑えるため、なるべく先頭に新規参画者が欲する情報を配備する

構成例を次にあげる。

<!-- TODO 【相談】フロントエンド系、もっとまとめたほうが良いか？Figmaパスだけだとあれですよねぇ。画面遷移図も内容が薄い。 -->

```sh
docs
├── 01_キャッチアップ # ドメイン知識など抑えておくべき前提知識
├── 02_環境構築     #
├── 03_開発規約     # GitFlowなど、リリース方式、CI／CD周り
├── 04_ユーザーストーリー #
├── 05_画面レイアウト # Figmaのパスなど
├── 06_画面遷移図  #
├── 07_画面アクション
├── 08_API設計書   # OpenAPIのパス＋各BL設計
├── 09_データモデル # ERD, テーブル定義
├── 10_IF設計書    # I/F定義＋受信/送信BL設計
├── 11_バッチ設計書 # タイマー、イベント起動の非同期処理のBL設計
├── 12_インフラ設計 # 監視、キャパシティサイジング、コスト
├── ...
└── README.md
```

## システム構成図

TODO 論理, 物理, etc.

## フロントエンド

### 画面遷移
TODO

### 画面xxx

TODO

## バックエンド

### テーブル定義書

A5ER

### 区分値

TODO JSON/YAML で管理推奨など

### Web API設計書

API定義書はOpenAPI.yamlで記載する

TODO 各エンドポイント毎のプログラム設計

### プログラム設計書

TODO

### I/F定義書

I/F定義書は、システム間の連携について定義と、その受信/配信処理の設計書です。

システムI/Fは連携先の対向システムが存在するため、認識齟齬が無いように、どのようなプロトコル・項目であるかを定義する必要があります。

* [レイアウト](IF定義書.md)

# Resources

次のリンクから単一ファイルで作成されたコーディング規約を取得できます。
(これらのファイルは[Pandoc]を利用して作成しています。)

- [Markdown](https://github.com/future-architect/coding-standards/blob/master/documents/forMarkdown/xxx.md)
- [HTML](https://github.com/future-architect/coding-standards/blob/gh-pages/resources/xxx.html)
- [Word](https://github.com/future-architect/coding-standards/raw/gh-pages/resources/xxx.docx)

[pandoc]: https://pandoc.org/
