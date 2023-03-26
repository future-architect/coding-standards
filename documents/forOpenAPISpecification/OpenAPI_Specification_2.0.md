---
sidebarDepth: 4
title: OpenAPI Specification 2.0規約
author: フューチャー株式会社
meta:
  - name: keywords
    content: OpenAPI,Swagger,命名規約,コーディング規約
---

<page-title/>

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。
ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。
また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

[OpenAPI Specification 2.0（Swagger）](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md)定義についてのコーディング規約をまとめます。より新しいバージョンとして[OpenAPI Specification 3.0の規約](OpenAPI_Specification_3.0.3.md)がありますので、ご注意ください。

## 前提条件

本規約は以下の前提で作成されたものである。

* 業務システム向けのWeb API提供を前提とする
    * サードパーティ向けに広く開発するWeb APIではなく、限られたクライアントやシステムと連携すること
    * いわゆる、LSUDs（Large Set of Unknown Developers）ではなく、SSKDs（Small Set of Known Developers）を対象とする
* スキーマファースト
    * 本規約はOpenAPI Specificationの定義ファイルを駆動に、クライアント・サーバサイドのコード生成を行い、高速なWeb API開発につなげることを前提とする
        * Pythonにおける、FastAPI・Django REST Frameworkのように、アプリケーションコードからOpenAPI documentを自動生成する開発手法も存在するが、本規約はこれは想定しない
* JavaScript/TypeScript、Java、Goのエコシステムを本規約のターゲットとする
    * OpenAPI Specificationは広く受け入れられており、コレに対応する様々なツールやフレームワークといったエコシステムがあり、中には定義された設定がうまく認識されない場合がある。本規約では対応していないツールが多い場合、特定の記法を非推奨とすることがあり、同時にその理由も説明する
    * 全ての言語・フレームワーク・ツールの対応状況は調査しきれていないため、利用するプロダクトの対応状況は利用者側で確認をお願いする
* 本規約は、RESTish なWeb APIを構築することを前提としている
    * 原理的なRESTを必ずしも守る必要はないが、例えばHTTPメソッドは、参照はGET、登録はPOST、更新はPUTやPATCH、削除はDELETEで使い分けていたり、Web APIの要求が成功すれば200（OK）、204（No Content）を返し、リソースが無ければ404（Not Found）、操作に失敗すれば500系のエラーを返すといったことを指す


# 全体規約

ファイル全体に関わることとや、YAML記法についての方針をまとめる。

* Swagger定義はYAML、JSONのいずれかのフォーマットで記載できるが、 **YAMLで記載** すること
    * YAMLは視覚的に見やすいとされ、レビューや差分管理が比較的行いやすいと考えられるため
* ファイルの拡張子は `yaml` とする。通常ファイル名は `swagger.yaml` を推奨する
    * もし、複数の Swagger定義を管理するため区別したい場合は `${service}_swagger.yaml` とする
    * `${service}` にはサービス名を指定する
* 複数項目を指定する場合は、 **配列スキーム** を用いることを推奨する
    ```yaml
    # OK（推奨: 配列リテラル構文）
    schemes: [http, https]
    
    # NG（非推奨: リスト構文）
    schemes:
      - http
      - https
    ```
    * YAMLは項目定義がネストすることで縦長な定義になりやすい。情報密度を上げるために配列リテラルを推奨する
* 文字列のクォート（シングルクォート `'` や、 ダブルクォート `"` は指定しない）
    ```yaml
    # OK
    description: 何かしらの説明
    
    # NG（クォートでのラップは不要）
    description: '何かしらの説明'
    description: "何かしらの説明"
    ```
* 改行を含む場合は、パイプ（ブロックスカラー） `|` を用いる

```yaml
# TODO

```

# 要素規約

Swagger の基本構造は以下のような、swagger・info・host・basePath・schemes・pathsから構成される。

```yaml
# https://swagger.io/docs/specification/2-0/basic-structure/ から
swagger: "2.0"
info:
  title: Sample API
  description: API description in Markdown.
  version: 1.0.0
host: api.example.com
basePath: /v1
schemes:
  - https
produces:
  - application/json
consumes:
  - application/json
tags:
  - name: user
    description: ユーザー
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in Markdown.
      produces:
        - application/json
      responses:
        200:
          description: OK
```

## swagger

* `2.0` 固定とする

## info

* `title`, `description`, `version` を記載します
* `title` はWeb APIがどういった機能を提供するものか簡潔に記載する
* `description` には、Web APIが提供する機能の詳細・想定する利用者やユースケース・制約などを記載する
* `version` はサービスが採用するバージョン管理と同期を取る
    * サービスのバージョン管理と同期をとることが重要である、本規約では形式は任意とする
    * 例えば、 `major.minor.patch` のようなセマンティックバージョニングや、 1.0-beta や 2023.03.26 といった形式を許容する


## host

OpenAPI 3系と異なり、 **Swaggerでは複数のホストを指定できない**。そのためhostにはローカル開発で用いるIP、ポート番号を指定する。もし、他チームに提供する場合は、dev, staging環境のエンドポイントを指定しても良い。

```yaml
# OK（ローカル開発で用いる環境を指定する）
host: localhost:8001

# OK（他チーム向けへのお試し環境としてdev環境を指定しても良い）
host: dev.api.example.com:80

# NG（LSUDs向けのWeb API開発では不用意に本番環境を触られたくないときが多く、避けるべきである）
host: prod.api.example.com:80
```

## basePath

作成するSwagger定義のURLパスの全てで、共通するプレフィックスを持つ場合に指定する。Swaggerの仕様上、先頭には `/` が必須であるため、以下のように定義する。

```yaml
# OK
basePath: /v1
basePAth: /api/v2

# NG
basePath: v2
```

## schemes

LSUDs向けのWeb API開発ではdev、staging、production向けのエンドポイントの情報共有はコントロール下にあるのが一般的である。そのため、schemes はローカル開発で用いるであろう `http` を指定する。もし、他チーム向けにお試し環境を提供する場合は、 `https` を指定する。新規構築のWeb APIで両スキーマを指定することは稀だと考えられるため、2つともは通常指定することはない。

```yaml
# OK
schemes:
  - http
# OK
schemes:
  - https

# NG（目的次第だが、通常は指定する必要はないはず）
schemes:
  - http
  - https
```

もし、WebSocketスキームを提供するサービスの定義である場合は、 `ws` および `wss` を（追加で）指定する。定義上は `http`, `https` 側との共存ができないため、ファイル定義を分けるようにする。

## security

## securityDefinitions

## produces

Web APIが応答する際の MIME タイプを指定します。未指定の場合に、コード生成などツール側で予期しない動作をすることがあるため、固定で指定する。新規構築のWeb APIであれば `application/xml` は不要と通常は考えらえるので、`application/json` だけ記載する。

```yaml
# OK
produces:
  - application/json
```

## consumes

Web APIが要求を受け入れる際の MIME タイプを指定します。未指定の場合に、コード生成などツール側で予期しない動作をすることがあるため、固定で指定する。新規構築のWeb APIであれば `application/xml` は不要と通常は考えらえるので、`application/json` だけ記載する。 `consumers` はPOST, PUT, PATCHを利用した操作のみに影響し、GETなどリクエストボディが無い操作では無視される。

```yaml
# OK
consumes:
  - application/json
```

あるAPIのみ、バイナリ（画像データなど）を返すなどのケースがあれば、 `paths` 配下で上書き指定する。

```yaml
paths:
  /logo:
    get:
      summary: Returns the logo image
      produces:
        - image/png
      responses:
        200:
          description: OK
          schema:
            type: file
```

## tags


## paths

## externalDocs

## definitions

## parameters

## responses


---

# License

[![CC-By-4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/deed.ja)
