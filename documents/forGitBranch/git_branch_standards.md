---
sidebarDepth: 4
title: Gitブランチフロー規約
author: フューチャー株式会社
head:
  - - meta
    - name: keywords
      content: Git
---

<page-title/>

本コーディング規約は、世の中のシステム開発プロジェクトのために無償で提供致します。

ただし、掲載内容および利用に際して発生した問題、それに伴う損害については、フューチャー株式会社は一切の責務を負わないものとします。

また、掲載している情報は予告なく変更することがございますので、あらかじめご了承下さい。

# はじめに

本規約はGitブランチ管理の標準的な運用ルールをまとめている。以下の想定で作成されているため留意すること。

- GitHub ／ GitLab の利用
- トランクベース開発（フィーチャーフラグ）を **採用しない**
- ライブラリではなく、アプリケーション（CLIツール、Webアプリケーションなどの）開発で利用する

# 免責事項

::: warning 有志で作成したドキュメントである

- フューチャーアーキテクトには多様なプロジェクトが存在し、それぞれの状況に合わせて工夫された設計開発の方針が存在する。本規約はフューチャーアーキテクトの全ての部署／プロジェクトで利用されているわけではなく、有志が観点を持ち寄って新たに整理したものである。相容れない部分があればその領域を書き換えて利用することを想定している

:::

# 基本方針

一般的なGitブランチ運用のプラクティスに従い、本規約も以下の方針に則る。

- すべての機能開発や不具合修正に、featureブランチを使用する
- プルリクエストを経由してfeatureブランチの修正内容をマージする
- 永続ブランチは各環境にデプロイ可能となるよう整合性を保つ

# ブランチの種類

本規約で想定する、ブランチの種類とその役割を説明する。

| ブランチ名称 | 役割                         | ライフサイクル | 派生元ブランチ    | 命名規則                                                                    | 直プッシュ |
| ------------ | ---------------------------- | -------------- | ----------------- | --------------------------------------------------------------------------- | ---------- |
| `main`       | プロダクション環境との同期   | 永続的         | -                 | `main` 固定                                                                 | ❌️        |
| `feature`    | 特定機能の追加/変更          | 短命           | `main`／`develop` | `feature/${チケット番号}`: 詳細は[featureブランチ](#featureブランチ) を参照 | ✅️※1      |
| `develop`    | 開発の大元                   | 永続的         | `main`            | `develop` 固定。複数必要な場合は `develop2` と連番にする                    | ❌️        |
| `release`    | リリース作業用途             | 短命           | `develop`         | `release/${yyyymmdd}` や `release/${リリースバージョン}` など               | ❌️        |
| `hotfix`     | mainブランチに対する即時修正 | 短命           | `main`            | `hotfix/${チケット番号}`: featureブランチに準じる                           | ✅️        |
| `topic`      | 複数人での機能開発用途       | 短命           | `feature`         | `topic/${チケット番号}`: featureブランチに準じる                            | ✅️        |

※1: topicブランチを利用する場合は、派生させたfeatureブランチへの直プッシュはNGとなる

## mainブランチ

Gitリポジトリを新規作成するとデフォルトで作成されるブランチ。masterからmainに改名された経緯を持つ[^3]。

マージ毎にプロダクション環境へデプロイし同期を取る。

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

有名なブランチ戦略として以下がある。

- [git-flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub flow](https://docs.github.com/ja/get-started/using-github/github-flow)
- [GitLab Flow](https://docs.gitlab.co.jp/ee/topics/gitlab_flow.html)

本規約で推奨するブランチ戦略は次の2パターンであり、これをベースとして選択する。

| 名称                   | 利用ブランチ                                                                  | デフォルトブランチ | リリース作業ブランチ | 備考                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------- | ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Lite GitLab Flow<br>※1 | `main`<br>`develop`<br>`feature`<br>`topic`<br> `hotfix`                      | `develop`          | `develop`            | ・GitLab Flowからreleaseブランチを除いたパターン<br>・リリース作業時にdevelopマージを止められる場合に利用する      |
| GitLab Flow            | `main`<br>`develop`<br>`release` <br>`feature`<br>`topic` <br> `hotfix`<br>※2 | `develop`          | `release`            | ・リリース作業と開発作業が並行して行う必要があるか、<br>断面を指定して複数テスト環境にデプロイしたい場合に利用する |

- ※1: 特定の呼称はないためLite GitLab FLowと命名する
- ※2: 本規約では、本来のGitLab Flowの呼称である `production`を`main`、`pre production`を`release`に言い換えている

# ブランチ戦略とデプロイメント環境

各ブランチ戦略ごとに、デプロイメント環境に対応するブランチを整理する。プロダクション環境リリース前には、mainブランチでタグを打つこととする。

| 名称             | 開発環境 | ステージング環境 | プロダクション環境 | 備考                                                                                                                                                                                                                                                                                                                       |
| ---------------- | -------- | ---------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lite GitLab Flow | develop  | develop          | main               | ・開発環境へはdevelopマージをトリガーにCI/CDでデプロイを推奨する<br>・開発環境へのデプロイ漏れを防ぐため定期的にCI/CDでdevelop断面をリリースすることを推奨する<br>・動作確認など理由がある場合はfeatureブランチから直接開発環境へのデプロイも許容する<br>・ステージング環境は日次など定期的なCI/CDによるデプロイを推奨する |
| GitLab Flow      | develop  | release          | main               | ・開発環境へはdevelopマージをトリガーにCI/CDでデプロイを推奨する<br>・検証期間が長引きそうな場合は、PRレビュー承認後にfeatureブランチから開発環境へのデプロイを許容する                                                                                                                                                    |

# ブランチ戦略の拡張

次のような要件があった場合には、ベースとなるブランチ戦略を拡張する必要がある。

1. developブランチを複数作成する場合
2. 過去バージョンをサポートする場合

## 1. developブランチを複数作成する場合

![multi develop branch](img/branch_strategy_multi_develop.drawio.png)

日々のエンハンス開発と並行して、数カ月後に大型リリースを行いたい場合がある。このときは複数リリースバージョンを並行して開発するため、 `develop`、`develop2` といった複数のdevelopブランチを作る必要がある。

概要:

- `develop` の変更にはバグフィックスや軽微なUI向上が含まれ、日次／週次などの頻度でプロダクション環境へリリースされる
- `develop2` は`develop` ブランチの変更をすべて取り込んだ上で、大型機能の準備を行う必要がある

`develop2` 同期の注意点:

- リベースすると `develop2` を元にfeatureブランチを作成して開発している開発者が混乱することになるため、マージコミットをお用いる
- 誤操作を避ける目的でcherry-pickは行わない
- `devleop2` への同期は、 `develop` -> `main` ブランチに反映されるタイミングで同期を行う（これにより、品質保証済みの変更のみ取り入れることができる９

![release multi develop branch](img/branch_strategy_release_multi_develop.drawio.png)

### develop2のリリース手順

1. `develop`から`develop2`へマージコミットする（2でコンフリクトが起こらないよう、前準備の意味合いで実施する。）
2. `develop2`から`develop`にマージを行い、その後は通常のリリースフローに従う
3. 問題なくリリースが完了し次第、`develop2`を削除する

`develop`から`develop2`へマージ後、`develop2`を`main`ブランチに反映させる手順も考えられるが、`develop2`から`develop`へのマージとすると以下のメリットがある。

- プロダクション環境（=`develop`）との差分を把握することができる
- より一般的な名称である `develop` ブランチのみ残るため、新規参画者フレンドリーである

## 2. 過去バージョンをサポートする場合

![multi version branch](img/branch_strategy_multi_version.drawio.png)

（社内外の）ライブラリでインターフェースの大型改善や仕様変更を受けて、メジャーバージョンを1→2に上げることがる。この時に過去バージョンもサポートする必要があると、バージョン別にsupportブランチを作成する。

概要:

- メインの更新はversion2（mainブランチ）に対して行っていくが、version1の利用ユーザーが存在する場合、バグfixやセキュリティアップデートを並行して行う
  - version1を示すブランチ（`support/v1`）を別途作成、そのブランチからfeatureブランチを作成する
- featureブランチのマージ後、マイナーバージョン（あるいはパッチバージョン）を上げたタグをコミットし、リリースする
  - ※この例ではversion1とversion2が別リソースとして動いていることを前提としている。同一リソースで複数バージョンが稼働する場合はversion2のブランチで対応を行う必要がある。

# マージ戦略の選定

マージ戦略とは、複数のブランチ間で生じた変更の取り込み方針を指す。

具体的には次の3ケースそれぞれで、「マージコミット」「リベース」「スカッシュマージ」のどれを採用するか判断する。

1. developブランチからfeatureブランチへ変更を取り込む
2. featureブランチからdevelopブランチへ変更を取り込む
3. 永続ブランチ間で変更を取り込む

以下に影響を与えるため、Gitの利用開始前に決めチームで統制を図ることが重要である。

- プロジェクトのコミット履歴の管理
- 開発プロセスの円滑な進行
- 最終的なソフトウェア品質

## 1. developブランチからfeatureブランチへ変更を取り込む

featureブランチでの作業中に、developブランチが更新された場合、品質保証の観点でdevelopブランチの変更をfeatureブランチに取り込んだ上で、テストなどの検証作業を行う必要がある。

[developブランチの変更をfeatureブランチに取り込む方法](merge_develop_to_feature.md)に記載した2つの方法のうち、「リベース」による方法を推奨する。

![リベース](img/merge_strategy_develop_to_feature_rebase.drawio.png)

理由は次の通り。

- マージコミットが作成されると履歴が複雑になり、レビューアの負荷が高まる
- スカッシュマージはこのケースでは選択できない
- コンフリクトリスクは、マージ・リベース問わず発生するもので、リベースの選択による悪影響は存在しない

この選択にあたり、以下の設定を行う。

1. `git pull` 時の挙動がリベースになるよう `git config pull.rebase true` を実行する
2. developブランチの変更を取り込む場合、同じコンフリクトの解消を何度も求められることを解消するため、`git config rerere.enabled true` を実行する

マージによる変更の取り込みが既存のブランチを変更しないのに対し、リベースは全く新しい（元のコミットIDとは別のコミットIDで）コミットを作成するため、次の1点に注意すること。

1. リモートにプッシュ済のブランチがあり、developブランチからさらに変更をリベースで取り込んだ場合、強制プッシュ（Force Push）が必要になる
   - `git push origin HEAD --force-with-lease --force-if-includes` とすることで、意図せずリモートブランチの変更を上書きしないようにする
     - `--force-with-lease`: ローカルのリモート追跡ブランチの ref とリモートの ref を比較し、ローカルの状態が最新でない場合（プッシュ先のリモートブランチに変更が入ったが、ローカルで `git fetch` していない場合）は、プッシュに失敗する。逆にいうと、プッシュ前に `git fetch` を実行済みの場合は、リモートの変更を上書きする形で強制プッシュができてしまうため、これを防ぐには `--force-if-includes` フラグを併用する
     - `--force-if-includes`: リモート追跡ブランチの変更がローカルに全て取り込まれていない場合は、プッシュに失敗する。これにより意図せず他の人のコミットを上書きすることを防ぎつつ、必要な変更を強制的にプッシュすることができる

::: tip 強制プッシュでレビューコメントは消えるのか？

強制プッシュすることにより、レビューコメントが消えてしまわないかという懸念を聞くことがある。2024年7月に実施した調査結果では問題なかった。

- a.履歴保持: 強制プッシュを行い、GitHub投稿したレビューコメントが履歴として何かしらのページで取得できるかどうか。GitHubではConversationタブで確認
- b.行単位の紐づけ（該当行の変更なし）: レビューコメントが付けられた行とは別の変更を行い、強制プッシュしたときにレビューコメントの紐づけが残るかどうか。GitHubではFile chagedタブで確認
- c.行単位の紐づけ（該当行の変更あり）: レビューコメントで付けられた行を修正し、強制プッシュ時の挙動。レビュー対応をしたとみなしレビューコメントのひも付きは解除されているべきである。GitHubではFile chagedタブで確認

| サービス | a.履歴保持 | b.行単位の紐づけ（該当行の変更なし） | c.行単位の紐づけ（該当行の変更あり） |
| -------- | ---------- | ------------------------------------ | ------------------------------------ |
| GitHub   | 残る       | 残る                                 | 消える                               |
| GitLab   | 残る       | 残る                                 | 消える                               |

:::

### プルリクエスト作成前にアップストリームをプルする

featureブランチの開発が終わり、プルリクエストを作成する際には、改めてアップストリーム（developブランチ）の変更をfeatureブランチに取り込み、差分が無いことを確認すべきである。

理由は次の通り。

- レビュアーの負荷軽減のため
  - レビュアーがプルリクエストの差分以外の部分を参照した際に、それが古いバージョンであると、誤指摘、混乱してしまうなどの懸念がある
- マージ後のdevelopブランチでテスト失敗するリスクを減らすため
  - コンフリクトせずにマージ可能だったとしても、何かしらの依存関係や整合性が狂い、マージ後のテストが失敗する可能性がある

### プルリクエストのレビュー依頼までにどこまでテストしておくべきか

本規約で推奨する `Lite GitLab Flow` `GitLab Flow` ともに、開発環境へはdevelopマージをトリガーにCI/CDでデプロイを推奨している。

そのため、プルリクエスト作成時点では開発環境（≒AWSなどクラウド環境の想定）へのデプロイ＋動作検証は不要である。

ローカルでの開発のみで品質担保が難しく手戻りが多い場合は、サンドボックス環境や開発環境にfeatureブランチからデプロイして動作検証する作業が必要になる。開発環境を共有する場合は、デプロイタイミングの制御がチーム内で必要になるため、運用ルールを検討する必要がある。

### Terraformはレビュー依頼時点でどこまで確認しておくべきか

Terraformはplanが成功しても、applyが失敗することは多々あり（サブネットが足りなかった、force_destory=trueを明示的な設定が必要だったなど）、レビューでの見極めは難しいことが多い。そのため、applyをどのタイミングで実施するかがチームの生産性の鍵となる。

大別すると以下の3方式が存在する

1. マージ後にapply
   - PR -> CI（planを含む） -> レビュー -> developマージ -> apply(CI)
2. Approve後にapply
   - PR -> CI（planを含む） -> レビュー -> apply -> developマージ -> apply(CI)
3. CI以前にapply
   - apply -> PR -> CI(plan含む) -> レビュー -> developマージ -> apply(CI)

それぞれの特徴を下表にまとめる。

| 観点                 | ①マージ後にapply                                                             | ②Approve後にapply                                                                 | ③CI以前にapply                                                                  |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 説明                 | developブランチにマージ後にapply。アプリコードと同じメンタルモデルを共有可能 | レビュアー承認後にapply。featureブランチからapplyするため、あるべき姿からは外れる | レビュー依頼前にapplyで成功したことを確認する方式                               |
| developブランチ品質  | ❌️一時的にapplyが失敗するコードが混入するリスク                             | ✅️apply可能なコードのみに保つことができる                                        | ✅️apply可能なコードのみに保つことができる                                      |
| レビュー負荷         | ❌️applyの成否は不明なので心理的負荷あり                                     | ❌️applyの成否は不明なので心理的負荷あり                                          | ✅️applyが成功している前提で対応可能。apply結果をコンソールからも確認可能       |
| apply失敗時のコスト  | ❌️再度PRを作る必要があり手間                                                | ✅️同一PRを流用できる                                                             | ✅️apply成功後にPR作成が可能                                                    |
| PRのトレーサビリティ | ❌️PRが割れると面倒                                                          | ✅️同一PRである                                                                   | ✅️同一PRである                                                                 |
| 環境のバッティング   | ✅️ない                                                                      | ⚠️Approveからdevelopマージまでの間に、他メンバーの作業と重複するとややこしい      | ❌️作業調整が必要                                                               |
| ガバナンス           | ✅️applyをCIのみに絞るなど自動化と相性が良い                                 | ⚠️レビュアー承認後のコードのみapply対象とできる                                   | ❌️ノーレビューのインフラ変更を適用するため、初学者が多いチームには適用が難しい |
| 結論                 | applyの成功率が高く維持できる場合に有効                                      | applyの成功率が低い場合に有効                                                     | 少数精鋭の場合に採用可能な、上級者向けの方式                                    |

本規約の推奨は以下。

- 新規参画者が多く統制を取りたい場合や、applyの成功率が高く維持できる場合は①を選択
- ある程度インフラメンバーが絞れ、かつapplyの失敗率が高くレビュー負荷が高くなってしまう懸念がある場合は②を選択
- インフラメンバーが少数精鋭（通常、同時の作業はほぼ発生しない）の場合は必要に応じて、②をベースにしながら③を取り入れて生産性を上げる

## 2. featureブランチからdevelopブランチへ変更を取り込む

プルリクエスト（以下、PR）を経由して、開発が完了したfeatureブランチをメインのdevelopブランチに取り込むためには、GitHub（GitLab）上でPRを経由する運用を行うこと。

[developブランチにfeatureブランチの変更を取り込む方法](merge_feature_to_develop.md)に記載した3パターンのうち、「スカッシュマージ」による方法を推奨する。

![Squash and Merge](img/merge_strategy_feature_to_develop_squash_and_merge.drawio.png)

理由は次の通り。

- featureブランチのコミットログが、汚れることは許容したいため
- developブランチの履歴をクリーンに保てるため
- PRをよりシンプルに保つインセンティブとしたいため（単一のコミットメッセージで表現できる程度の方がレビューコストも小さいため）

「スカッシュマージ」を行うと、変更元のfeatureブランチのコミットをまとめたコミットが新たに作成されるめ、元のfeatureブランチを再利用しPRを作成するとコンフリクトが発生する。そのためマージ後はリモート/ローカルの双方で速やかにfeatureブランチを削除させるため、以下の設定を加える。

- マージ後にfeatureブランチを自動削除する設定
  - リモート側: GitHubでは「Automatically delete head branches」を選択することで、マージ後に自動でブランチの削除が行われる（GitLabではプロジェクト設定で「Enable "Delete source branch" option by default」を選択する）
  - ローカル側: `git config --global fetch.prune true`: リモート側で削除されたブランチをローカル側でも削除する

「スカッシュマージ」による変更の取り込みを行う場合、次の2点に注意すること。

1. 部分的なコミットの取り消しができない
   - 履歴上は1つのコミットになるため、マージ後に一部の変更だけの取り消しが不可能。そのためPRをなるべく小さなまとまりにする
2. Authorが失われる
   - featureブランチにコミットを行った人がAuthorになるのではなく、「スカッシュマージ」を行った人がAuthorになる。OSS開発を行う場合など、厳密にコントリビューションを管理する必要がある場合は注意する
   - GitHubでは「スカッシュマージ」を行う場合、デフォルトでコミットメッセージに `co-authored-by` トレーラーが追加され、1つのコミットが複数の作成者に帰属するようにするようになっている[^2]。この記述は削除しないようにする

[^2]: https://docs.github.com/ja/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors

### マージはだれが行うべきか

プリリクエストの承認（Approve）をもらった後、マージはレビュアー／レビュイーのどちらが行うべきか議論になる場合がある。

| 観点       | レビュアー派                                                              | レビュイー派                                                                         |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 説明       | 開発者の責務が、developブランチにマージするまでという役割分担の場合に有効 | 各開発者がその機能のリリースについて責任を負うモデルの場合に有効                     |
| 生産性     | ⚠️レビュアーがブロッキングになりがち                                      | ✅️高い。コメントはあるがApproveしたので、適時対応してマージして、といった運用が可能 |
| 統制       | ✅️レビュアーが管理しやすい                                               | ✅️メンバーの自主性に依存                                                            |
| 要求スキル | ✅️低い。中央で統制を行いやすい                                           | ⚠️開発メンバーの練度が求められる                                                     |

上記にあるように、そのプルリクエストで実装した機能を、本番環境にデリバリーする責務をどちらに持たせるかという観点で、意思決定することが多い。

本規約の推奨は以下。

- プロダクトオーナー（業務側）などでリリースタイミングを完全にコントロールしたいといった分業制を取る場合は、レビュアーがマージする
- 各開発者により自律性を持たせ、アジャイル的に生産性を重視するのであれば、レビュイーがマージする

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

## タグの運用ルール

- リリースごとに新しいバージョンを示したタグを発行する
- (推奨) GitHubなどの画面経由でタグを作成する
- mainブランチにてタグを作成する
- 入力間違えなどのケースを除き、一度タグをつけた後は削除しない
- 後述する「タグの命名規則」に従う

![GitHub画面でbackend/v1.6.0のタグを作成する](img/create_new_tag.png)

何かしらの理由で、コマンドラインからタグを作成する必要がある場合は、以下に注意する。画面経由・コマンドライン経由でのタグ作成は混ぜないようにし、運用手順は統一する。

- 軽量 (lightweight) 版ではなく、注釈付き (annotated) 版のタグを利用する

```sh
# OK（注釈付きタグを利用する）
$ git tag "v1.0.4" -m "v1.0.4 🐛Fix item api log"

# NG（軽量タグは利用しない）
$ git tag "v1.0.4"
```

## タグの命名規則

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

## タグメッセージの規則

- (推奨) GitHubを利用中の場合、「[Generate release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)」を用いて、タイトルや本文を自動生成する
- フロントエンド・バックエンドで整合性を保っているのであれば、メモ目的でバージョンを記載する運用を推奨とする
- 実用的な利用用途が思いつかない場合は、開発者視点での楽しみリリースの大きなマイルストーンの名称など、チームの関心事を記入することを推奨とする

![create new tag](img/create_new_tag_title.png)

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

## バージョンアップ規則

- 開発しているプロダクトがライブラリの場合、セマンティックバージョニングに厳密に従う
- 開発しているプロダクトがシステム（アプリケーション）の場合、その成熟度や初回リリースの区切りでバージョンアップを行うことを推奨する。適切なバージョンアップを行うことで視認性が上がり、運用負荷を下げることができる
  - 例1: 初回リリース、カットオーバーで `v1.0.0` に上げる
  - 例2: 稼働後1年以上経過し、中規模以上の大きな機能アップデートがあったので、 `v2.0.0` に上げる

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

## git-secrets

[git-secrets](https://github.com/awslabs/git-secrets)を用いることで、ユーザーパスワードや AWS アクセスキーなどの機密情報が含まれる可能性のあるコードなどをGit リポジトリに追加されないようにできる。

本規約の推奨は以下。

- チームメンバー全員にgit-secretsを導入する

## GitHub推奨設定

業務利用でのチーム開発を想定しており、リポジトリは以下の条件を満たす前提とする。

- プライベートリポジトリ
- Organization配下に作成
- Teamsプラン以上の有料契約（※プロテクトブランチの機能などを利用するために必要）

### General

| Category      | Item                                                             | Value        | Memo                                                                                       |
| ------------- | ---------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| General       | Require contributors to sign off on web-based commits            | チェックなし | 著作権・ライセンス承諾の場合に用いるが、業務アプリ開発では不要                             |
|               | Default branch                                                   | develop      |                                                                                            |
| Pull Requests | Allow merge commits                                              | ✅️          | main <- developなどのマージ時に必要                                                        |
|               | Allow squash merging                                             | ✅️          | develop <- feature はSquash mergeを推奨                                                    |
|               | Allow rebase merging                                             | -            | 利用しないため、チェックを外す                                                             |
|               | Allow suggest updating pull request branches                     | ✅️          | Pull Request作成後、ベースブランチが更新された場合、ソースブランチの更新を提案してくれる   |
|               | Automatically delete head branches                               | ✅️          | マージ後にfeature branchを削除するため有効にする                                           |
| Pushes        | Limit how many branches and tags can be updated in a single push | 5            | git push origin –mirrorで誤ってリモートブランチを破壊しないようにする。推奨値の5を設定する |

### Access

| Category                | Item          | Value      | Memo  |
| ----------------------- | ------------- | ---------- | ----- |
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

| Category                  | Item                                                             | Value | Memo                                                                                                 |
| ------------------------- | ---------------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| Protect matching branches | Require a pull request before merging                            | ✅️   | プルリクエストを必須とする                                                                           |
|                           | Require approvals                                                | ✅️   | レビューを必須とする                                                                                 |
|                           | Required number of approvals before merging                      | 1     | 最低1名以上の承認を必須とする                                                                        |
|                           | Dismiss stale pull request approvals when new commits are pushed | -     | レビュー承認後のPushで再承認を必要とするかだが、レビュー運用上に支障となることも多く、チェックを外す |
|                           | Require status checks to pass before merging                     | ✅️   | CIの成功を条件とする                                                                                 |
|                           | Require branches to be up to date before merging                 | 任意  | CIパイプラインのワークフロー名を指定                                                                 |
|                           | Require conversation resolution before merging                   | ✅️   | レビューコメントがすべて解決していることを条件とする                                                 |
|                           | Require signed commits                                           | ✅️   | 署名付きコミットを必須化し、セキュアな設定にする                                                     |
|                           | Require linear history                                           | ✅️/- | mainブランチの場合はOFFとするが、developの場合はSquash mergeを求めるため有効にする                   |
|                           | Do not allow bypassing the above settings                        | ✅️   | パイパスを許容しない                                                                                 |

developブランチに対し「require linear history」を選択することを推奨することで、「Create a merge commit」が選択できないようにする。

また、意図しない方法でのマージを避けるためにブランチごとにマージ戦略を設定しておき、想定外のマージ戦略が選択された時に警告色を表示するというサードパーティ製のChrome拡張[^1]も存在する。必要に応じて導入を検討する。

[^1]: https://zenn.dev/daku10/articles/github-merge-guardian

#### Tags

| Category | Item         | Value                | Memo                                                     |
| -------- | ------------ | -------------------- | -------------------------------------------------------- |
|          | Protect tags | v[0-9]+.[0-9]+.[0-9] | セマンティックバージョニングに則ったタグのみ、削除を防ぐ |

#### GitHub Actions

| Category            | Item                                                                                                                                | Value | Memo |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- | ---- |
| Actions permissions | Allow asset-taskforce, and select non-asset-taskforce, actions and reusable workflows > Allow actions created by GitHub             | ✅️   |      |
|                     | Allow asset-taskforce, and select non-asset-taskforce, actions and reusable workflows > Allow actions Marketplace verified creators | ✅️   |      |

#### Code security and analysis

| Category   | Item                        | Value | Memo                                       |
| ---------- | --------------------------- | ----- | ------------------------------------------ |
| Dependabot | Dependabot alerts           | ✅️   | 依存パッケージのアップデートを検知するため |
|            | Dependabot security updates | ✅️   |                                            |
|            | Dependabot version updates  | ✅️   |                                            |

## GitLab推奨設定

- GitHubの「Automatically delete head branches」
  - マージリクエストから「Delete source branch」オプションを有効にすることが該当
  - プロジェクトの設定で「Enable "Delete source branch" option by default」を選択しておくとデフォルトで有効になる

## 設定ファイル

### .gitattribute

チーム開発において開発環境がWindows/Macなど複数存在することは少なくなく、また、Gitリポジトリ上の改行コードは統一した方が余計な差分が生じず扱いやすくなる。このときよく用いるのが、 `core.autocrlf` という設定である。

| 名称          | 設定値 | チェックアウト時の挙動 | コミット時の挙動     |
| ------------- | ------ | ---------------------- | -------------------- |
| core.autocrlf | true   | 改行コードをCRLFに変換 | 改行コードをLFに変換 |
|               | input  | 何もしない             | 改行コードをLFに変換 |
|               | false  | 何もしない             | 何もしない           |

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

### 個人用のファイルをGit管理対象外とする

`.gitignore` を用いると、チームでGit対象外とするファイルを一律で設定できる。

一方で、動作確認用のちょっとしたスクリプトなどで以下の要件が出てくることがある。

- 個人的にGitリポジトリ配下のフォルダに格納したいが、コミットしたくない（≒自分のローカルリポジトリのみ必要である）
- あくまで個人用途であるため `.gitignore` に追記したくない

上記の場合は、`.git/info/exclude` を利用することを推奨する。

参考:

- [個人的Gitおすすめtips 7選 #GitHub - Qiita](https://qiita.com/hichika/items/f3c980dd069df0f3a56e)

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
