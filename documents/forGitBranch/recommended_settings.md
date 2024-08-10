---
sidebarDepth: 4
title: 推奨設定
author: フューチャー株式会社
---

# 推奨設定

GitやGitHubの推奨設定をまとめる。本ドキュメントにあるGitブランチ運用はこの設定が行われている前提で説明する箇所がある。

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

::: tip git workflowの補足説明

- `pull.rebase`: pull時にリベースする
- `rerere.enabled`: コンフリクトの解決を記録しておき、再び同様のコンフリクトが発生した場合に自動適用する
- `fetch.prune`: リモートリポジトリで削除されたブランチを削除する
:::

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

開発ブランチに対し「require linear history」を選択することを推奨することで、「Create a merge commit」が選択できないようにする。

また、意図しない方法でのマージを避けるためにブランチごとにマージ戦略を設定しておき、想定外のマージ戦略が選択された時に警告色を表示するというサードパーティ製のChrome拡張[^1]も存在する。必要に応じて導入を検討する。

[^1]: [GitHubで誤ったマージ戦略のマージを防ぐChrome拡張機能の開発をした](https://zenn.dev/daku10/articles/github-merge-guardian)

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

### .gitignore

Gitで管理したくないファイル名のルールを定義する`.gitignore`ファイルも入れる。ウェブフロントエンドであれば新規プロジェクトを作成すると大抵作成されるのでそれを登録すれば良いが、もしない場合、あるいは複数の言語を使っている場合などは[GitHubが提供するテンプレート](https://github.com/github/gitignore)を元に作成すると良い。GlobalフォルダにはWindows/macOSのOS固有設定や、エディタ設定などもある。

環境設定を`.env`で行うのが一般的になってきているが、`.env.local`、`.env.dev.local`といった`.local`がついたファイルはクレデンシャルなどの機微な情報を扱うファイルとして定着しているため、 `*.local`も追加すると良い。

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
