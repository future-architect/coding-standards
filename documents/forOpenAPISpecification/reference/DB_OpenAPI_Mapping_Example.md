# DB OpenAPI Mapping Example

|データの種類|DB型|DDL定義|OpenAPI<br>項目必須/非必須|OpenAPI<br>Type/その他定義|API<br>リクエスト/リスポンス|備考|
|:----|:----|:----|:----|:----|:----|:----|
|区分値|varchar|NOT NULL, カラム名 <> ''|required|string/enum|項目必須、空値は許容しない| |
| | |NOT NULL default ''|-|string/enum|項目非必須、空値はundefinedまたは空文字として定義|空値を空文字で定義する場合、enumに空文字を含む必要がある。|
|フラグ|varchar|NOT NULL, カラム名 <> ''|required|string/enum|項目必須、空値は許容しない| |
| | |NOT NULL default ''|-|string/enum|項目非必須、空値はundefinedまたは空文字として定義|空値を空文字で定義する場合、enumに空文字を含む必要がある。|
|数値|integer|NOT NULL|required|integer|項目必須、空値は許容しない| |
| | |-|nullable: true|integer|項目非必須、空値はundefinedまたはnullとして定義| |
|数値（精度有）|numeric|NOT NULL|required|string/正規表現pattern|項目必須、空値は許容しない| |
| | |-|nullable: true|string/正規表現pattern|項目非必須、空値はundefinedまたはnullとして定義| |
|日付/時刻|date / timestamp|NOT NULL|required|string/format指定または正規表現pattern|項目必須、空値は許容しない| |
| | |-|nullable: true|string/format指定または正規表現pattern|項目非必須、空値はundefinedまたはnullとして定義| |
|コード/番号|varchar|NOT NULL, カラム名 <> ''|required|string/正規表現patternや桁数指定|項目必須、空値は許容しない| |
| | |NOT NULL default ''|-|string/正規表現patternや桁数指定|項目非必須、空値はundefinedまたは空文字として定義| |
|名前 / メモ|varchar / text|NOT NULL, カラム名 <> ''|required|string/正規表現patternや桁数指定|項目必須、空値は許容しない| |
| | |NOT NULL default ''|-|string/正規表現patternや桁数指定|項目非必須、空値はundefinedまたは空文字として定義| |
