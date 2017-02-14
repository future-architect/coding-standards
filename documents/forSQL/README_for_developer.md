`SQLコーディング規約（Oracle）.docx`・`SQLコーディング規約（Oracle）.html`はPandocを利用して作成しています。

# マークダウンからhtmlへの変換

下記のコマンドで変換します。

```
pandoc SQLコーディング規約（Oracle）.md -s --self-contained --number-sections --toc -t html5 -c ../common/pandoc_styles/css/style.css -o SQLコーディング規約（Oracle）.html -V keywords=SQLコーディング規約（Oracle）,Oracle,コーディング規約,SQL --template=templates/template.html -V title-prefix=SQLコーディング規約（Oracle） -V pagetitle="Future Enterprise Coding Standards - フューチャーアーキテクト" -H templates/header-includes.html -B templates/include-before.html -A templates/include-after.html 
```

# マークダウンからdocxファイルへの変換

下記のコマンドで変換します。

```
pandoc SQLコーディング規約（Oracle）.md --toc --reference-docx=../common/pandoc_styles/スタイル.docx -s -o SQLコーディング規約（Oracle）.docx
```
