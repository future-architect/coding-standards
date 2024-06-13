# [機能ID] 新規登録API POST /users


## 説明

- 新規ユーザの会員登録をする

## 仕様

- 本関数は、新規登録APIやAdmin機能として新規登録を実施する際に共通的に必要となる処理を関数化したものである
- 本APIはIDaaSから実行される
  - ユーザマスタにリクエスト.メールアドレスが同一で、有効な（退会していない）レコードが存在する場合は、IDaaSとのデータ不整合ではあるが、データの整合性を直すために、ユーザマスタのユーザIDのみ更新し、処理を終了する
- 既存システムからユーザ属性情報を取得するため、移行ユーザ属性取得関数を呼び出す
  - 本APIリクエスト時点では、移行ユーザか否かの判定ができないため、一律で関数を呼び出す
- 移行ユーザ属性取得関数の戻り値をもとに、ユーザマスタに登録する
  - 移行ユーザ属性取得関数.移行ユーザフラグが1(移行ユーザ)の場合は、ユーザマスタに関数の戻り値に含まれる情報を登録する
  - 移行ユーザ属性取得関数.移行ユーザフラグが0(非移行ユーザ)の場合は、登録する属性情報がないため、属性情報は空または初期値でユーザマスタに登録する
- 移行ユーザ属性取得関数.移行ユーザフラグが1(移行ユーザ)の場合は、移行ユーザと判定して、購読情報の登録を行う
- ポイント基盤への新規登録を行う
- COPがv1.1以降の場合のみの仕様は以下とする
  - メルマガシステムにアカウントとオプトイン情報を登録する

### エラーハンドリングについて

- ポイントシステムへのポイントカード作成完了以降の処理でエラーが発生した場合でもロールバックはせず、エラーログを出力し後続の処理を続ける方針とする
  - 処理完了後、出力されたエラーログを保守担当者が確認し都度対応を行う

## シーケンス図

```plantuml
@startuml
!theme vibrant

title [01-USR-C-0003] 新規登録関数

participant "Backend" as Backend
database    "DB"   as db
participant "Point System" as PointSystem
participant "Mail Magazine System" as MailMagazineSystem

[-> Backend: API Request

note over Backend
    1. Validation
end note
    Backend -> db: 1.1 Select m_user
    alt record count > 0
        Backend -> db: 1.1.1 Update m_user
        alt Error
            <- Backend: 1.1.1.1 throw new Exception with error message
        end
        <- Backend: 1.1.2 Return response
    end

note over Backend
    2. Retrieve migrate user information
end note
    Backend -> Backend: 2.1 Call 01-USR-C-0002
    alt Error
        <- Backend: 2.1.1 throw new Exception with error message
    end

note over Backend
    3. Register user information
end note
    Backend -> db: 3.1 Insert m_user and return user_key
    alt Error
        <- Backend: 3.1.1 throw new Exception with error message
    end

    Backend -> db: 3.2 Insert t_user_stage
    alt Error
        <- Backend: 3.2.1 throw new Exception with error message
    end

    alt [2.1]response.migration_flag == 1
        Backend -> db: 3.3 Insert m_physical_sub_info
        alt Error
            <- Backend: 3.3.1 throw new Exception with error message
        end
    end

note over Backend
    4. Register point system
end note
    Backend -> PointSystem: 4.1 Register user with Point System \nPOST /brands/{brandId}/users/{userId}/point_cards
    alt Error
        <- Backend: 4.1.1 throw new Exception with error message
    end

note over Backend
    5. Register mail magazine opt in information
end note
     alt service_period_type != 01
        Backend -> MailMagazineSystem: 5.1 Register user and mail magazine opt in information with Mail Magazine System \nPOST /mailmagazine-rest/kaiin/update
        alt Error
            Backend -> Backend : 5.1.1 output ERROR level log
        end
    end

<- Backend: Return response

@enduml
```

## Parameter&Return

### Parameter

| Parameter     | Description     | Style |Required | Note         |
| ----------- | ----------------- | ----- | -------- | ------------ |
| email_address     | メールアドレス        | body  | required         |           |
| uid     | ユーザID        | body  | required        | AzureのオブジェクトID（Azureで一意のID）     |

### Return

| Parameter |     Description      | Settings | Note |
| --------- | -------------------- | -------- | ---- |
| user_key  | ユーザサロゲートキー |          |      |

## 外部API仕様書

[配置場所](xxx)

| 処理No |                                 ファイル名                                  |          該当箇所           | 備考 |
| ------ | --------------------------------------------------------------------------- | --------------------------- | ---- |
| 4.1    |  Giftee/Point_Base_API仕様書.html   | ポイントカード作成  | 日付が最新のものを参照        |
| 5.1    | メルマガシステム/API設計書.xls          | 会員情報更新シート     |      |
