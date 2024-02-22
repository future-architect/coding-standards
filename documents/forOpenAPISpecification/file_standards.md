# ファイルフォーマット規約

## フォーマット

OpenAPI ドキュメントは JSON 形式、YAML 形式いずれかのフォーマットで記載できるが **YAML 形式** を利用する。

理由として、JSON と比較して YAML は視覚的に見やすく、レビューや差分管理が行いやすいためである。

## ファイル名

ファイルの拡張子は `yaml` とする。通常ファイル名は `api.yaml` や `swagger.yaml`（v2 の場合） を推奨する。

もし、複数の Swagger 定義を管理するため区別したい場合は `${service}_api.yaml` とする。

`${service}` にはサービス名を指定する

## YAML バージョン

[YAML v1.2](https://yaml.org/spec/1.2.2/#61-indentation-spaces)を用いる。

## ファイルレイアウト

- ファイルの最終行には空行を入れる
- 文字コードは UTF-8 とする
- タブは半角スペース 2 つとする

## クォート

クォートは可読性を上げるために、できる限り利用しない。利用する場合はダブルクォートを利用する。

```yaml
# OK
description: 何かしらの説明

# NG（クォートでのラップは不要）
description: '何かしらの説明'
description: "何かしらの説明"
```

以下の場合は必須で利用する

- 文字列として認識させる必要のある数字（"0123"）
- 60 進数と認識させたくない場合（"12:34"）
- Bool として認識させたくない（"true", "false", "yes", "no", "y", "n", "on", "off"）
- `#` で始まる文字列（`#` はコメントを示す記号のためである。例: `#/definitions/Users`）

## YAML 配列スタイル

- 複数項目を指定する場合は、 **Flow style(配列スキーム)** を用いることを推奨する

  ```yaml
  # OK（推奨: 配列リテラル構文）
  required: [user_id, user_name, account_type, register_at]

  # NG（非推奨: リスト構文）
  required:
    - user_id
    - user_name
    - account_type
    - register_at
  ```

  - YAML は項目定義がネストすることで縦長な定義になりやすい。情報密度を上げるために配列リテラルを推奨する

## 改行の表現

改行を含む場合は、パイプ（ブロックスカラー） `|` を用いる

```yaml
description: |
  説明文1
  説明文2
     - 箇条書き1
     - 箇条書き2
     - 箇条書き3
```
