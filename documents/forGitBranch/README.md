---
sidebarDepth: 4
author: フューチャー株式会社
home: true
heroText: Gitブランチ管理標準
tagline: Future Enterprise Convention Standards for Git Branch
pageClass: lang-home
footer: ©2015 - 2024 Future Enterprise Coding Standards - Future Corporation
---

<page-title/>

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。
ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。
また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

本ドキュメントはGitブランチ管理の標準的な運用ルールをまとめている。以下の想定で作成されているため留意いただきたい。

- GitHub または GitLab の利用
- 開発プロダクトには、ライブラリ（他のアプリケーションやライブラリからimportして利用されるもの）か、アプリケーション（CLIツール、サーバアプリケーションなど）という区別があるが、アプリケーション開発を想定
- トランクベース開発（フィーチャーフラグ）を **採用しない**

## 推奨設定

GitやGitHubの推奨設定をまとめる。本ドキュメントにあるGitブランチ運用はこの設定が行われている前提で説明する箇所があるため、最初に記載している。

## git config推奨設定

`git config` の推奨設定を紹介する。特にGitワークフローの設定が重要である。

```sh
# 基礎
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"

# プロキシ設定（存在する場合）
git config --global http.proxy http://id:password@proxy.example.co.jp:8000/
git config --global https.proxy http://id:password@proxy.example.co.jp:8000/

# プロキシが独自の証明書を持っている場合は、git config http.sslVerify false ではなく、証明書を設定する
git config --global http.sslCAInfo ~/custom_ca_sha2.cer

# Gitワークフロー
git config --global pull.rebase true
git config --global rerere.enabled true
git config --global fetch.prune true

# エイリアス（メンバーそれぞれで別のエイリアスを登録されると、チャットなどのトラブルシュート時に混乱をきすため、ベーシックなものはチームで統一して、認識齟齬を減らす目的で設定を推奨する）
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
```

> [!NOTE]
> git workflowの補足説明:
> - `pull.rebase`: pull時にリベースする
> - `rerere.enabled`: コンフリクトの解決を記録しておき、再び同様のコンフリクトが発生した場合に自動適用する
> - `fetch.prune`: リモートリポジトリで削除されたブランチを削除する

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
- 開発を行わない、例えばスキーマファイルの参照のみ必要であれば、「Read」権限を、Issueの起票などのみ実施するマネージャーであれば「Triage」ロールを付与する
- 「Maintain」権限は、付与しない
- 「Admin」権限は、マネージャークラスに対して合計2~3名を付与し、属人化しないようにする
    - 1名でも、4名以上でもNGとする

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
|                           | Require signed commits | ✅️ | 署名付きコミットを必須化し、セキュアな設定にする |
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

## 設定ファイル

### .gitattribute

チーム開発において開発環境がWindows/Macなど複数存在することは少なくなく、また、Gitリポジトリ上の改行コードは統一した方が余計な差分が生じず扱いやすくなる。このときよく用いるのが、 `core.autocrlf` という設定である。

| 名称 | 設定値 | チェックアウト時の挙動 | コミット時の挙動 |
| -- | -- | --- | -- |
| core.autocrlf | true | 改行コードをCRLFに変換 | 改行コードをLFに変換 |
|               | input | 何もしない | 改行コードをLFに変換 |
|               | false | 何もしない | 何もしない |

特にWindowsでの開発者の作業ミスを防ぐため、 `git config --global core.autocrlf input` のような設定を行うチームも多い。

しかし、上記の設定漏れや手順が増えてしまうため、本規約では `.gitattributes` での対応を推奨する。

`.gitattributes` というファイルをGitリポジトリのルートにコミットしておけば、そのGitリポジトリを使う全員で改行コードの扱いをLFに統一できる。

```sh .gitattributes
* text=auto eol=lf
```

通常、改行コードやインデントの設定は[EditorConfig](https://editorconfig.org/)で行うことが多く、 `.gitattributes` の設定とは重複する。しかし、環境構築ミスなど何らかのトラブルで動作しなかった場合に改行コードミスで特にジュニアクラスのメンバーが困る状況もゼロとは言えないため、本規約では `.gitattributes` も作成しておくことを推奨する。

### Pull Request / Merge Request テンプレート

GitHubやGitLabでは、プルリクエスト作成時のテンプレートを作ることができる。チームでプルリクエストで書いてほしいことを明示的にすることで、レビュー効率の向上や障害調査に役立てることができる。

GitHubでは `.github/PULL_REQUEST_TEMPLATE.md` に記載する。（GitLabでは `.gitlab/merge_request_templates/{your_template}.md` を配置する。）

テンプレートの例を以下にあげる。

```md
## チケットURL

## 特に見てほしいレビューポイント

## 残課題（別チケットで対応予定の内容、別プルリクエストで対応予定の内容）

## 動作確認内容（画面キャプチャなど）

## セルフチェックリスト

- [ ] 開発規約(DEVELOPMENT.md) を確認した
- [ ] Files changed を開き、変更内容を確認した
- [ ] コードの変更に伴い、同期必要な設計ドキュメントを更新した
- [ ] 今回のPRでは未対応の残課題があればIssueに起票した
```

## ブランチ運用

現実的に利用する可能性が高いブランチの運用パターン３つ示す。

基本的には運用コストが最小になるパターンを選択し、プロジェクトの体制に応じて運用を変更する。  

（例） GitHub Flow → Lite GitLab Flow → GitLab Flow

| 名称                 | 使用ブランチ                                                          | 概要                                                                                                                                                                                                                                                                                                                                                                                                                        | 運用コスト | 使い所                                                                                               | 
| -------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- | 
| GitHub Flow          | `main`<br>`feature`                                                   | 最小のブランチ管理パターン。このパターンはGitHub Flowと呼ばれる。<br>開発人数が少なく、検証作業は全員で行う場合に有効。<br>また、プロジェクトの初期フェーズ等断面管理を厳密に行わない場合もこのパターンで問題無い。<br>マージの都度本番環境へデプロイする前提。                                                                                                                                                              | 低         | ・個人開発<br>・プロジェクト初期フェーズ                                                             | 
| Lite GitLab Flow<br> | `main`<br>`feature`<br>`develop`<br>（`topic`/`hotfix`）              | GitHub Flowに`develop`ブランチを追加するパターン。（特定の呼称はないのでLite GitLab FLowと命名。）<br>`main`ブランチをプロダクトリリースブランチとし、開発中ソースコードとは分ける。<br>開発作業とリリース作業が並行しないチーム構成であれば必ずしも`release`ブランチを作る必要はない。<br>必要に応じて`hotfix`や`topic`ブランチを作る。                                                                                     | 低         | ・本番リリース済みプロダクトの開発などで、一定品質を保証する必要がある場合                           | 
| GitLab Flow          | `main`<br>`feature`<br>`develop`<br>`release`<br>（`topic`/`hotfix`） | GitHub Flowに`develop`ブランチと`release`ブランチを追加するとGitLab Flowとなる。<br>GitLab Flowでは`main`ブランチのことを`production`ブランチと呼称したり、`release`ブランチのことを`pre production`ブランチと呼称するが、本規約では`main`/`release`に統一する。<br>リリース作業と開発作業が並行して行われる場合や、断面を指定して複数テスト環境にデプロイしたい場合に有効。<br>必要に応じて`hotfix`や`topic`ブランチを作る。 | 中         | ・リリース作業と開発作業が並行して行われる場合<br>  ・断面を指定して複数テスト環境にデプロイしたい場合 | 

なお、本ドキュメントで想定する各ブランチ役割については[ブランチの整理](each_branch.md)に記載している。

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

## マージ戦略

マージ戦略とは、複数のブランチ間でコードの変更を統合する際に使用される方法やポリシーを指す。
この戦略は、プロジェクトのコミット履歴の管理方法やコンフリクトの解決手段、そして最終的にソフトウェアの品質維持や開発プロセスの円滑な進行に影響を及ぼす。そのため、Gitの使用を開始する前に、適切な戦略を策定することが重要である。

ブランチの管理戦略に関わらず、大半のケースにおいて、メインの開発ブランチとそこから作成される個々の機能ブランチが存在する。
ここでは「開発中の機能ブランチに対してメインの開発ブランチの変更をどう取り込むか」「メインの開発ブランチに開発およびレビューが完了した機能ブランチをどう取り込むか」の2つのケースにおいて、とりうる選択肢と推奨方法を説明する。

### 機能ブランチにメインの開発ブランチの変更を取り込む

複数人により同時並行的に開発が進む場合、特定の機能ブランチで開発を進めている最中に、メインの開発ブランチがアップデートされることはよく起こる。
このような状況において、開発者は自らの機能ブランチに対して、最新の開発ブランチの変更を定期的に取り込むことが望まれる。

![開発ブランチと機能ブランチ](merge_strategy_develop_to_feature.drawio.png)

機能ブランチに対して[開発ブランチの変更を取り込む方法](merge_main_to_feature.md)は「マージ」と「リベース」2つの方法が考えられる。

本規約では「リベース」による方法を推奨する。マージによる変更の取り込みを行う場合、メインの開発ブランチの変更を取り込むたびに機能ブランチにマージコミットが作成され、履歴が複雑になる。リベースによりシンプルな履歴をつくることで、レビューアの負荷を軽減することが、リベースを推奨する理由の1つである。

開発者は `git pull` 時の挙動をリベースにするよう設定する（`git config pull.rebase true`）。

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

プルリクエストを経由して、開発が完了した機能ブランチをメインの開発ブランチに取り込むためには、GitHub（GitLab）上でプルリクエスト（マージリクエスト）を経由する運用を前提とする。

GitHubを利用する場合、[開発ブランチに機能ブランチの変更を取り込む方法](merge_feature_to_main.md)は3パターンある。

1. Create a merge commit
2. Rebase and merge
3. Squash and merge

本規約では「Squash and merge」による方法を推奨する。

これは、メインの開発ブランチの履歴をクリーンに保つことが大きな理由になるが、機能ブランチのPRが単一のコミットメッセージで表現できるくらいシンプルで明確な単位にするということが前提となる。

なお、プロテクトブランチの設定にて、メインの開発ブランチに対し「require linear history」を選択することを推奨する。  
本設定を行うと、開発ブランチに対して「Create a merge commit」が選択できないよう制御することができる。

また、意図しない方法でのマージを避けるためにブランチごとにマージ戦略を設定しておき、想定外のマージ戦略が選択された時に警告色を表示するとサードパーティ製のChrome拡張も存在する。こちらは必要に応じて導入することが望ましい。  
https://zenn.dev/daku10/articles/github-merge-guardian

#### 注意点

「Squash and merge」による変更の取り込みを行う場合の注意点は次の通りとなる。

* マージ後は機能ブランチを削除すること。  
変更元の機能ブランチのコミットをまとめたコミットが新たに作成されるめ、元の機能ブランチを再利用して（例えば追加のコミットを作成して）PRを作成してもコンフリクトが発生する。  
マージ後はリモート/ローカルの双方で速やかに機能ブランチを削除することが望ましい。
  * リモート側の機能ブランチはGitHubの設定にて「Automatically delete head branches」を選択することで、マージ後に自動でブランチの削除が行われる。（GitLabでは、マージリクエストから「Delete source branch」オプションを有効にすることで、マージ後に自動でブランチの削除が行われる。プロジェクトの設定で「Enable "Delete source branch" option by default」を選択しておくとデフォルトで有効になる。）
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

## コミットメッセージ

Gitのコミットメッセージは原則自由とする。理由は以下である。

- 通常、作業はチケット管理システムを駆動に開発するため、情報が重複する
- リリースノートの自動生成での扱いは、どちらかといえばラベルとプルリクエストのタイトルが重要
- メンバーによっては粒度の小さいコミットを好む場合も多く、運用の徹底化を図る負荷が高い

チーム規模や特性によっては、Gitのコミットメッセージをルール化する方ことにより、メリットがある場合は `Conventional Commits` をベースとした以下の規約を推奨する。

- [コミットメッセージ規約](commit_message_rule.md)

## ブランチ名

ブランチ戦略で選択したパターンのブランチ名（develop/release/topic/hotfix）を利用する。

featureブランチは以下の命名に従う。

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

## ラベル

TODO

## タグ

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

## （参考1）ローカルでの作業例

gitコマンドでの作業例を記載する。リモートブランチへのプッシュは、`--force-with-lease --force-if-includes` オプションを付けることを必須とする。

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

## （参考2）VS Code上でのGit操作

[VSCode上でのGit操作](vscode_git_ope.md)で、利用頻度が高いとされるGitクライアントである、VS Code上でのGit操作を紹介する。
