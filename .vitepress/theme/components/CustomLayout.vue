<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide } from "vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async () => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const innerWidth = window.innerWidth + 10;
  const innerHeight = window.innerHeight + 10;

  const vw = innerWidth / 100;
  const vh = innerHeight / 100;

  const clipPath = [
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, ${100 * vw}px ${100 * vh}px, ${100 * vw}px ${66 * vh}px, ${100 * vw}px ${66 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, ${80 * vw}px ${100 * vh}px, ${80 * vw}px ${66 * vh}px, ${100 * vw}px ${66 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, ${60 * vw}px ${100 * vh}px, ${60 * vw}px ${66 * vh}px, ${100 * vw}px ${66 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, ${40 * vw}px ${100 * vh}px, ${40 * vw}px ${66 * vh}px, ${80 * vw}px ${66 * vh}px, ${80 * vw}px ${33 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, ${20 * vw}px ${100 * vh}px, ${20 * vw}px ${66 * vh}px, ${60 * vw}px ${66 * vh}px, ${60 * vw}px ${33 * vh}px, ${100 * vw}px ${33 * vh}px, ${100 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, 0 ${100 * vh}px, 0 ${66 * vh}px, ${40 * vw}px ${66 * vh}px, ${40 * vw}px ${33 * vh}px, ${80 * vw}px ${33 * vh}px, ${80 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, 0 ${100 * vh}px, 0 ${66 * vh}px, ${20 * vw}px ${66 * vh}px, ${20 * vw}px ${33 * vh}px, ${60 * vw}px ${33 * vh}px, ${60 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, 0 ${100 * vh}px, 0 ${66 * vh}px, 0 ${66 * vh}px, 0 ${33 * vh}px, ${40 * vw}px ${33 * vh}px, ${40 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, 0 ${100 * vh}px, 0 ${66 * vh}px, 0 ${66 * vh}px, 0 ${33 * vh}px, ${20 * vw}px ${33 * vh}px, ${20 * vw}px 0)`,
    `polygon(0 0, ${100 * vw}px 0, ${100 * vw}px ${100 * vh}px, 0 ${100 * vh}px, 0 ${66 * vh}px, 0 ${66 * vh}px, 0 ${33 * vh}px, 0 ${33 * vh}px, 0 0)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  );
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
