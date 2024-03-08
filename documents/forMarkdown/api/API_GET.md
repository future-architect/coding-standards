# [機能ID] 会員情報取得API GET /${パス}

## 説明

- ユーザの会員情報を参照するAPI

## 仕様

- ユーザの属性を参照する。
  - ユーザーマスタの全属性を返却する。
- DBへのSELECT時に使用する当該ユーザのキーはアクセストークン.subとする

## シーケンス図

```mermaid


sequenceDiagram
participant "Backend" as Backend
participant    "DB"   as db

user ->> Backend: API Request

note over Backend,db: 1. Retrieve user and physical subscription information

    Backend ->> db: 1.1 Select m_user, m_physical_sub_info
    
    alt no record
        <- Backend: 1.1.1 Response status code: 400
    end

note over Backend,db
    2. Retrieve required basic user attributes and
    physical subscription information requirements for registered courses
end note
    Backend -> db: 2.1 Select t_course_registration,\nm_course_basic_user_attribute, m_course

<- Backend: Return response and status code: 200

@enduml

```

## Request & Response

### Request

- なし

### Response

|           Parameter            |                                         Description                                         |              Settings              | Note |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------- | ---- |
| last_name                      | 氏名 (姓)                                                                                   | m_user                        |      |
| first_name                     | 氏名 (名)                                                                                   | m_user                        |      |
| last_name_kana                 | 氏名カナ (姓)                                                                               | m_user                        |      |
| first_name_kana                | 氏名カナ (名)                                                                               | m_user                        |      |
| date_of_birth                  | 生年月日                                                                                    | m_user                        |      |
| gender_type                         | 性別区分                                                                                        | m_user                        |      |
| tel                            | 電話番号                                                                                    | m_user                        |      |
| occupation_type                     | 職業区分                                                                                        | m_user                        |      |
| zipcode                        | 郵便番号                                                                                    | m_user                        |      |
| pref_code                      | 都道府県コード                                                                              | m_user                        |      |
| town                           | 市区町村大字                                                                                | m_user                        |      |
| building                       | 番地・マンション名                                                                          | m_user                        |      |
| address_kana                   | 住所カナ                                                                                    | m_user                        |      |

