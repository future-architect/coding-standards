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

## 本規約で紹介する設計ドキュメントの位置付け

設計ドキュメントは様々な前提条件／制約／経緯で作成され、Excel／Word／パワーポイントなどのファイル形式で作成することが多い。

本規約はそれらを否定するものではなく、様々な利害関係者の要求に応え洗練され続けた上記の設計ドキュメントのテンプレートには、強く敬意を表する。

一方で、設計ドキュメントを精緻に管理していく優先度より、プロダクト開発の効率とビジネスピードをより重視する場合もあり、それらの開発チームでは設計ドキュメントが存在さいない、あっても設計書が実装と乖離しているなどの声も多い。

本規約では、後者のプロダクト開発の効率性を重視し、設計ドキュメントが開発以外の観点から求められない場合において、必要最低限必要だと思われるレベルの記載内容を示す。

設計ドキュメントのファイルフォーマットに制約は無いという前提に立つため、設計ドキュメントの陳腐化を防ぐのに有効だと思われる、テキストベース（Markdown）でGit管理するという思想を採用する。

本規約で紹介した各設計ドキュメントの記載内容を参考にしつつ、各開発チームにおいて必要な情報を追加／削除して利用するという、テンプレートとしての利用を想定する。

## フォルダ階層の推奨

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

```plantuml

@startuml
!include https://raw.githubusercontent.com/future-architect/puml-themes/master/themes/puml-theme-mars.puml

participant Participant as Foo
note over Foo: Event
actor       Actor       as Foo1
boundary    Boundary    as Foo2
control     Control     as Foo3
entity      Entity      as Foo4
database    Database    as Foo5
collections Collections as Foo6
queue       Queue       as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue

@enduml
```

システム構成図などは上記では対応しにくいことが多いため、diagrams.net（draw.io）で作成する。

diagrams.netの場合は、拡張子は以下のいずれかで作成する。

- `.drawio.png`
- `.drawio.jpg`
- `.drawio.svg`

## フロントエンド

以下の方針を取る。

- Figmaを用いて、画面遷移、画面表示項目を定義する
- Markdown設計書には、Figmaで判断可能な見た目の情報は **記載しない**
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

詳細は[OpenAPI Specification 3.0.3規約](https://future-architect.github.io/coding-standards/documents/forOpenAPISpecification/OpenAPI_Specification_3.0.3.html) を参考にする。

### プログラム設計書（バッチ、非同期タスクなど）

[プログラム設計書](プログラム設計書.md)を参考にする。

### プログラム設計書（Web API）

Web APIについても、プログラム設計書と同様に機能ID単位で作成する。

ただし、Web APIにおいては `openapi.yaml` と重複する部分で自明な内容（例えば、リクエストパラメータの定義や、レスポンス項目）については、重複するため記載を省略する。

もし、検索APIで複数のテーブルを参照して結果を応答する場合に、項目の由来を示すため、下表のような形式を定義すること。

#### Web API応答例

| Parameter       | Description | Settings | Note |
|-----------------|-------------|----------|------|
| last_name       | 氏名 (姓)      | m_user   |      |
| first_name      | 氏名 (名)      | m_user   |      |
| last_name_kana  | 氏名カナ (姓)    | m_user   |      |
| first_name_kana | 氏名カナ (名)    | m_user   |      |
| date_of_birth   | 生年月日        | m_user_detail   |      |
| gender_type     | 性別区分        | m_user_detail   |      |
| tel             | 電話番号        | m_user_detail   |      |
| occupation_type | 職業区分        | m_user_detail   |      |
| zipcode         | 郵便番号        | m_user_detail   |      |

※Descriptionは `openapi.yaml` 側の `description` で記載済みであれば、省略すること
※Noteは何かしら加工処理により生み出された項目であれば、計算ロジックを記載する

### I/F 定義書

I/F 定義書は、システム間の連携について定義と、その受信/配信処理の設計書です。

システム I/F は連携先の対向システムが存在するため、認識齟齬が無いように、どのようなプロトコル・項目であるかを定義する必要がある。

[IF定義書](IF定義書.md)を参考にする。

# Resources

次のリンクから単一ファイルで作成されたコーディング規約を取得できます。
(これらのファイルは[Pandoc]を利用して作成しています。)

- [Markdown](https://github.com/future-architect/coding-standards/blob/master/documents/forMarkdown/xxx.md)
- [HTML](https://github.com/future-architect/coding-standards/blob/gh-pages/resources/xxx.html)
- [Word](https://github.com/future-architect/coding-standards/raw/gh-pages/resources/xxx.docx)

[pandoc]: https://pandoc.org/
