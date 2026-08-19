<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide } from "vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async (event) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? 0;

  // 星の凹み（内側頂点）が画面の最遠隅より外に出れば全面を覆える
  const innerRate = 0.45;
  const maxRadius =
    (Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ) /
      0.38) *
    1.05;

  const star = (radius, rotate) => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? radius : radius * innerRate;
      const a = (Math.PI / 5) * i + rotate;
      points.push(
        `${(x + r * Math.sin(a)).toFixed(1)}px ${(y - r * Math.cos(a)).toFixed(1)}px`,
      );
    }
    return `polygon(${points.join(",")})`;
  };

  // 回転を先行させ、半径は後から追いつかせて「ひねりながら開く」動きにする
  const keyframes = [
    [0, 0],
    [0.12, 0.4],
    [0.35, 0.7],
    [0.68, 0.9],
    [1, 1],
  ].map(([growth, spin]) => ({
    clipPath: star(maxRadius * growth, Math.PI * 0.8 * spin),
  }));

  let starAnimation;
  try {
    const transition = document.startViewTransition(async () => {
      isDark.value = !isDark.value;
      await nextTick();
    });
    await transition.ready;

    starAnimation = document.documentElement.animate(
      isDark.value ? keyframes.reverse() : keyframes,
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
        pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
      },
    );
    await transition.finished;
  } catch {
    // ページ遷移などでトランジションが破棄された場合。テーマ自体は切り替え済み
  } finally {
    // fill: forwards のアニメーションはトランジション終了後も残留し、
    // 次回のトグルで同名の擬似要素が再生成された瞬間に前回の最終状態
    // （全面表示のクリップ）が再適用されて画面が一瞬素通しになるため、必ず破棄する
    starAnimation?.cancel();
  }
});
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
