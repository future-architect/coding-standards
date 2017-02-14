`Javaコーディング規約.docx`・`Javaコーディング規約.html`はPandocを利用して作成しています。

# マークダウンからhtmlへの変換

下記のコマンドで変換します。

```
pandoc Javaコーディング規約.md -s --self-contained --number-sections --toc -t html5 -c ../common/pandoc_styles/css/style.css -o Javaコーディング規約.html -V keywords=Javaコーディング規約,Java8,コーディング規約,Java --template=templates/template.html -V title-prefix=Javaコーディング規約 -V pagetitle="Future Enterprise Coding Standards - フューチャーアーキテクト" -H templates/header-includes.html -B templates/include-before.html -A templates/include-after.html 
```

# マークダウンからdocxファイルへの変換

下記のコマンドで変換します。

```
pandoc Javaコーディング規約.md --toc --reference-docx=../common/pandoc_styles/スタイル.docx -s -o Javaコーディング規約.docx
```
