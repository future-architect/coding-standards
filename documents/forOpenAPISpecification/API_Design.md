# Web API 設計標準

OpenAPI Specification 規約を利用するに当たり、想定する Web API の設計ルールをまとめる。このルールに必ずしも準じる必要は無いが、このような設計を暗黙的に考慮し OpenAPI Specification 規約を作成している。

## HTTP メソッド

実現したい操作により、以下のような使い分けを想定する。HEAD（リソースの存在チェック）、GET（参照）、POST（新規作成）、PUT（更新）、PATCH（一部更新）、DELETE（削除）。

## HTTP ステータス

原則として[RFC 7231](https://tools.ietf.org/html/rfc7231#section-6)で定義されているレスポンスステータスコードを利用します。

ユースケース別に利用すべき HTTP ステータスコードを記載します。

### 共通

- バリデーションエラー：`400 Bad Request`
- 業務エラー：`400 Bad Request`
- 認証エラー：`401 Unauthorized`
- 認可エラー：`403 Forbidden`
- システムエラー：`500 Internal Server Error`

### GET

- 正常系：`200 OK`
  - 検索系 API で結果 0 件の場合も、 `200 OK` を返すとする
- パスキー検索系 API で対象リソースが存在しないエラー：`404 Not Found`

### POST

- 正常系（同期）：`201 Created`
- 正常系（非同期）：`202 Accepted`
- 一意制約違反エラー：`409 Conflict`
- 親リソースが存在しないエラー：`404 Not Found`

### PUT

- 正常系（同期）：`200 OK`
- 正常系（非同期）：`202 Accepted`
- 対象リソースが存在しないエラー：`404 Not Found`

### DELETE

- 正常系：`204 No Content`
  - もし、削除した項目の情報を応答する場合は `200 OK` とする
- 対象リソースが存在しないエラー：`404 Not Found`

## API バージョン管理

- /v1, /v2 といったパスで表現する
- 型名変更、必須パラメータの追加、レスポンスの桁数変更、などをするときはバージョンを上げることを検討する

## パラメータの命名

boolean 型である場合、 `[a-zA-Z0-9-_]+_flag` という命名は非推奨とする。

`is_[a-zA-Z0-9-_]+` や `has_[a-zA-Z0-9-_]+` などの命名を代わりに検討する
