---
sidebarDepth: 4
author: フューチャー株式会社
home: true
heroText: Gitブランチ管理標準
tagline: Future Enterprise Convention Standards for Git Branch
pageClass: lang-home
footer: ©2015 - 2024 Future Enterprise Coding Standards - Future Corporation
---

# Gitブランチ管理標準

## はじめに

Gitブランチ管理の標準規則です。2,3名のような小規模チーム～50名程度の中規模での利用を想定しています。

開発プロダクトには、ライブラリ（他のアプリケーションやライブラリからimportして利用されるもの）か、アプリケーション（CLIツール、サーバアプリケーションなど）と言った区別があるが、本規約はアプリケーション開発を中心として規約をまとめる。

Gitリポジトリ構成はモノリポ、マルチレポ複数のケースが存在する前提で記載する。

GitHub、GitLabでの運用を中心に記載する。

## 前提

- feature branchesが前提
- trunkやfeature flagsは対象外

## git config推奨設定

`git config` の推奨設定を紹介する。

```sh
# 基礎
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"

# プロキシ
git config --global http.proxy http://id:password@proxy.example.co.jp:8000/
git config --global https.proxy http://id:password@proxy.example.co.jp:8000/

# プロキシが独自の証明書を持っている場合は、git config http.sslVerify false するのではなく、証明書を設定させる
git config --global http.sslCAInfo ~/custom_ca_sha2.cer

# git workflow
git config --global pull.rebase true
git config --global rerere.enabled true
git config --global fetch.prune true

# エイリアス
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

補足説明:

- git workflow
  - `pull.rebase`: pull時にリベースする
  - `rerere.enabled`: コンフリクトの解決を記録しておき、再び同様のコンフリクトが発生した場合に自動適用する
  - `fetch.prune`: リモートリポジトリで削除されたブランチを削除する
- エイリアス
  - メンバーそれぞれで別のエイリアスを登録されると、チャットなどのトラブルシュート時に混乱をきすため、ベーシックなものはチームで統一して、認識齟齬を減らす目的で設定を推奨する

## ワークフロー

```sh
# 変更作業
git checkout -b <branchname>
git add
git commit -a

# リモートブランチの変更を同期
git pull origin develop

# コンフリクト対応
git add <file1> <file2> ...
git commit -a

# リモートブランチへプッシュ
git push origin HEAD --force-with-lease --force-if-includes
```

## GitHub推奨設定

業務利用でのチーム開発を想定しており、リポジトリは以下の条件を満たす前提とする。

- プライベートリポジトリ
- Organization配下に作成
- Teamsプラン以上の有料契約

### General

| Category      | Item | Value | Memo |
| ------------- | ---- | ----- | ---- |
| General       | Require contributors to sign off on web-based commits | チェックなし | 著作権・ライセンス承諾の場合に用いるが、業務アプリ開発では不要 |
|               | Default branch | develop |  |
| Pull Requests | Allow merge commits  | ✅️ | main <- developなどのマージ時に必要 |
|               | Allow squash merging  | ✅️ | develop <- feature はSquash mergeを推奨 |
|               | Allow rebase merging  | -   | 利用しないため、チェックを外す |
|               | Allow suggest updating pull request branches | ✅️  | Pull Request作成後、ベースブランチが更新された場合、ソースブランチの更新を提案してくれる |
|               | Automatically delete head branches | ✅️  | マージ後にfeature branchを削除するため有効にする |
| Pushes        | Limit how many branches and tags can be updated in a single push | 5  | git push origin –mirrorで誤ってリモートブランチを破壊しないようにする。推奨値の5を設定する |

### Access

| Category                 | Item | Value | Memo |
| ------------------------ | ---- | ----- | ---- |
| Collaborators and teams | Choose a role | 任意の権限 | ※後述 |  

- 各ロールの権限については、公式ドキュメントを参照
- 通常、開発者には「Write」ロールを付与する
- 開発を行わない、例えばスキーマファイルの参照のみ必要であれば、「Read」権限を、Issuseの起票などのみ実施するマネージャーであれば「Triage」ロールを付与する
- 「Maintain」権限は、付与しない
- 「Admin」権限は、マネージャークラスに対して合計2~3名を付与し、属人化しないようにする
    - 1名でも駄目。4名以上でも駄目

### Code and automation

#### Branches

Branch protection rules にdevelop, mainなど永続的なブランチに保護設定を追加する。

| Category      | Item | Value | Memo |
| ------------- | ---- | ----- | ---- |
| Protect matching branches | Require a pull request before merging | ✅️ | プルリクエストを必須とする | 
|                           | Require approvals | ✅️ | レビューを必須とする | 
|                           | Required number of approvals before merging | 1 | 最低1名以上の承認を必須とする | 
|                           | Dismiss stale pull request approvals when new commits are pushed | - | レビュー承認後のPushで再承認を必要とするかだが、レビュー運用上に支障となることも多く、チェックを外す | 
|                           | Require status checks to pass before merging | ✅️ | CIの成功を条件とする |
|                           | Require branches to be up to date before merging | 任意 | CIパイプラインのワークフロー名を指定 |
|                           | Require conversation resolution before merging | ✅️ | レビューコメントがすべて解決していることを条件とする |
|                           | Require signed commitsng | ✅️ | 署名付きコミットを必須化し、セキュアな設定にする |
|                           | Require linear history | ✅️/- | mainブランチの場合はOFFとするが、developの場合はSquash mergeを求めるため有効にする |
|                           | Do not allow bypassing the above settings | ✅️ | パイパスを許容しない |

#### Tags

| Category      | Item | Value | Memo |
| ------------- | ---- | ----- | ---- |
|  | Protect tags | v[0-9]+.[0-9]+.[0-9] | セマンティックバージョニングに則ったタグのみ、削除を防ぐ | 

#### GitHub Actions

| Category      | Item | Value | Memo |
| ------------- | ---- | ----- | ---- |
| Actions permissions | Allow asset-taskforce, and select non-asset-taskforce, actions and reusable workflows > Allow actions created by GitHub | ✅️ |  | 
|                     | Allow asset-taskforce, and select non-asset-taskforce, actions and reusable workflows > Allow actions Marketplace verified creators | ✅️ |  | 

#### Code security and analysis

| Category      | Item | Value | Memo |
| ------------- | ---- | ----- | ---- |
| Dependabot | Dependabot alerts | ✅️ | 依存パッケージのアップデートを検知するため | 
|            | Dependabot security updates | ✅️ |  | 
|            | Dependabot version updates | ✅️ |  | 


## ブランチ戦略

### ブランチの整理

#### main(master)ブランチ

Gitリポジトリを新規作成するとデフォルトで作成されるブランチ。  
昔はmasterだったが最近はmainという名称に改名されている。  
個人開発であればmainブランチに直接pushして開発することもできるが、チーム開発では直接push禁止でマージを行うだけのブランチとなる。  
production環境と対応するブランチとなる場合が多い。

#### featureブランチ

機能追加や変更を行うブランチ。  
ひとつの変更に対してひとつのfeatureブランチを作成することになるため、開発中で最も使われるブランチとなる。  
mainブランチあるいはdevelopブランチから派生させ、作業完了後に作成元ブランチにマージする。  

![feature branch](branch_strategy_feature.drawio.png)

#### developブランチ

開発の中心となるブランチ。  
リポジトリを新規作成した際にmainブランチからdevelopブランチを作成する。  
各開発者はdevelopブランチからfeatureブランチを作成し、機能追加/変更を行う。  
都度リリースをするのであればmainブランチとfeatureブランチのみの運用でも問題ないが、リリース断面と開発断面を分けたい場合にdevelopブランチを利用する。  
開発スケジュールによっては複数のdevelopブランチが発生することもある。  

![develop branch](branch_strategy_develop.drawio.png)

#### releaseブランチ

リリースするために使用するブランチ。  
リリース前の検証を開発と並行して実施する場合に発生する。  
開発とリリース作業が並行しないのであればdevelopブランチでそのまま検証を実施すれば良いので、場合によっては不要となる。  
releaseブランチではバグ修正、ドキュメント生成、その他のリリースに伴うタスクのみを実施する。  
developブランチからreleaseブランチを作成、リリース準備作業を実施し、mainブランチへマージ後、mainブランチからリリースを行う。  
masterブランチのマージコミットにリリースタグ（バージョンなど）を打ち、mainブランチをdevelopブランチへマージ後、releaseブランチを削除する。  

![release branch](branch_strategy_release.drawio.png)

#### hotfixブランチ

本番リリースに対して迅速にパッチを当てて修正する場合に使用する。  
developブランチではなく、mainブランチをベースとする。  
修正が完了するとmainとdevelopの両方(あるいは進行中のreleaseブランチ)に直ちにマージされ、mainは更新されたバージョン番号でタグ付けされる。  
mainブランチとdevelopブランチが分かれている場合はほぼ必須で発生すると考えて良いが、mainブランチ+featureブランチのみの運用では必ずしも必要ではない。（管理上の目的でfeatureとhotfixを分けることはあり得る。）  

![hotfix branch](branch_strategy_hotfix.drawio.png)

#### topicブランチ  

featureブランチで実現する機能を複数人で開発する場合に使用する。  
featureブランチからtopicブランチを作成し、topicブランチ上で個人の開発を行った後、featureブランチへマージする。（masterブランチ/developブランチとfeatureブランチの関係と同等。）  
topicブランチが必要なケースでは、featureブランチへの直接pushは原則行わない。  
GithubFlowではfeatureブランチのことをtopicブランチと呼称する場合があるが、本規約ではfeatureブランチから派生するブランチをtopicブランチと定義する。  

![topic branch](branch_strategy_topic.drawio.png)

| 名称           | 役割                                                  | 利用シーン                                                                                                                                                                                       | 命名規則                                                                                                                               | 直push可否 | 
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `main(master)` | production環境と一致させるブランチ                    | すべてのケースで使用                                                                                                                                                                             | `main`<br>原則変更しない。                                                                                                             | ✕         | 
| `feature`      | 特定機能の追加/変更                                   | ほぼすべてのケースで使用<br>個人開発ではmainブランチのみの使用もあり得る。                                                                                                                       | `feature/${任意名称}`<br>可能な限りわかりやすい命名とすること。                                                                        | △         | 
| `develop`      | 開発の大元となるブランチ                              | リリース断面と開発断面を分けたい場合にmainブランチから作成する。<br>マージの都度リリースする前提であればmainブランチとfeatureブランチのみでも運用可能。                                          | `develop/develop`<br>※developにするとdevelopブランチが複数発生するケースに耐えられないので、develop/developとしておくことを推奨する。 | ✕         | 
| `release`      | リリース準備作業の実施                                | developブランチの利用が前提となる。<br>開発作業とリリース作業が並行する場合にdevelopブランチから作成する。                                                                                       | `release/${yyyymmdd}`<br>`release/${リリースバージョン}`<br>など                                                                       | ✕         | 
| `hotfix`       | mainブランチに対する即時修正                          | developブランチの利用が前提となる。<br>本番リリースに対して迅速にパッチを当てたい場合にmainブランチから作成する。<br>mainブランチとfeatureブランチのみの運用の場合は必ずしも利用する必要はない。 | `hotfix/${任意名称}`<br>可能な限りわかりやすい命名とすること。                                                                         | ◯         | 
| `topic`        | featureブランチにて複数人開発をする場合の開発ブランチ | featureブランチで実現する機能を複数人で開発する場合にfeatureブランチから作成する。                                                                                                               | `topic/${任意名称}`<br>可能な限りわかりやすい命名とすること。                                                                          | ◯         | 

### 現実的な利用パターン

実際に利用する可能性が高いパターンを３つ示す。  
基本的には運用コストが最小になるパターンを選択し、プロジェクトの体制に応じて運用を変更する。  
ex) Github Flow → Lite GitLab Flow → GitLab Flow

| 名称                 | 使用ブランチ                                                          | 概要                                                                                                                                                                                                                                                                                                                                                                                                                        | 運用コスト | 使い所                                                                                               | 
| -------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- | 
| Github Flow          | `main`<br>`feature`                                                   | 最小のブランチ管理パターン。このパターンはGithubFlowと呼ばれる。<br>開発人数が少なく、検証作業は全員で行う場合に有効。<br>また、プロジェクトの初期フェーズ等断面管理を厳密に行わない場合もこのパターンで問題無い。<br>マージの都度本番環境へデプロイする前提。                                                                                                                                                              | 低         | ・個人開発<br>・プロジェクト初期フェーズ                                                             | 
| Lite GitLab Flow<br> | `main`<br>`feature`<br>`develop`<br>（`topic`/`hotfix`）              | GithubFlowに`develop`ブランチを追加するパターン。（特定の呼称はないのでLite GitLab FLowと命名。）<br>`main`ブランチをプロダクトリリースブランチとし、開発中ソースコードとは分ける。<br>開発作業とリリース作業が並行しないチーム構成であれば必ずしも`release`ブランチを作る必要はない。<br>必要に応じて`hotfix`や`topic`ブランチを作る。                                                                                     | 低         | ・本番リリース済みプロダクトの開発などで、一定品質を保証する必要がある場合                           | 
| GitLab Flow          | `main`<br>`feature`<br>`develop`<br>`release`<br>（`topic`/`hotfix`） | Github Flowに`develop`ブランチと`release`ブランチを追加するとGitlabFlowとなる。<br>GitLabFlowでは`main`ブランチのことを`productio`nブランチと呼称したり、`release`ブランチのことを`pre production`ブランチと呼称するが、本規約では`main`/`release`に統一する。<br>リリース作業と開発作業が並行して行われる場合や、断面を指定して複数テスト環境にデプロイしたい場合に有効。<br>必要に応じて`hotfix`や`topic`ブランチを作る。 | 中         | ・リリース作業と開発作業が並行して行われる場合<br>  ・断面を指定して複数テスト環境にデプロイしたい場合 | 

### 変則的なパターン

#### developブランチが複数必要になる場合

TODO: 複数リリースバージョンを並行開発する場合は`develop`ブランチを複数作る。

#### 複数バージョンをサポートする場合

TODO: `support`ブランチを使用する。

### ブランチとデプロイ先環境

TODO: 要議論

- mainはproduction環境
  - おそらく議論の余地なし
- developブランチと検証環境を対応させるパターン
  - 本番環境、検証環境の2環境構成であれば通常はこのパターンで充足する
- featureをそのままテスト環境へデプロイするパターン
  - 2/3人の開発であれば十分管理可能
- releaseブランチで管理するパターン
  - テスト環境とreleaseブランチを対応させるパターン。
    - staging環境: `release/stg`
    - develop環境: `release/develop`
  - 管理方法としては一番楽。デプロイ断面の確認にコミュニケーションコストを割かなくて済む。
  - 10人以上の開発で効いてくる。

## Pull Request / Merge Request

GitHubやGitLabでは、プルリクエスト作成時のテンプレートを作ることができる。チームでプルリクエストで書いてほしいことを明らかにすることで、レビュー効率を上げたり、リリース後の調査などに役立てることができる。

GitHubでは `.github/PULL_REQUEST_TEMPLATE.md` に記載する。

テンプレートの例を以下にあげる。

```md
<!-- 初めてPRを上げるときは、開発規約(DEVELOPMENT.md) に目を通しておきましょう -->

## Ticket
<!--- 関係するチケットのリンクを列挙ください（複数可） -->

## Description
<!--- 背景・目的・変更内容などの説明を記載ください -->

## TODO
<!--- 残課題があれば記載ください -->

## Checked list
<!--- 動作を確認するために行ったテストを記載してください -->

## Related PRs
<!--- 関連するプルリクエストがあれば列挙してください -->

## Self checklist

- [ ] Files changed を確認し、セルフレビューを実施した
- [ ] 必要な設計ドキュメントを更新した
- [ ] 今回のPRでは未対応の事項を記載したIssueを作成した
```

### コミットメッセージ

Gitのコミットメッセージにの書式についてルール化する運用とする。

これにより、コミットの目的がわかりやすくなる、履歴からのトラッキングの容易になる利点がある。

コミットメッセージの書式としては、`Conventional Commits`をベースとした規約としている。

以下の形式でコミットメッセージを記載することとする。

```
<type>: <subject> <gitmoji>
```

コミットメッセージは
type、subject、gitmojiの最大3つの要素から構成され、それぞれは後述する書式に従うものとする。
この中でも、type、subjectについては必須とし、ほかの要素についてはプロジェクトの運用にしたがい任意とする。

#### type

typeについては必須の要素となり、以下のいずれかを選択するものとする。


| type     | 説明                                                                                   |
|--------|--------------------------------------------------------------------------------------|
| `feat`  | 新機能の追加                                                                             |
| `fix`   | バグの修正                                                                                 |
| `docs`  | ドキュメンテーションの更新                                                                    |
| `refactor` | リファクタリング|

#### subject

subjectについては必須の要素となり、変更内容を簡潔に記載するものとする。
issue idについては、PRから参照する運用を想定し、コミットメッセージの必須要素とはしないこととする。

#### gitmoji

gitmojiについては任意の要素となり、変更内容を視認しやすい絵文字の使用を可能とする。

変更内容と選択される絵文字の対応については厳密とせず、開発者が任意に選択するものとする。

type(feat, fix, docs, refactorなど)に基づく、選択例を以下に示す。

```
 ==== Emojis ====
 :ambulance:  🚑致命的なバグ修正(fix)
 :bug:  🐛バグ修正(fix)
 :+1: 👍機能改善・機能修正(fix)
 :cop: 👮セキュリティ関連の修正(fix)
 :art: 🎨レイアウト関連の修正(fix)
 :green_heart: 💚テストやCIの修正・改善(fix)
 :wrench: 🔧設定ファイルの修正(fix)
 :building_construction: 🏗️アーキテクチャの変更(fix)
 :tada: 🎉大きな機能追加(feat)
 :sparkles: ✨部分的な機能追加(feat)
 :up:   🆙依存パッケージ等のアップデート(feat)
 :memo: 📝ドキュメント修正(docs)
 :bulb: 💡ソースコードへのコメント追加や修正(docs)
 :lipstick: 💄Lintエラーの修正やコードスタイルの修正(refactor)
 :recycle: ♻️リファクタリング(refactor)
 :fire: 🔥コードやファイルの削除(refactor)
 :rocket: 🚀パフォーマンス改善(refactor)
```

#### コミットメッセージ例

上記のルールに従った、コミットメッセージのサンプルは以下のようなものとなる。
以下のようなコミットをルールとすることで、変更内容を視覚的に把握しやすくなる利点がある。

```
feat: カレンダー機能の追加 🎉
```

```
fix: メモリリークの修正 🚑
```

```
docs: デプロイフローをドキュメント化 📝
```

```
refactor: Lintエラーの修正 💄
```

### ブランチ名

TODO: ブランチ戦略で出現平仄をあわせる。develop/release/topic/hotfix

featureブランチは開発またはテスト目的で利用する一時的なブランチです。developブランチから派生し、作業完了後に再びdevelopブランチにマージし、マージ後には削除します。

以下の命名に従います。

- `feature/` のプレフィックスを付ける
- 課題管理システムと紐付けられるようなブランチ名にする

```sh
# OK（課題管理システムの課題番号をブランチ名に利用）
feature/#12345

# OK（GitHub Issue や JIRA や Backlog のプロジェクトIDをブランチ名に利用）
feature/<PROJECTID>-9403
feature/gh-issue-12345

# NG（プレフィックスが無い）
fixtypo
```

### タグ

Gitにはタグ機能があり、リリースポイントとしてタグを作成する運用とする。

これにより、リリースしたアプリケーションやライブラリに何か不具合があれば、切り戻しや原因追求が容易になる利点がある。

タグの運用ルール:

- リリースごとに新しいバージョンを示したタグを発行する
- (推奨) GitHubなどの画面経由でタグを作成する
- mainブランチにてタグを作成する
- 入力間違えなどのケースを除き、一度タグをつけた後は削除しない
- 後述する「タグの命名規則」に従う

![GitHub画面でbackend/v1.6.0のタグを作成する](create_new_tag.png)

何かしらの理由で、コマンドラインからタグを作成する必要がある場合は、以下に注意する。画面経由・コマンドライン経由でのタグ作成は混ぜないようにし、運用手順は統一する。

- 軽量 (lightweight) 版ではなく、注釈付き (annotated) 版のタグを利用する

```sh
# OK（注釈付きタグを利用する）
$ git tag "v1.0.4" -m "v1.0.4 🐛Fix item api log"

# NG（軽量タグは利用しない）
$ git tag "v1.0.4"
```

タグの命名規則:

- `v1.2.4` などの [セマンティックバージョニング](https://semver.org/lang/ja/) を基本とする
- モノリポの場合は `frontend/v1.0.0`、`backend/v2.0.1` など領域ごとにプレフィックスを付与する形式を取る
    - プレフィックスにすることで、タグをリスト表示した場合に視認性を上げることができる

命名に従うと、次のようなコマンドで絞り込みで表示できる。

```sh
$ git tag -l --sort=-version:refname "frontend/v*"
frontend/v2.0.0
frontend/v1.3.0
frontend/v1.2.0
frontend/v1.1.0
...
```

また、Gitクライアントによっては `/` を使うことでフォルダのように階層表示ができるため、プレフィックスの区切り文字は `-` ハイフンではなく、スラッシュとする。

```
TODO ![](VSCodeクライアントで階層表示されている画像.png)
```

タグメッセージの規則:

- (推奨) GitHubを利用中の場合、「[Generate release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)」を用いて、タイトルや本文を自動生成する
- フロントエンド・バックエンドで整合性を保っているのであれば、メモ目的でバージョンを記載する運用を推奨とする
- 実用的な利用用途が思いつかない場合は、開発者視点での楽しみリリースの大きなマイルストーンの名称など、チームの関心事を記入することを推奨とする

![](create_new_tag_title.png)
 
何かしらの理由で、コマンドラインからタグを作成する必要がある場合は、GitHub利用時の規則に合わせて次のように作成する。

入力例:

```sh
# OK
$ git tag -a backend/v1.8.0 -m "backend/v1.8.0"
$ git tag -a backend/v1.9.0 -m "backend/v1.9.0 🚀Release with frontend-v3.0.1"
$ git tag -a backend/v2.0.0 -m "backend/v2.0.0 ✨Android版アプリリリース対応"

# NG
$ git tag -a backend/v3.0.0 -m "🚀Release version v2.0.0"
```

バージョンアップ規則:

- 開発しているプロダクトがライブラリの場合、セマンティックバージョニングに厳密に従う
- 開発しているプロダクトがシステム（アプリケーション）の場合、その成熟度や初回リリースの区切りでバージョンアップを行うことを推奨する。適切なバージョンアップを行うことで視認性が上がり、運用負荷を下げることができる
    - 例1: 初回リリース、カットオーバーで `v1.0.0` に上げる
    - 例2: 稼働後1年以上経過し、中規模以上の大きな機能アップデートがあったので、 `v2.0.0` に上げる

## autocrlf

チーム開発において開発環境がWindows/Macなど複数存在することは少なくなく、また、Gitリポジトリ上の改行コードは統一した方が余計な差分が生じず扱いやすくなる。このときよく用いるのが、 `autocrlf` という設定である。

| 名称 | 機能 |
| -- | --- |
| autocrlf | trueにすると、リポジトリからファイルをワーキングツリーに持ってくるときにテキストファイルの改行コードをCRLFに変換する。にコミットする時に、CRLFからLFに変換する|

`.gitattributes` というファイルをGitにコミットしておけば、そのGitリポジトリを使う全員で改行コードの扱いをLFに統一できる。

```sh .gitattributes
* text=auto eol=lf
```

## マージ戦略

### マージ戦略とは

マージ戦略とは、複数のブランチ間でコードの変更を統合する際に使用される方法やポリシーを指す。
この戦略は、プロジェクトのコミット履歴の管理方法やコンフリクトの解決手段、そして最終的にソフトウェアの品質維持や開発プロセスの円滑な進行に影響を及ぼす。そのため、Gitの使用を開始する前に、適切な戦略を策定することが重要である。

ブランチの管理戦略に関わらず、大半のケースにおいて、メインの開発ブランチとそこから作成される個々の機能ブランチが存在する。
ここでは「開発中の機能ブランチに対してメインの開発ブランチの変更をどう取り込むか」「メインの開発ブランチに開発およびレビューが完了した機能ブランチをどう取り込むか」の2つのケースにおいて、とりうる選択肢と推奨方法を説明する。

### 機能ブランチにメインの開発ブランチの変更を取り込む

複数人により同時並行的に開発が進む場合、特定の機能ブランチで開発を進めている最中に、メインの開発ブランチがアップデートされることはよく起こる。
このような状況において、開発者は自らの機能ブランチに対して、最新の開発ブランチの変更を定期的に取り込むことが望まれる。

![開発ブランチと機能ブランチ](merge_strategy_develop_to_feature.drawio.png)

機能ブランチに対して開発ブランチの変更を取り込む方法は「マージ」による方法と「リベース」による方法の2つが考えられる。

#### マージ

マージとは `get fetch & git merge` コマンド（ = `git pull` コマンド）を使用して、開発ブランチの変更を機能ブランチに取り込む方法を指す。
マージを行った場合は下記の通り、「マージコミット」が作成される。

![マージ](merge_strategy_develop_to_feature_merge.drawio.png)

```bash
# 現在のブランチは 機能（feature/A）ブランチ
$ git branch
  develop
* feature/A

# リモート追跡ブランチの最新化
$ git fetch

# 開発（develop）ブランチの変更を機能（feature/A）ブランチにマージ
$ git merge develop
```

#### リベース

リベースとは `get fetch & git rebase` コマンド（ = `git pull --rebase` コマンド）を使用して、開発ブランチの変更を機能ブランチに取り込む方法を指す。
最新の開発ブランチの先頭から新たにコミットを作りなおす動きになるので、マージによる方法と異なり「マージコミット」は作成されない。

![リベース](merge_strategy_develop_to_feature_rebase.drawio.png)

```bash
# 現在のブランチは 機能（feature/A）ブランチ
$ git branch
  develop
* feature/A

# リモート追跡ブランチの最新化
$ git fetch

# 機能（feature/A）ブランチを開発（develop）ブランチにリベース
$ git rebase develop
```

#### 推奨方法

本規約では「リベース」による方法を推奨する。  

マージによる変更の取り込みを行う場合、メインの開発ブランチの変更を取り込むたびに機能ブランチにマージコミットが作成され、履歴が複雑になる。
リベースによりシンプルな履歴をつくることで、レビューアの負荷を軽減することが、リベースを推奨する理由の1つである。

開発者は `git pull` 時の挙動をリベースにするよう設定しておく（`git config pull.rebase true`）ことが望ましい。

#### 注意点

マージによる変更の取り込みが既存のブランチを変更しないのに対し、リベースは全く新しい（元のコミットIDとは別のコミットIDで）コミットを作成する。
リベースを用いる場合は、次の3点に注意すること。

* 複数人に影響を及ぼすpublicなブランチでは、決してリベースを使用しないこと。  
例えば メインの開発ブランチである `develop` ブランチや `main` ブランチが該当する。先述のとおりリベースにより全く新しいコミットが作成されるため、他の人が作業しているブランチと整合性が取れなくなり、大きな混乱を招く可能性がある。このようなブランチはブランチは **強制プッシュできないよう保護しておく** ことが望ましい。

* リモートにプッシュ済のブランチでリベースを行った場合、強制プッシュ（Force Push）が必要になること。
開発者はプッシュ時に `--force-with-lease --force-if-includes` フラグを渡すことで、意図せずリモートブランチの変更を上書きしないよう条件付きで強制プッシュを行うことが望ましい。  

  * `--force-with-lease`: ローカルのリモート追跡ブランチの ref とリモートの ref を比較し、ローカルの状態が最新でない場合（要はプッシュ先のリモートブランチに変更が入ったが、ローカルで `git fetch` していない場合）は、プッシュに失敗する。逆にいうと、プッシュ前に `git fetch` を実行済みの場合は、リモートの変更を上書きする形で強制プッシュができてしまうため、これを防ぐには `--force-if-includes` フラグを併用する。

  * `--force-if-includes`: リモート追跡ブランチの変更がローカルに全て取り込まれていない場合は、プッシュに失敗する。これにより意図せず他の人のコミットを上書きすることを防ぎつつ、必要な変更を強制的にプッシュすることができる。

* メインの開発ブランチの変更を頻繁に取り込む場合、同じようなコンフリクトの解消を何度も求められる可能性がある。
GitのRerereを有効化する（`git config rerere.enabled true`）ことでコンフリクトの解消を記録し、繰り返しの操作を自動化することが望ましい。

### メインの開発ブランチに機能ブランチの変更を取り込む

開発が完了した機能ブランチをメインの開発ブランチに取り込むために、GitHub（GitLab）上でプルリクエスト（マージリクエスト）を作成する運用を前提とする。

GitHubを利用する場合、開発ブランチに機能ブランチの変更を取り込む方法は3種類ある。

- Create a merge commit
- Rebase and merge
- Squash and merge

#### Create a merge commit

動作としては `git merge --no-ff` コマンドを使用して、機能ブランチの変更を取り込む形になる。  
この方法を選択した場合は、下記のとおり、メインの開発ブランチにマージコミットが作成される。

![Merge Commit](merge_strategy_feature_to_develop_merge_commit.drawio.png)

#### Rebase and merge

動作としては機能ブランチを最新の開発ブランチにリベースした後に、`git merge --ff` コマンドを使用して、機能ブランチの変更を取り込む形になる。  
この方法を選択した場合は、下記のとおり、メインの開発ブランチにマージコミットは作成されず、履歴が一直線になる。

![Rebase and Merge](merge_strategy_feature_to_develop_rebase_and_merge.drawio.png)

#### Squash and merge

動作としては `git merge --squash` コマンドを使用して、機能ブランチの変更を取り込む形になる。  
この方法では、機能ブランチで行った変更YとZを1つにまとめたコミットがメインの開発ブランチに作成されます。

![Squash and Merge](merge_strategy_feature_to_develop_squash_and_merge.drawio.png)

#### 推奨方法

本規約では「Squash and merge」による方法を推奨する。

これは、メインの開発ブランチの履歴をクリーンに保つことが大きな理由になるが、
機能ブランチのPRが単一のコミットメッセージで表現できるくらいシンプルで明確な単位にするということが前提となる。

なお、プロテクトブランチの設定にて、メインの開発ブランチに対し「require linear history」を選択することを推奨する。  
本設定を行うと、開発ブランチに対して「Create a merge commit」が選択できないよう制御することができる。

また、意図しない方法でのマージを避けるためにブランチごとにマージ戦略を設定しておき、想定外のマージ戦略が選択された時に警告色を表示するとサードパーティ製のChrome拡張も存在する。こちらは必要に応じて導入することが望ましい。  
https://zenn.dev/daku10/articles/github-merge-guardian

#### 注意点

「Squash and merge」による変更の取り込みを行う場合の注意点は次の通りとなる。

* マージ後は機能ブランチを削除すること。  
変更元の機能ブランチのコミットをまとめたコミットが新たに作成されるめ、元の機能ブランチを再利用して（例えば追加のコミットを作成して）PRを作成してもコンフリクトが発生する。  
マージ後はリモート/ローカルの双方で速やかに機能ブランチを削除することが望ましい。
  * リモート側の機能ブランチはGitHubの設定にて「Automatically delete head branches」を選択することで、マージ後に自動でブランチの削除が行われる。
  * ローカル側の機能ブランチは `branch -d` コマンドでは削除できないため、`branch -D` コマンドを用いて削除する必要がある。

* 部分的なコミットの取り消しができない。  
履歴上は1つのコミットになるので、マージ後に一部の変更だけを取り消すということができない。  
取り消しはPRの単位となるため、PRの単位をなるべく小さなまとまりにすることが望ましい。

* Authorが失われる。  
機能ブランチにコミットを行った人がAuthorになるのではなく、「Squash and merge」を行った人がAuthorになるため、OSS開発を行う場合など、厳密にコントリビューションを管理する必要がある場合は注意されたい。  
GitHubでは「Squash and merge」を行う場合、デフォルトでコミットメッセージに `co-authored-by` トレーラーが追加され、1つのコミットが複数の作成者に帰属するようにするようになっている。この記述は削除しないようにする。  
https://docs.github.com/ja/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors

* 機能ブランチの取り込み以外のケースでは、「Squash and merge」以外を選択すること。  
例えば、`develop` ブランチを `main` ブランチや `release`ブランチにマージする場合など、取り込み元のブランチの変更が大きい場合は、コミットメッセージを1つにまとめることによる弊害が大きいため、別のマージ戦略を検討すること。
