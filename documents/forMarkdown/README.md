---
sidebarDepth: 4
author: フューチャー株式会社
home: true
heroText: Markdown設計ドキュメント規約
tagline: Future Enterprise Markdown Design Document Standards
pageClass: lang-home
footer: ©2015 - 2024 Future Enterprise Coding Standards - Future Corporation
---

Markdown ベースの設計ドキュメントの規約をまとめる。

システム開発にて利用する設計ドキュメントを Markdown ベースにすることで、コーディングと同じ慣れたツールを用いて、Git によるバージョン管理、レビュープロセス、CI/CD などに自動化（静的解析、自動生成）を行いやすくし、ドキュメントを陳腐化させず、俊敏な設計開発を目指す。

Markdown に限った話では無いが、どういった内容を設計書に記載すべきかは悩むポイントは多い。

本規約では、アプリケーションの種別ごとに記載すべき内容と、それをどのような Markdown の構造で記載するかを規約化し、各チームで悩む余地を減らし、注力すべきことに集中できる環境を提供することを目的とする。

## 前提

本規約は以下の前提で作成されている

- チーム/プロジェクトが 3 ～ 10 名程度の規模
- Git（GitHub, GitLab）で管理され、コードと設計書が同一リポジトリで管理される
- システム開発で必要なアプリケーション開発

## フォルダ階層

リポジトリ直下に `docs` フォルダを作成し、その配下に設計ドキュメントとなる Markdown ファイルを配備する。

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

```sh
docs
├── 01_キャッチアップ # ドメイン知識など抑えておくべき前提知識
├── 02_環境構築     #
├── 03_開発規約     # GitFlowなど、リリース方式、CI／CD周り
├── 04_ユーザーストーリー
├── 05_UI設計      # Figmaのパスなど
├── 06_画面設計書
├── 07_API設計書   # OpenAPIのパス＋各BL設計
├── 08_データモデル # ERD, テーブル定義
├── 09_IF設計書    # I/F定義＋受信/送信BL設計
├── 10_バッチ設計書 # タイマー、イベント起動の非同期処理のBL設計
├── 11_インフラ設計 # 監視、キャパシティサイジング、コスト
├── ...
└── README.md
```

## システム構成図

図は基本的に変更差分がGitと相性が良い、PlantUML（またはMermaid.js）で作成すること。

システム構成図などは上記では対応しにくいことが多いため、diagrams.net（draw.io）で作成する。

拡張子は以下のいずれかで作成する。

- `.drawio.png`
- `.drawio.jpg`
- `.drawio.svg`

## フロントエンド

以下の方針を取る。

- Figmaを用いて、画面遷移、画面表示項目を定義する
- Markdown設計書には、Figmaで判断可能な見た目の情報は記載しない
- Markdown設計書には、Web APIの呼び出しやイベントの定義、パラメータの受け渡し、バリデーションロジックなどを定義する。

[サンプル設計書](future_muscle_partner)を参考にする。

## バックエンド

### テーブル定義書

[A5:SQL Mk-2](https://a5m2.mmatsubara.com/)を用い、`erd.a5er` という名称で管理する。

以下の情報の管理は `erd.a5er` で行えないため、別で定義する。

- 保持期限
- 個人情報有無

### 区分値

[区分値設計書](区分値設計書.md) を参考にする。

### Web API 設計書

API 定義書は `openapi.yaml` で記載すること。

### プログラム設計書

[プログラム設計書](プログラム設計書.md)を参考にする。

### I/F 定義書

I/F 定義書は、システム間の連携について定義と、その受信/配信処理の設計書です。

システム I/F は連携先の対向システムが存在するため、認識齟齬が無いように、どのようなプロトコル・項目であるかを定義する必要があります。

[IF定義書](IF定義書.md)を参考にする。

# Resources

次のリンクから単一ファイルで作成されたコーディング規約を取得できます。
(これらのファイルは[Pandoc]を利用して作成しています。)

- [Markdown](https://github.com/future-architect/coding-standards/blob/master/documents/forMarkdown/xxx.md)
- [HTML](https://github.com/future-architect/coding-standards/blob/gh-pages/resources/xxx.html)
- [Word](https://github.com/future-architect/coding-standards/raw/gh-pages/resources/xxx.docx)

[pandoc]: https://pandoc.org/
