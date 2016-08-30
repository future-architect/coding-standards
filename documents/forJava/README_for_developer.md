`Javaコーディング規約.docx`・`Javaコーディング規約.html`はPandocを利用して作成しています。

# マークダウンからhtmlへの変換

下記のコマンドで変換します。

```
pandoc Javaコーディング規約.md -s --self-contained -t html5 -c ../common/pandoc_styles/css/style.css -o Javaコーディング規約.html
```

# マークダウンからdocxファイルへの変換

下記のコマンドで変換します。

```
pandoc Javaコーディング規約.md --reference-docx=../common/pandoc_styles/スタイル.docx -s -o Javaコーディング規約.docx
```
