---
sidebarDepth: 4
title: Gitブランチフロー規約 - VSCode上でのGit操作
author: フューチャー株式会社
---

# VSCode上でのGit操作

利用頻度が高いとされるVS CodeでのGit操作を紹介する。

VSCode上でのGit操作は、サイドバーの "Source Control" から行うことができる。ほとんど全ての操作はコマンドパレットからも実行可能だが、説明は割愛する。

## 推奨する拡張機能

GUIでのGit操作にあたり、次の2つの拡張機能をインストールしておくと利便性が高い。業務上はほぼ必須と見て良い。

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - Gitに関する様々な機能を提供する拡張機能です。
  - 詳細を語りだすとキリがないため、ここでは割愛します。（フューチャー技術ブログにも解説記事があります。「[VSCodeでGitLensを使う ](https://future-architect.github.io/articles/）20240415a/)」）
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
  - コミットグラフを表示する拡張機能です。
  - GitLensにもコミットグラフはありますが、Pro（有料版）限定の提供のため、ここではこちらの拡張機能を使用します。

以降では、これらの拡張機能がインストールされていることを前提に説明を行う。

## リポジトリのクローン (`git clone`)

サイドバー > Explorer か Source Control > Clone Repository ボタンをクリックし、URLを入力すると、リポジトリをクローンできる。

![Clone1](img/vscode_git_clone1.png)  ![Clone2](img/vscode_git_clone2.png)

## コミットグラフの表示

SOURCE CONTROL パネル > 黒丸のグラフアイコン (View Git Graph (git log)) をクリックすると、コミットグラフを表示できる。

白丸のグラフアイコン (Show Commit Graph) はGitLensのコミットグラフだが、冒頭の記述通り、Pro版でのみの提供となる。

![Graph1](img/vscode_git_graph1.png)  ![Graph2](img/vscode_git_graph2.png)

## リモートのフェッチ／プル (`git fetch` / `git pull`)

以下のいずれかの操作を実行すると、リモートリポジトリをフェッチできる。

- SOURCE CONTROL パネル > 三点リーダーアイコン (More Actions...) をクリックし、 Fetch を選択
- コミットグラフ > 雲アイコン (Fetch from Remote(s)) をクリック

![Fetch1](img/vscode_git_fetch1.png)

なお、フェッチ後に以下のようなダイアログが表示される場合があるが、 "Yes" を選択すると、自動で定期的にフェッチを行う。

![Fetch2](img/vscode_git_fetch2.png)

[TODO] プルを追記する。

## ブランチの作成／チェックアウト (`git branch` / `git checkout`)

以下のいずれかの操作を実行すると、ブランチを作成できる。

- SOURCE CONTROL パネル > 三点リーダーアイコン (More Actions...) をクリックし、Branch > Create Branch... を選択
  - 現在チェックアウトしているブランチから新規ブランチが作成されますが、Create Branch From... を選択すると、作成元のブランチを選択することができる
  - 作成したブランチに自動的にチェックアウトする
- コミットグラフ > 作成元コミットの行上で右クリックし、Create Branch... を選択
  - "Check out" にチェックを入れると、作成したブランチにチェックアウトする

![Branch1](img/vscode_git_branch1.png)  ![Branch2](img/vscode_git_branch2.png)

[TODO] チェックアウトを追記する。

## ステージ／コミット／プッシュ (`git add` / `git commit` / `git push`)

SOURCE CONTROL パネル > 変更ファイルの行 > +アイコン (Stage Changes) をクリックすると、対象ファイルをステージできる。（Changes > +アイコン (Stage All Changes) をクリックすると、すべての変更をステージする）

![Stage](img/vscode_git_stage.png)

必要な変更をステージ後、 SOURCE CONTROL パネル内でコミットメッセージを入力し、 Commit ボタンをクリックすると、コミットを作成できる。

![Commit](img/vscode_git_commit.png)

以下のいずれかの操作を実行すると、作成したコミットをリモートリポジトリにプッシュできる。

- SOURCE CONTROL パネル > 三点リーダーアイコン (More Actions...) をクリックし、Push を選択
- BRANCHES パネル > 対象ブランチの行 > 雲アイコン (Publish Branch) をクリック
- コミットグラフ > 対象ブランチの上で右クリックし、Push Branch... を選択

![push1](img/vscode_git_push1.png)  ![push2](img/vscode_git_push2.png)  ![push3](img/vscode_git_push3.png)

## リバート (`git revert`)

TODO

## マージ (`git merge`)

TODO

## リベース (`git rebase`)

TODO

## スタッシュ (`git stash`)

TODO
