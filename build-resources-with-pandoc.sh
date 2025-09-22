#!/bin/sh
set -e

ROOT_DIR=`pwd`
CSS_PATH="${ROOT_DIR}/documents/common/pandoc_styles/css/style.css"
STYLE_DOCX_PATH="${ROOT_DIR}/documents/common/pandoc_styles/スタイル.docx"
RESOURCES_DIR="${ROOT_DIR}/public/resources"

# バージョンチェック
cat /etc/alpine-release

apk update

# apkによるインストール
## chromium のインストール
apk add --update chromium

## nodejs のインストール
apk add nodejs npm

## 日本語用フォントのインストール
apk add --no-cache curl fontconfig
curl -O https://moji.or.jp/wp-content/ipafont/IPAexfont/IPAexfont00301.zip
mkdir -p /usr/share/fonts/ipa
mkdir -p /temp
unzip IPAexfont00301.zip -d /temp
cp /temp/IPAexfont00301/*.ttf /usr/share/fonts/ipa/
rm IPAexfont00301.zip

# バージョンチェック
node -v
npm -v
chromium-browser --version

# mermaid-filterに必要な変数をセット
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD='true'
export MERMAID_FILTER_PUPPETEER_CONFIG="${ROOT_DIR}/.puppeteer.json"
export PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"
# export MERMAID_FILTER_FORMAT="svg" # docxでの出力時にはsvgは使えません

# mermaid-filterのインストール
npm i -g mermaid-filter@1.4.7

# Java
cd ${ROOT_DIR}/documents/forJava

pandoc ./Javaコーディング規約.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/Javaコーディング規約.html
pandoc ./Javaコーディング規約.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/Javaコーディング規約.docx

# SQL
cd ${ROOT_DIR}/documents/forSQL

pandoc ./SQLコーディング規約（Oracle）.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/SQLコーディング規約（Oracle）.html
pandoc ./SQLコーディング規約（Oracle）.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/SQLコーディング規約（Oracle）.docx
pandoc ./SQLコーディング規約（PostgreSQL）.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/SQLコーディング規約（PostgreSQL）.html
pandoc ./SQLコーディング規約（PostgreSQL）.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/SQLコーディング規約（PostgreSQL）.docx

# AWSインフラリソース
cd ${ROOT_DIR}/documents/forAWSResource

pandoc ./AWSインフラリソース命名規約.md -f commonmark_x+fenced_divs -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/AWSインフラリソース命名規約.html
pandoc ./AWSインフラリソース命名規約.md -f commonmark_x+fenced_divs --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/AWSインフラリソース命名規約.docx

# OpenAPISpecification
cd ${ROOT_DIR}/documents/forOpenAPISpecification

pandoc ./OpenAPI_Specification_3.0.3.md -f commonmark_x+fenced_divs -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} --filter mermaid-filter -o ${RESOURCES_DIR}/OpenAPI_Specification_3.0.3.html
pandoc ./OpenAPI_Specification_3.0.3.md -f commonmark_x+fenced_divs --toc --reference-doc=${STYLE_DOCX_PATH} -s --filter mermaid-filter -o ${RESOURCES_DIR}/OpenAPI_Specification_3.0.3.docx
