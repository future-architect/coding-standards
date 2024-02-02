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

- スカッシュするのであればPRタイトルが使用されるのであまり気にせず
- release noteへの影響。いい感じに出す方法

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