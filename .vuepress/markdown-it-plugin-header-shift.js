/**
 * headerタグを1つづつずらします。
 * Pandocでも利用できるMarkdownファイルにしたいので、`# header`を一つしかつくれないvuepress制約がうまく共存できないため、
 * vuepressではhタグの番号をずらし、無理やり共存できるようにします。
 */
module.exports = function headerSections(md) {
  function shiftHeaders(state) {
    state.tokens.forEach((t, i) => {
      if (t.type.includes("heading")) {
        t.tag = t.tag.replace(/^h(\d)$/, (_h, n) => `h${n - 0 + 1}`);
      }
    });
  }

  md.core.ruler.push("header_shift", shiftHeaders);
};
