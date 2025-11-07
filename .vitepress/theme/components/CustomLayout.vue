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

  const maskImage =
    `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${200 * vw} ${100 * vh}">
    <defs>
      <filter id="blur">
        <feGaussianBlur stdDeviation="30"/>
      </filter>
    </defs>
    <polygon points="
      ${90 * vw} 0 ${200 * vw},0 ${200 * vw},${100 * vh}
      ${30 * vw},${100 * vh} ${30 * vw},${66 * vh}
      ${60 * vw},${66 * vh} ${60 * vw},${33 * vh}
      ${90 * vw},${33 * vh}
    " fill="white" filter="url(%23blur)" />
  </svg>')`.replace(/\s+/gu, " ");

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  const maskPosition = [
    `${100 * vw}px -${5 * vh}px`,
    `-${100 * vw}px -${5 * vh}px`,
  ];
  const maskSize = `${220 * vw}px ${110 * vh}px`;

  document.documentElement.animate(
    {
      maskImage: [maskImage, maskImage],
      maskPosition: isDark.value ? maskPosition.reverse() : maskPosition,
      maskSize: [maskSize, maskSize],
    },
    {
      duration: 300,
      easing: "ease-in",
      fill: "forwards",
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
  mask-repeat: no-repeat;
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
