import DefaultTheme from "vitepress/theme";
import "./style.css";
import PageInfo from "./components/PageInfo.vue";
import PageTitle from "./components/PageTitle.vue";
import FutureStar from "./components/FutureStar.vue";
import CustomLayout from "./components/CustomLayout.vue";

/**
 * @typedef {import('vitepress').EnhanceAppContext} EnhanceAppContext
 */
export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  /**
   * @param {EnhanceAppContext} ctx context
   * @returns {void}
   */
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);

    ctx.app.component("PageInfo", PageInfo);
    ctx.app.component("PageTitle", PageTitle);
    ctx.app.component("FutureStar", FutureStar);
  },
};
