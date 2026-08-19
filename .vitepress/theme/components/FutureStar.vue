<template>
  <div class="future-star__container" :class="['future-star--kind-' + kind]">
    <div class="future-star"></div>
  </div>
</template>

<script setup>
const { kind } = defineProps({ kind: { type: String, required: true } });
const starSize = 10;
const lengthRate = 32; /* 正確には22程度だが動いていると短く見えるので長めに設定する */
const starWidth = starSize * (lengthRate + 0.5);
const starPath = `path("M 0 ${starSize / 2} l ${starSize * lengthRate} -${starSize / 2} a 1 1 0 0 1 0 ${starSize} Z")`;
</script>

<style scoped>
:global(.standards-home .clip) {
  /* タイトルをアンカーにする */
  anchor-name: --future-title;
}

.future-star__container {
  position: fixed;
  width: calc(100vw + v-bind(starWidth * 2 + "px"));
  min-width: calc(800px + v-bind(starWidth * 2 + "px"));
  bottom: calc(100vh - 160px); /* fallback */
  z-index: -1; /* fallback の場合にコンテンツの後ろに配置したいので-1 */
  position-anchor: --future-title;
  bottom: calc(anchor(top) - 10px);
  left: v-bind(-starWidth + "px");
  filter: blur(3px);
  transform-origin: left 50%;
  opacity: 0.15;
}
.dark .future-star__container {
  opacity: 0.3;
}
.future-star--kind-1 {
  transform: rotate(-6deg);
}
.future-star--kind-2 {
  transform: rotate(-4deg);
}
.future-star {
  position: absolute;
  /* 尾に向かって透明になるグラデーションで彗星らしい残像を出す */
  background: linear-gradient(
    90deg,
    transparent,
    #da0058 45%,
    #ff4d88 90%,
    #ffb3cd
  );
  height: v-bind(starSize + "px");
  width: v-bind(starWidth + "px");
  clip-path: v-bind(starPath);
  transform-origin: right center; /* 先端(右)を基点に尾が伸縮する */
  opacity: 0;

  animation-name: star-streak;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  /* 加速して飛び込み、減速して抜ける */
  animation-timing-function: cubic-bezier(0.45, 0, 0.4, 1);
}
.future-star--kind-2 .future-star {
  /* 2本目はわずかに遅らせて並走させる（飛翔中に必ず2本同時に見えるずれ幅） */
  animation-delay: 150ms;
}
@keyframes star-streak {
  0% {
    left: 0;
    opacity: 0;
    transform: scaleX(0.5);
  }
  2% {
    opacity: 1;
  }
  8% {
    /* 最高速付近で尾が伸びる */
    transform: scaleX(1.2);
  }
  13% {
    opacity: 1;
  }
  15% {
    left: 100%;
    opacity: 0;
    transform: scaleX(0.6);
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .future-star {
    animation: none;
    left: 30%;
    opacity: 0.6;
  }
}
</style>
