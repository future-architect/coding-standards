---
sidebarDepth: 4
title: OpenAPI Specification 3.0.3規約
author: フューチャー株式会社
meta:
  - name: keywords
    content: OpenAPI,命名規約,コーディング規約
---

<page-title/>

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。  
ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。  
また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

[OpenAPI Specification 3.0.3](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md)に則ったAPIドキュメントを記述する際のコーディング規約をまとめます。古いバージョンとして[OpenAPI Specification 2.0の規約](OpenAPI_Specification_2.0.md)がありますので、v2をご利用の方はこちらをご参照ください。

## 適用箇所

本規約は以下の[前提条件](prerequisite.md)で作られたものである。

## Web API 自体の設計について

[API 設計標準](API_Design.md) に準じる。

## ファイルフォーマット

[ファイルフォーマット規約](yaml_standards.md)に準じる。

## ファイル単位

OpenAPI ドキュメントは単一のファイルで構成することも複数の分割されたファイルで構成することもできるが、**複数のファイルに分割する**ことを推奨する。  
理由は下記の通りである。

- XXX
- XXX

（相談事項）

- 分割のパターンがあるのであれば、いくつかケースに応じてパターン分けして記載する。
- ファイルの命名についてもここで触れる

# OpenAPI ドキュメントの構成要素

OpenAPI ドキュメントを構成する要素はオブジェクトと呼ばれ、ルートオブジェクトは下記の要素で構成される。  
各種規約を読み進めるにあたってあらかじめ大まかに理解しておくことを推奨する。  
各オブジェクトの詳細については[公式ドキュメント](https://spec.openapis.org/oas/v3.0.3#openapi-object)を参照されたい。

| フィールド名 | 必須  | 説明                                                     |
| ------------ | :---: | -------------------------------------------------------- |
| openapi      |   ○   | OpenAPIドキュメントが使用するOpenAPI仕様のバージョン番号 |
| info         |   ○   | APIに関するメタデータ                                    |
| servers      |       | APIサーバへの接続情報                                    |
| paths        |   ○   | APIの利用可能なパスと操作方法                            |
| components   |       | 複数のAPIにおける共通の定義                              |
| security     |       | API全体で利用可能なセキュリティ（認証）機構              |
| tags         |       | 各種APIをグルーピングするためのタグ                      |
| externalDocs |       | 追加の外部ドキュメント                                   |

## コンポーネント化

（相談事項）

- どの単位でコンポーネント化をするか、については個別の規約に入る前に全体として触れておいた方がいいと思う。
- 結構難しいネタ

# 要素規約

先述した OpenAPI ドキュメントを構成する要素別に具体的なコーディング規約を記載する。

## openapi

OpenAPI ドキュメントが使用する OpenAPI 仕様のセマンティックバージョン番号を記載する。  
本規約は`3.0.3`を対象としているため、`3.0.3`とする。

良い例：

```yaml
openapi: 3.0.3
```

悪い例：

```yaml
openapi: 3.0
```

## info

`info`オブジェクトにはWeb APIに関するメタデータを記載する。  
`title`, `description`, `version` を必須項目とする。


| フィールド名   | 必須  | 記載内容                       |
| -------------- | :---: | ------------------------------ |
| title          |   ○   | Web APIの総称                  |
| description    |   ○   | Web APIの簡単な説明            |
| version        |   ○   | OpenAPI ドキュメントのバージョン |
| termsOfService |       | 利用規約のURL        |
| contact        |       | 連絡先情報           |
| license        |       | ライセンス情報       |

### title

WebAPIの総称を記載する。システム名やサービス名 + API のような命名とすることを推奨する。  
例. `X System API`

### desctiption

Web APIが提供する機能の概要・想定する利用者やユースケース・制約などを記載する。

### version

サービスが採用するバージョン管理と同期を取る。  

サービスのバージョン管理と同期をとることが重要である、本規約では形式は任意とする。  
例えば `major.minor.patch` のようなセマンティックバージョニングや `1.0-beta` や `2023.03.26` といった形式を許容する。

## servers

Web APIを提供するサーバの情報を記載する。  
`url`, `description` を必須項目とし、ステージ（local, develop, staging など）が複数ある場合は各ステージ分の情報を記載する。  
ただしLSUDs向けのWeb API開発においては本番環境のURLを不用意に公開したくないケースが多く、記載は避けるべきである。

良い例：

```yaml
servers:
- url: http://localhost:8001/
  description: Localhost Server
- url: https://dev.api.example.com/v1
  description: Development Server
- url: https://staging.api.example.com/v1
  description: Staging Server
```

悪い例：
```yaml
servers:
- url: https://prod.api.example.com/v1
  description: Production Server
```

## paths

### operationId

### description

### parameters

### responses

## components

## security

## tags

## externalDocs

# 設計上のポイント

（相談事項）

- 要素規約が「どのように書くか」に焦点を当てているのに対し、そもそも「何を書くか」といった部分については、切り出して要素規約から refer させる形の方がスッキリするかも。要素規約に入れられるならそれでよし。描きながらバランス見て。

## バリデーションをどこまで厳密に定義するか

## 値が存在しないという状態の表現

#### undefined と null

- リクエスト/レスポンスにおいて、ある項目の値が存在しないという状態を表現する場合、①その項目自体を含めず `undefined` とする方法と、②値に `null` を使用する方法がある。

  ① `undefined` とする場合、OpenAPI定義とJSONデータの例

  ```yaml
  application/json:
    schema:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
      required:
        - id
  ```
  ```jsonc
  {"id": "00001"}  //nameの値が存在しない
  ```

  ```jsonc
  {}  //idの値も存在しない場合、idは項目必須であるためバリデーションエラーとなる
  ```

  ② 値に `null` を使用する場合、OpenAPI定義（OpenAPI3.0）とJSONデータの例

  ```yaml
  application/json:
    schema:
      type: object
      properties:
        id:
          type: string
          nullable: true
        name:
          type: string
          nullable: true
      required:
        - id
  ```

  ```jsonc
  {"id": "00001", "name": null}  //nameの値が存在しない
  ```

  ```jsonc
  {"id": null, "name": null}  //id, nameとも値が存在しない
  ```

  ```jsonc
  {}  //この場合は、required指定の、id項目がないためバリデーションエラーとなる
  ```

- 原則としては、①`undefined` による定義を使用する方が、API仕様の表現が煩雑にならず、また通信サイズの点からも有利である。

#### 差分更新APIの場合

- 差分更新（PATCH）APIにおいては、項目が更新対象外であることと、項目が更新してクリアする対象であることを明確に区別する必要がある。このような場合には、以下のいずれかの方法を採用する。

  １）項目を文字列として定義し、空値として空文字("")を採用する。
  - floatやint等の数値についても、文字列型として定義することで、項目が `undefined` または `null` であれば「更新対象外」、項目が空文字であれば「更新してクリアする対象」であると判定できる。
  - この場合、空文字はOpenAPIの`format`定義に許容されないため注意が必要である。`format`定義の代わりに、`pattern`に空文字を許容する正規表現を定義する必要がある。  
  <br>
  
  ２）カスタムモデルを使用する
  - APIで受け取るデータをデシリアライズする際に、`undefined` と `null` を区別できるようなカスタムモデルを作成すると、１）のように数値を文字列型として扱う必要がなく、OpenAPIの`format` 定義を使用することも可能である。
  - この場合、OpenAPIからの自動生成モデルにはカスタマイズが必要となる。
  - カスタムモデルの例 (参照元: [技術ブログ](https://future-architect.github.io/articles/20211028b/#プログラムの観点))


#### 各言語による表現の違い

  <details>
  <summary>Golang</summary>
  
  - Golangの場合、以下のように、`nil` になり得る項目はポインタ型とした上で、`undefined` となり得る項目は `omitempty` タグを付与する。
  
  ```go
    type Data struct {
      NotNullableString1 string  `json:"not_nullable_string_1"`
      NotNullableString2 string  `json:"not_nullable_string_2"`
      NullableString1    *string `json:"nullable_string_1"`
      NullableString2    *string `json:"nullable_string_2,omitempty"`
      NullableString3    *string `json:"nullable_string_3"`
      NullableString4    *string `json:"nullable_string_4,omitempty"`
      NotNullableInt1    int64   `json:"not_nullable_int_1"`
      NotNullableInt2    int64   `json:"not_nullable_int_2"`
      NullableInt1       *int64  `json:"nullable_int_1"`
      NullableInt2       *int64  `json:"nullable_int_2,omitempty"`
      NullableInt3       *int64  `json:"nullable_int_3"`
      NullableInt4       *int64  `json:"nullable_int_4,omitempty"`
    }

    // Set values
    data := Data{
      NotNullableString1: "value",
      NullableString1:    nil,
      NullableString2:    nil,
      NotNullableInt1:    1,
      NullableInt1:       nil,
      NullableInt2:       nil,
    }
    // Serialize
    jsonString, _ := json.Marshal(data)
    fmt.Println(string(jsonString))
    buf := bytes.NewBuffer(jsonString)

    decoder := json.NewDecoder(buf)
    var v Data
    // Deserialize
    decoder.Decode(&v)
    fmt.Printf("After decoded: %#v\n", v)
  ```
  
  - シリアライズ後のjsonを見ると、値がセットされない場合には、項目にゼロ値（ポインタ型は`nil`, string型は空文字、int型は`0`）が入っている。
  - 項目がゼロ値の場合に`omitempty` が付与されていると、 項目ごと除外されている（`undefined` となっている）。

  ```json
    {
      "not_nullable_string_1": "value",
      "not_nullable_string_2": "",
      "nullable_string_1": null,
      "nullable_string_3": null,
      "not_nullable_int_1": 1,
      "not_nullable_int_2": 0,
      "nullable_int_1": null,
      "nullable_int_3": null
    }
  ```

  - デシリアライズ後の構造体を見ると、jsonの項目が`undefined`であっても `null` であっても、`nil` として保持されている。

  ```go
    After decoded:
    Data{
        NotNullableString1:"value",
        NotNullableString2:"",
        NullableString1:(*string)(nil),
        NullableString2:(*string)(nil),
        NullableString3:(*string)(nil),
        NullableString4:(*string)(nil),
        NotNullableInt1:1,
        NotNullableInt2:0,
        NullableInt1:(*int64)(nil),
        NullableInt2:(*int64)(nil),
        NullableInt3:(*int64)(nil),
        NullableInt4:(*int64)(nil)
    }
  ```
  </details>


  <details>
  <summary>Java</summary>


  - Javaの場合、`int` や `double` などのプリミティブ型は `null` になれないため、`nullable` にするためには、それぞれのラッパークラスである参照型（`Integer`, `Double` など）を使用する必要がある。
  - jsonにシリアライズ後に`null` の項目を保持するか否かは、例えば、[Jacksonライブラリ](https://github.com/FasterXML)を用いて以下のように区別される。


  ```java
    public class Data {
        public Data(){};
        public Data(String str1, String str2, int notNullableInt){
            this.nullableString1 = str1;
            this.nullableString2 = str2;
            this.notNullableInt = notNullableInt;
        };
        @JsonInclude(JsonInclude.Include.ALWAYS)
        private String nullableString1;
        
        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String nullableString2;
        
        private int notNullableInt;
        
        // Setters
        public void setNullableString1(String nullableString1) {
            this.nullableString1 = nullableString1;
        }
        public void setNullableString2(String nullableString2) {
            this.nullableString2 = nullableString2;
        }
        public void setNotNullableInt(int notNullableInt) {
            this.notNullableInt = notNullableInt;
        }
        // Getters
        public String getNullableString1() {
            return nullableString1;
        }
        public String getNullableString2() {
            return nullableString2;
        }
        public int getNotNullableInt() {
            return notNullableInt;
        }
    }
  ```
    
  ```java
    // Set nothing to the fields.
    Data dataWithNothing = new Data();
    // Set intial values to the fields.
    Data dataWithInitialValues = new Data(null,null,0);
    // Set values to the fields.
    Data dataWithValues = new Data("","",1);

    List<Data> dataList = Arrays.asList(dataWithNothing, dataWithInitialValues, dataWithValues);
    ObjectMapper mapper = new ObjectMapper();        
    for(Data d : dataList){
        // Serialize
        String json = mapper.writeValueAsString(d);
        System.out.println(json);

        // Deserialize
        Data deserialized = mapper.readValue(json, Data.class);
        System.out.println(ToStringBuilder.reflectionToString(deserialized, ToStringStyle.SHORT_PREFIX_STYLE));
    }
  ```
    
  - シリアライズ後のjsonを見ると、参照型`String`の初期値は`null`、プリミティブ型`int`の初期値は`0`となっている。
  - `@JsonInclude(JsonInclude.Include.ALWAYS)` アノテーションを付与した項目は、値が`null`の場合でも項目が保持される。
  - `@JsonInclude(JsonInclude.Include.NON_NULL)` アノテーションを付与した項目は、値が`null`の場合には項目ごと除外されている（`undefined`となっている）。

  ```json
    {
      "nullableString1": null,
      "notNullableInt": 0
    }

    {
      "nullableString1": null,
      "notNullableInt": 0
    }

    {
      "nullableString1": "",
      "nullableString2": "",
      "notNullableInt": 1
    }
  ```

  - デシリアライズ後のオブジェクトを見ると、jsonの項目が`undefined`であっても `null` であっても、`null` として保持されている。
    
  ```java
    Data[nullableString1=<null>,nullableString2=<null>,notNullableInt=0]

    Data[nullableString1=<null>,nullableString2=<null>,notNullableInt=0]

    Data[nullableString1=,nullableString2=,notNullableInt=1]
  ```
  </details>

  <details>
  <summary>TypeScript</summary>
  
  - TypeScriptの場合、以下のように、`null`, `undefined` を区別して定義することが可能である。Optional指定（項目名に`?`を付与）することで`undefined`をセットする必要がなくなる（項目が「非必須」となる）。
  
  ```typescript
    interface Data {
      nullable_string1: string;
      nullable_string2: string;
      nullable_string3: string;
      nullable_string4: string;
      nullable_string5?: string;
      nullable_num1: number;
      nullable_num2: number;
      nullable_num3: number;
      nullable_num4: number;
      nullable_num5?: number;
    }

    const body: Data = {
      nullable_string1: 'value1',
      nullable_string2: '',
      nullable_string3: null,
      nullable_string4: undefined, // 定義しないとエラーとなる
      nullable_num1: 1,
      nullable_num2: 0,
      nullable_num3: null,
      nullable_num4: undefined, // 定義しないとエラーとなる
    }
    var jsonString = JSON.stringify(body)
    console.log(jsonString)

    const deserialized: Data = JSON.parse(jsonString);
    console.log(deserialized)
  ```

  - シリアライズ後のjsonを見ると、`undefined`定義した項目は除外されている。
  
  ```json
    {
      "nullable_string1": "value1",
      "nullable_string2": "",
      "nullable_string3": null,
      "nullable_num1": 1,
      "nullable_num2": 0,
      "nullable_num3": null
    }
  ```
  
  - デシリアライズ後のオブジェクトを見ると、jsonの項目が`null` の場合にのみ`null` として保持されており、項目のない場合と区別されている。

  ```typescript
    nullable_string1: "value1"
    nullable_string2: ""
    nullable_string3: null
    nullable_num1: 1
    nullable_num2: 0
    nullable_num3: null
  ```

  </details>

#### 参照リンク

- `undefined` と `null` の使い方について詳細な解説は、[技術ブログ記事](https://future-architect.github.io/articles/20211028b/)を参照されたい。
- OpenAPI定義をDB定義に対応させることにより、異なるAPI間で整合のとれた処理設計をすることがのぞましい。DB定義とOpenAPI定義の対応例は、[DB定義とOpenAPI定義のマッピング](./reference/DB_OpenAPI_Mapping_Example.md)を参照されたい。 



# 各種ツール、サービスとの統合

特定のツール、サービスに依存する拡張系

## oapi-codegen

## Amazon API Gateway

---

# License

[![CC-By-4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/deed.ja)
