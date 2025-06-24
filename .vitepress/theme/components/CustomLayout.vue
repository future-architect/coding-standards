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

  const clipPath = [
    `polygon(0 0, 100vw 0, 100vw 100vh, 100vw 100vh, 100vw 66vh, 100vw 66vh, 100vw 33vh, 100vw 33vh, 100vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 80vw 100vh, 80vw 66vh, 100vw 66vh, 100vw 33vh, 100vw 33vh, 100vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 60vw 100vh, 60vw 66vh, 100vw 66vh, 100vw 33vh, 100vw 33vh, 100vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 40vw 100vh, 40vw 66vh, 80vw 66vh, 80vw 33vh, 100vw 33vh, 100vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 20vw 100vh, 20vw 66vh, 60vw 66vh, 60vw 33vh, 100vw 33vh, 100vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 66vh, 40vw 66vh, 40vw 33vh, 80vw 33vh, 80vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 66vh, 20vw 66vh, 20vw 33vh, 60vw 33vh, 60vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 66vh, 0 66vh, 0 33vh, 40vw 33vh, 40vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 66vh, 0 66vh, 0 33vh, 20vw 33vh, 20vw 0)`,
    `polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh, 0 66vh, 0 66vh, 0 33vh, 0 33vh, 0 0)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
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
