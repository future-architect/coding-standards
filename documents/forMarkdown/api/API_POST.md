# [機能ID] 新規登録API POST /users

## 説明

- 新規ユーザの会員登録をするAPI

## 仕様

- ユーザー登録

## シーケンス図

```plantuml
@startuml
!theme vibrant

title [01-USR-A-0002] 新規登録API POST /users

participant "Backend" as Backend

[-> Backend: API Request

note over Backend
    1. Call register function
end note
    Backend -> Backend: 1.1 Call 01-USR-C-0003

<- Backend: Return response and status code: 200

@enduml

```

## Request & Response

### Request

| Parameter     | Description     | Style |Required | Note         |
| ----------- | ----------------- | ----- | -------- | ------------ |
| email_address     | メールアドレス        | body  | required         |           |
| uid     | ユーザID        | body  | required        | オブジェクトID   |

### Response

| Parameter |     Description      | Settings | Note |
| --------- | -------------------- | -------- | ---- |
| user_key  | ユーザサロゲートキー |          |      |
