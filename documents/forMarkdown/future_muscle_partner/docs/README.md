# docs

設計ドキュメントを管理する。

## フォルダ階層

```sh
docs
├── 01_画面      # Figma、画面アクション
├── 02_WebAPI   # openapi.yaml、API処理設計
├── 03_データ    # erd.a5er（ERD）、区分値
├── ...
└── README.md
```

## コード体系

機能IDのコード体系は以下に従う。

| 種別  | 種別         | 例           | 備考                   |
|-----|------------|-------------|----------------------|
| UIS | 通常画面       | UIS01、UIS02 | UI Standard から       |
| UIM | モーダル画面     | UIM01、UIM02 | UI Mordal から         |
| API | Web API    | API01、API02 |                      |
| IFS | システムI/F 送信 | IFS01、IFS02 | InterFace Send から    |
| IFR | システムI/F 受信 | IFR01、IFR02 | InterFace Receive から |
| BAT | バッチ        | BAT01、BAT02 | BATch から             |
| RPT | 帳票         | RPT01、RPT02 | RePorT から            |

コード体系について補足:

- UISであれば、 `UIS(0[1-9]{1}|[0-9]{2}` といったフォーマットに従うこと
- Future Muscle Partnerのプロダクト規模であれば、機能数が爆発しないという想定で2桁とする
  - 万が一あぶれた場合、16進数と見なしてA~Fを導入する拡張を行う

機能IDの採番について注意点:

- 採番後の変更は許可しない
- 連番とする（数字部分に新しい体系を作らない）
