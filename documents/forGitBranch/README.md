# ブランチ管理標準

## はじめに

## 前提

- feature branchesが前提
- trunkやfeature flagsは対象外。

## パターン

フォーマット作って複数人で分散
使い所まで示したい
軸: 人数/

### Githubフロー

- 概要
- 想定人数
- 登場ブランチ
- 通常運用
- 切り戻し運用

### Gitlabフロー

- 概要
- 想定人数
- 登場ブランチ
- 通常運用
- 切り戻し運用

### GitFlowパターン

- 概要
  - デファクトスタンダード？
  - main/release/fix/develop/featureパターン（npg資料あり）
- 想定人数
- 登場ブランチ
- 通常運用
- 切り戻し運用

### GitFlowライト版

- 概要
  - main/develop/featureパターン
- 想定人数
- 登場ブランチ
- 通常運用
- 切り戻し運用

### CGSパターン

- 概要
  - main/release/fix/hotfix/develop複数パターン
  - ちょっと重厚
  - 複数の大型リリースに耐えられる

```mermaid
---
title: CGSパターン
---
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

- 登場ブランチ
- 通常運用
- 切り戻し運用

## 規約

### PR/MR

### コミットメッセージ

Gitのコミットメッセージにの書式についてルール化する運用とする。

これにより、コミットの目的がわかりやすくなる、履歴からのトラッキングの容易になる利点がある。

コミットメッセージの書式としては、`conversational commit`をベースとした規約としている。

以下の形式でコミットメッセージを記載することとする。

```
<type>(<scope>): <subject> <gitmoji>(<issue_id>)
```

コミットメッセージは、大きくheader、body、footerの３つの要素で構成されます。
この中でも、headerについては必須とする。

headerについてはtype、scope、subject、gitmoji、issue_idの最大5つの要素から構成され、それぞれは後述する書式に従うものとする。
この中でも、type、subjectについては必須とし、ほかの要素についてはプロジェクトの運用にしたがい任意とする。

#### type

typeについては必須の要素となり、以下のいずれかを選択するものとする。


| type     | 説明                                                                                   |
|--------|--------------------------------------------------------------------------------------|
| `feat`  | 新機能の追加                                                                             |
| `fix`   | バグの修正                                                                                 |
| `docs`  | ドキュメンテーションの更新                                                                    |
| `style` | コード形式の編集（動作に影響を与えない編集）                                                       |
| `refactor` | リファクタリング|
| `perf` | パフォーマンスの改善 |
| `test` | テストコードの追加や更新                                                                   |
| `chore` | ビルドプロセス、補助ツール、ドキュメンテーション生成などの変更                                      |

#### scope

scopeについては任意の要素となり、コミットによる変更箇所を簡潔な1単語で示すものとする。
また、破壊的な変更の場合には`feat(view!)`のように!マークをつけて明示することも可能とする。

#### subject

subjectについては必須の要素となり、変更内容を簡潔に記載するものとする。

#### gitmoji

gitmojiについては任意の要素となり、変更内容に応じた絵文字の使用を可能とする。変更内容と選択される絵文字の対応については以下のいずれかを基本とする。

```
 ==== Emojis ====
 :ambulance:  🚑致命的なバグ修正(fix)
 :bug:  🐛バグ修正(fix)
 :+1: 👍機能改善・機能修正(fix)
 :cop: 👮セキュリティ関連の修正(fix)
 :tada: 🎉大きな機能追加(feat)
 :sparkles: ✨部分的な機能追加(feat)
 :up:   🆙依存パッケージ等のアップデート(feat)
 :memo: 📝ドキュメント修正(docs)
 :bulb: 💡ソースコードへのコメント追加や修正(docs)
 :art: 🎨レイアウト関連の修正(style)
 :lipstick: 💄Lintエラーの修正やコードスタイルの修正(style)
 :recycle: ♻️リファクタリング(refactor)
 :fire: 🔥コードやファイルの削除(refactor)
 :green_heart: 💚テストやCIの修正・改善(test)
 :rocket: 🚀パフォーマンス改善(perf)
 :wrench: 🔧設定ファイルの修正(chore)
 :building_construction: 🏗️アーキテクチャの変更(chore)
```

#### issue_id

issue_idについては任意の要素となり、変更内容に紐づく課題のidを記載するものとする。
課題のidとしては、プロジェクトで採用している課題管理ツールに従うものとする。

issue_idを記載するフォーマットとしては、`#id`とする。

また、複数の課題が紐づく場合には、空白で分割して複数のidを記載することを可能とする。

---

これらのルールに従ったコミットメッセージの例としては、以下のようなものとなる。

```
feat(view): カレンダーの表示を追加 🎉(#645)
```

### GitTags

- 基本はセマンティックバージョニング
- モノリポの場合はfrontend-1.0.0など。デプロイの単位で命名しておくとモノリポの場合でも使える。

### mermaid

- 公式Doc
  - https://mermaid.js.org/syntax/gitgraph.html

- NTTDの図がわかりやすかった

## マージ戦略

- rebase/squash/commit

## CICD

- release trigger
- release note
- github actions sample

## 後方互換性管理

- ちょっとネタ特性が違うきもするので後回し

## 情報収集

- JetBrains Space Gitフロー
  https://blog.jetbrains.com/space/2023/04/18/space-git-flow/
- NTT
  https://engineers.ntt.com/entry/2024/01/19/094639
