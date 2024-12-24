ROOT_DIR=`pwd`
CSS_PATH="${ROOT_DIR}/documents/common/pandoc_styles/css/style.css"
STYLE_DOCX_PATH="${ROOT_DIR}/documents/common/pandoc_styles/スタイル.docx"
RESOURCES_DIR="${ROOT_DIR}/public/resources"

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

pandoc ./AWSインフラリソース命名規約.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/AWSインフラリソース命名規約.html
pandoc ./AWSインフラリソース命名規約.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/AWSインフラリソース命名規約.docx

# OpenAPISpecification
cd ${ROOT_DIR}/documents/forOpenAPISpecification

pandoc ./OpenAPI_Specification_3.0.3.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/OpenAPI_Specification_3.0.3.html
pandoc ./OpenAPI_Specification_3.0.3.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/OpenAPI_Specification_3.0.3.docx

# Git
cd ${ROOT_DIR}/documents/forGitBranch

pandoc ./git_branch_standards.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/Gitブランチフロー規約.html
pandoc ./git_branch_standards.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/Gitブランチフロー規約.docx

# Markdown
cd ${ROOT_DIR}/documents/forMarkdown

pandoc ./markdown_design_document.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/Markdown設計ドキュメント規約.html
pandoc ./markdown_design_document.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/Markdown設計ドキュメント規約.docx

# Slack
cd ${ROOT_DIR}/documents/forSlack

pandoc ./slack_usage_guidelines.md -s --self-contained --number-sections --toc -t html5 -c ${CSS_PATH} -o ${RESOURCES_DIR}/Slack利用ガイドライン.html
pandoc ./slack_usage_guidelines.md --toc --reference-doc=${STYLE_DOCX_PATH} -s -o ${RESOURCES_DIR}/Slack利用ガイドライン.docx
