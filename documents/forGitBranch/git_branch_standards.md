---
sidebarDepth: 4
title: Gitブランチフロー規約
author: フューチャー株式会社
meta:
  - name: keywords
    content: Git
---

# Gitブランチフロー規約

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。

ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。

また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

本規約はGitブランチ管理の標準的な運用ルールをまとめている。以下の想定で作成されているため留意すること。

- GitHub ／ GitLab の利用
- トランクベース開発（フィーチャーフラグ）を **採用しない**
- ライブラリではなく、アプリケーション（CLIツール、サーバアプリケーションなど）開発で利用する

# 基本方針

一般的なGitブランチ運用のプラクティスに従い、本規約も以下の方針に則る。

- すべての機能開発や不具合修正に、機能ブランチを使用する
- プルリクエストを経由して機能ブランチの修正内容をマージする
- 永続ブランチはデプロイ可能なように整合性を保つ

# ブランチの種類

本規約で想定する、ブランチの種類とその役割を説明する。

| ブランチ名称    | 役割                           | ライフサイクル | 派生元ブランチ          | 命名規則                                              | 直プッシュ可否 |
|-----------|------------------------------|---------|------------------|---------------------------------------------------|---------|
| `main`    | プロダクション環境と一致させるブランチ          | 永続的     | -                | `main` 固定                                         | ✕       |
| `feature` | 特定機能の追加/変更                   | 短命      | `main`／`develop` | `feature/${任意名称}`: 詳細は「featureブランチ」節を参照           | △       |
| `develop` | 開発の大元となるブランチ                 | 永続的     | `main`           | `develop` 固定。複数必要な場合は `develop2` と連番で区別する         | ✕       |
| `release` | リリース準備作業の実施                  | 短命      | `develop`        | `release/${yyyymmdd}` や `release/${リリースバージョン}` など | ✕       |
| `hotfix`  | mainブランチに対する即時修正             | 短命      | `main`           | `hotfix/${任意名称}`: featureブランチに準じる                 | ◯       |
| `topic`   | featureブランチにて複数人開発をする場合のブランチ | 短命      | `feature`        | `topic/${任意名称}`: featureブランチに準じる                  | ◯       |

## mainブランチ

Gitリポジトリを新規作成するとデフォルトで作成されるブランチ。masterからmainに改名された経緯を持つ[^3]。

[^3]: https://github.com/github/renaming

## featureブランチ

機能追加や変更を行うブランチで、主な特徴は以下である。

- ひとつの変更に対してひとつのfeatureブランチを作成し、作業完了後に削除するため、開発中で最も使われる短命なブランチである
- 基本的に1人の開発者のみが利用する

![feature branch](img/branch_strategy_feature.drawio.png)

以下の命名に従う。

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

## developブランチ

開発の中心となるブランチである。

![develop branch](img/branch_strategy_develop.drawio.png)

## releaseブランチ

リリースするために使用するブランチで、主な特徴は以下である。

- リリース前の検証を開発と並行して実施する場合に利用する
- releaseブランチではバグ修正、ドキュメント生成、その他のリリースに伴うタスクのみを実施する
- masterブランチのマージコミットにリリースタグを打ち、mainブランチをdevelopブランチへマージ後、releaseブランチを削除する

![release branch](img/branch_strategy_release.drawio.png)

## hotfixブランチ

本番リリースに対して迅速にパッチを当てて修正する場合に使用するブランチで、主な特徴は以下である。

- 修正が完了するとmainとdevelopの両方(あるいは進行中のreleaseブランチ)にマージされる
- main／developブランチがあると必要になる可能性がある。main／featureブランチのみの運用では必須ではない（管理上の目的でfeatureとhotfixを分けることはあり得る）

![hotfix branch](img/branch_strategy_hotfix.drawio.png)

## topicブランチ  

featureブランチで実現する機能を複数人で開発する場合に使用するブランチである。

- topicブランチが必要なケースでは、featureブランチへの直接プッシュを行ってはならない
- GitHub Flowではfeatureブランチのことをtopicブランチと呼称する場合があるが、本規約ではfeatureブランチから派生するブランチをtopicブランチと定義する

![topic branch](img/branch_strategy_topic.drawio.png)

# ブランチ戦略の選定

ブランチ戦略は以下の方針で選定する。

- できるかぎりシンプルなモデルを選択し、運用コストを下げる
- プロジェクトのフェーズや体制に応じて、変更を許容する

現実的に利用する可能性が高いブランチの運用パターン３つ示す。

選定を記載順で導入を検討する。

- GitHub Flow → Lite GitLab Flow → GitLab Flow

| 名称               | 利用ブランチ                                                                  | 備考                                                                                                            | 運用コスト | 使い所                                                                   |
|------------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|-------|-----------------------------------------------------------------------|
| GitHub Flow      | `main`<br> `feature`                                                    | 最小のブランチ管理パターンで、開発人数が少なく、検証作業は全員で行う場合に有効。<br>マージ毎にプロダクション環境へデプロイする。                                            | 低     | ・個人開発<br>・プロジェクト初期フェーズで断面管理を厳密に行わない場合                                 |
| Lite GitLab Flow | `main`<br>`develop`<br>`feature`<br>`topic`<br> `hotfix`                | GitHub Flowに`develop`ブランチを追加するパターン（特定の呼称はなくLite GitLab FLowと命名）。<br>`main`ブランチをリリースブランチとし、開発ソースコードとは分ける。    | 低     | ・稼働済みのプロダクトなど、一定品質を保証する必要がある場合<br>・開発作業とリリース作業が並行しないチーム構成である場合 |
| GitLab Flow      | `main`<br>`develop`<br>`release` <br>`feature`<br>`topic` <br> `hotfix` | GitLab Flowでは`main`ブランチを`production`ブランチ、`release`ブランチとを`pre production`ブランチと呼称するが、本規約では`main`/`release` とする。 | 中     | ・リリース作業と開発作業が並行して行われる場合<br>・断面を指定して複数テスト環境にデプロイしたい場合                |

## 変則的なパターン

### developブランチが複数作成する場合

![multi develop branch](img/branch_strategy_multi_develop.drawio.png)

複数リリースバージョンを並行して開発する場合、developブランチを複数作るパターンも考えられる。  
上記の例では日々のエンハンスとは別に数カ月後に大型リリースがある場合を想定する。  
あるタイミングで大きく機能が変わる場合にエンハンス用開発ブランチ（`develop`）とは別の開発ブランチ（`develop2`）を作成する。（featureフラグでの対応も考えられるが、本記事でブランチで対応する場合を想定する。）  
このパターンではそれぞれのdevelopブランチに対しては独立してfeatureブランチで機能開発が行われるが、`develop`から`develop2`への同期に注意する必要がある。
`develop`の変更にはバグフィックスや軽微なUI向上が含まれる想定であり、これらの変更は日次あるいは週次の比較的高頻度でプロダクション環境へリリースされる。  
当然、`develop2`はこれらの変更を加味して大型リリース向け開発を進める必要があるので、`develop`のmainブランチ反映されるたびに`develop`から`develop2`への同期を行う必要がある。  
`develop`から`develop2`への同期は以下の様に行う。

- リベースとしてしまうと`develop2`を元にfeatureブランチを作成して開発している開発者が混乱することになるため、マージコミットにて同期を行う。  
- 誤操作を避ける目的でcherry-pickは行わない。

![release multi develop branch](img/branch_strategy_release_multi_develop.drawio.png)

develop2のリリースは以下の手順で行う。

1. `develop`から`develop2`へマージコミットによって同期を行う。（2でコンフリクトが起こらないよう、前準備の意味合いで実施する。）
2. `develop2`から`develop`にマージを行い、その後は通常のリリースフローに従う
3. 問題なくリリースが完了し次第、`develop2`を削除する

`develop`から`develop2`へマージ後、`develop2`を`main`ブランチに反映させる手順も考えられるが、`develop2`から`develop`へのマージとすると以下のメリットがある。

- プロダクション環境（=`develop`）との差分を把握することができる
- より一般的な名称である `develop` ブランチのみ残るため、新規参画者フレンドリーである

### 過去バージョンをサポートする場合

![multi version branch](img/branch_strategy_multi_version.drawio.png)

社内ライブラリなど過去のバージョンをサポートする場合、バージョン別にsupportブランチを作成するパターンも考えられる。
インターフェースの大型改善や、仕様変更を受けてversion1からversion2へupdateを行った場合を想定する。
メインの更新はversion2（mainブランチ）に対して行っていくが、version1の利用ユーザーが存在する場合、バグfixやセキュリティアップデートを並行して行うことが考えられる。  
そういった場合はversion1を示すブランチ（`support/v1`）を別途作成、そのブランチからfeatureブランチを作成してfixを行う。  
featureブランチのマージ後、マイナーバージョン（あるいはパッチバージョン）を上げたタグをコミットし、プロダクション環境へリリースする。  
※この例ではversion1とversion2が別リソースとして動いていることを前提としている。同一リソースで複数バージョンが稼働する場合はversion2のブランチで対応を行う必要がある。

# マージ戦略の選定

マージ戦略とは、複数のブランチ間で生じた変更の取り込み方針を指す。

具体的には次の3ケースそれぞれで「マージコミット」「リベース」「スカッシュマージ」のどれを採用するか判断する。

1. 開発ブランチから機能ブランチへ変更を取り込む
2. 機能ブランチから開発ブランチへ変更を取り込む
3. 永続ブランチ間で変更を取り込む

以下に影響を与えるため、Gitの利用開始前に決めチームで統制を図ることが重要である。

- プロジェクトのコミット履歴の管理
- 開発プロセスの円滑な進行
- 最終的なソフトウェア品質

## 1. 開発ブランチから機能ブランチへ変更を取り込む

機能ブランチでの作業中に、開発ブランチが更新された場合、品質保証の観点で開発ブランチの変更を機能ブランチに取り込んだ上で、テストなどの検証作業を行う必要がある。

[開発ブランチの変更を機能ブランチに取り込む方法](merge_develop_to_feature.md)に記載した2つの方法のうち、「リベース」による方法を推奨する。

![リベース](img/merge_strategy_develop_to_feature_rebase.drawio.png)

理由は次の通り。

- マージコミットが作成されると履歴が複雑になり、レビューアの負荷が高まる
- スカッシュマージはこのケースでは選択できない
- コンフリクトリスクは、マージ・リベース問わず発生するもので、リベースの選択による悪影響は存在しない

この選択にあたり、以下の設定を行う。

1. `git pull` 時の挙動がリベースになるよう `git config pull.rebase true` を実行する
2. 開発ブランチの変更を取り込む場合、同じコンフリクトの解消を何度も求められることを解消するため、`git config rerere.enabled true` を実行する

マージによる変更の取り込みが既存のブランチを変更しないのに対し、リベースは全く新しい（元のコミットIDとは別のコミットIDで）コミットを作成するため、次の1点に注意すること。

1. リモートにプッシュ済のブランチがあり、開発ブランチからさらに変更をリベースで取り込んだ場合、強制プッシュ（Force Push）が必要になる
   - `git push origin HEAD --force-with-lease --force-if-includes` とすることで、意図せずリモートブランチの変更を上書きしないようにする
     - `--force-with-lease`: ローカルのリモート追跡ブランチの ref とリモートの ref を比較し、ローカルの状態が最新でない場合（プッシュ先のリモートブランチに変更が入ったが、ローカルで `git fetch` していない場合）は、プッシュに失敗する。逆にいうと、プッシュ前に `git fetch` を実行済みの場合は、リモートの変更を上書きする形で強制プッシュができてしまうため、これを防ぐには `--force-if-includes` フラグを併用する
     - `--force-if-includes`: リモート追跡ブランチの変更がローカルに全て取り込まれていない場合は、プッシュに失敗する。これにより意図せず他の人のコミットを上書きすることを防ぎつつ、必要な変更を強制的にプッシュすることができる

::: tip

強制プッシュすることにより、レビューコメントが消えてしまわないかという懸念を聞くことがある。2024年7月に実施した調査結果では強制プッシュ運用による支障はなかった。

- 「a.履歴保持」: 強制プッシュを行い、GitHub投稿したレビューコメントが履歴として何かしらのページで取得できるかどうか。GitHubではConversationタブで確認
- 「b.行単位の紐づけ（該当行の変更なし）」: レビューコメントが付けられた行とは別の変更を行い、強制プッシュしたときにレビューコメントの紐づけが残るかどうか。GitHubではFile chagedタブで確認
- 「c.行単位の紐づけ（該当行の変更あり）」: レビューコメントで付けられた行を修正し、強制プッシュ時の挙動。レビュー対応をしたとみなしレビューコメントのひも付きは解除されているべきである。GitHubではFile chagedタブで確認

| サービス        | a.履歴保持 | b.行単位の紐づけ（該当行の変更なし） | c.行単位の紐づけ（該当行の変更あり） |
|----------------|--------------|---------------------------------|---------------------------------|
| GitHub         | 残る           | 残る                              | 消える                              |
| GitLab         | 残る           | 残る                              | 消える                              |

:::

## 2. 機能ブランチから開発ブランチへ変更を取り込む

プルリクエスト（以下、PR）を経由して、開発が完了した機能ブランチをメインの開発ブランチに取り込むためには、GitHub（GitLab）上でPRを経由する運用を行うこと。

[開発ブランチに機能ブランチの変更を取り込む方法](merge_feature_to_develop.md)に記載した3パターンのうち、「スカッシュマージ」による方法を推奨する。

![Squash and Merge](img/merge_strategy_feature_to_develop_squash_and_merge.drawio.png)

理由は次の通り。

- 機能ブランチのコミットログが、汚れることは許容したいため
- 開発ブランチの履歴をクリーンに保てるため
- PRをよりシンプルに保つインセンティブとしたいため（単一のコミットメッセージで表現できる程度の方がレビューコストも小さいため）

「スカッシュマージ」を行うと、変更元の機能ブランチのコミットをまとめたコミットが新たに作成されるめ、元の機能ブランチを再利用しPRを作成するとコンフリクトが発生する。そのためマージ後はリモート/ローカルの双方で速やかに機能ブランチを削除させるため、以下の設定を加える。

- マージ後に機能ブランチを自動削除する設定
  - リモート側: GitHubでは「Automatically delete head branches」を選択することで、マージ後に自動でブランチの削除が行われる（GitLabではプロジェクト設定で「Enable "Delete source branch" option by default」を選択する）
  - ローカル側: `git config --global fetch.prune true`: リモート側で削除されたブランチをローカル側でも削除する

「スカッシュマージ」による変更の取り込みを行う場合、次の2点に注意すること。

1. 部分的なコミットの取り消しができない
   - 履歴上は1つのコミットになるため、マージ後に一部の変更だけの取り消しが不可能。そのためPRをなるべく小さなまとまりにする
2. Authorが失われる
   - 機能ブランチにコミットを行った人がAuthorになるのではなく、「スカッシュマージ」を行った人がAuthorになる。OSS開発を行う場合など、厳密にコントリビューションを管理する必要がある場合は注意する
   - GitHubでは「スカッシュマージ」を行う場合、デフォルトでコミットメッセージに `co-authored-by` トレーラーが追加され、1つのコミットが複数の作成者に帰属するようにするようになっている[^2]。この記述は削除しないようにする

[^2]: https://docs.github.com/ja/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors

## 3. 永続ブランチ間で変更を取り込む

永続ブランチ同士の変更を取り込むケースとして、`develop` ブランチを `main` ブランチや `release`ブランチにマージするといった場合がある。

ブランチ間の同期が取れないため「リベース」「スカッシュマージ」は選択できないため、「マージコミット」を採用する。

# ブランチ運用アンチパターン

ブランチ運用でよく課題に上がるパターンとその対応を紹介する。

## 追い抜きリリース

以下のような状況とする。

- 2つのチケット（issue-312、issue-394とする）があり、どちらも同じファイルの修正を含む
- 先にissue-312がdevelopにマージされ、その後に着手されたissue-394がマージされた
- 以下のような条件があるため、issue-394分を先にリリースしたい
  - issue-312のリリースは業務上の合意が得られていない（エンドユーザ操作に影響があるため、事前告知した日時でリリースしたいなど）
  - issue-394は不具合修正であり業務上の優先度が高いため、なるべく早くリリースしたい

![同一ファイルを複数](img/release_overtaking.drawio.png)

よく陥りがちな対策としては次の2点が考えられる。

1. issue-312をリバートする
2. issue-394のコミットのみをcherry pick してmainブランチにマージする

1のリバートはGitHubの機能で提供されていることもあり簡単に行えるが、手戻りであることは間違いないし、コミットの履歴が汚れるため、保守運用の視点ではマイナスである。2のcherry pickは操作、管理ともに煩雑でミスが出やすいという課題がある。

処方箋だが、前提条件によって別の対応策が考えられる。

1. issue-312のマージがおかしいとするケース
   - 本来想定していたリリーススケジュールから見て、issue-312がdevelopにマージされている状態が正しくないのであれば、issue-312はdevelopにマージせず待機しておくべきだった
   - 誤ってissue-312をマージしてしまったことが原因であれば、リバートを行うことが正しい
2. issue-394のマージがおかしいとするケース
   - 本来想定していたリリーススケジュールを破って、issue-394を優先してリリースしたいというのであれば、`feature` ではなく `hotfix` ブランチで対応すべきであった

2の例を以下に図示する

![hotfixで追い抜き](img/release_overtaking_hotfix.drawio.png)

# コミットメッセージ規則

Gitのコミットメッセージは原則自由とする。理由は以下である。

- 通常、作業はチケット管理システムを駆動に開発するため、情報が重複する
- リリースノートの自動生成での扱いは、どちらかといえばラベルとPRのタイトルが重要
- メンバーによっては粒度の小さいコミットを好む場合も多く、運用の徹底化を図る負荷が高い

チーム規模や特性によっては、Gitのコミットメッセージをルール化する方ことにより、メリットがある場合は `Conventional Commits` をベースとした以下の規約を推奨する。

- [コミットメッセージ規約](commit_message_rule.md)

# ブランチ命名規則

ブランチ名の命名規則は、[ブランチの種類](#ブランチの種類) 章に従うこと。

# タグ規則

Gitにはタグ機能があり、リリースポイントとしてタグを作成する運用とする。

これにより、リリースしたアプリケーションやライブラリに何か不具合があれば、切り戻しや原因追求が容易になる利点がある。

タグを利用するうえでの運用ルール・命名規則などは[タグ規則](git_tag.md)を参考にする。

# ラベル規則

IssueやPRを分類することができるラベルについての利用は自由とする。

PRに適切なラベルを設定し、 [自動生成リリースノート - GitHub Docs](https://docs.github.com/ja/repositories/releasing-projects-on-github/automatically-generated-release-notes) に記載があるように `.github/release.yml` への設定を行うことで、リリースノートの生成をラベル単位にグルーピングできる。

PRを後で探しやすくするための検索キーとしての位置づけと、リリースノート自動生成という観点でラベルを準備すること。

# ローカルでのGit操作

## gitコマンド

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

# リモートブランチへプッシュ（pullした際にリベースしているため、オプションは必須である）
git push origin HEAD --force-with-lease --force-if-includes
```

## VS Code

利用頻度が高いとされるGitクライアントである、VS Code上でのGit操作を紹介する。

- [VSCode上でのGit操作](vscode_git_ope.md)

# 推奨設定

GitやGitHubb/GitLabの推奨設定をまとめる。本規約にあるGitブランチ運用は、以下の設定が行われている前提で説明している箇所がある。

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

## GitLab推奨設定

- GitHubの「Automatically delete head branches」
  - マージリクエストから「Delete source branch」オプションを有効にすることが該当
  - プロジェクトの設定で「Enable "Delete source branch" option by default」を選択しておくとデフォルトで有効になる

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
