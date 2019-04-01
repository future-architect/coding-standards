<template>
  <Home
    class="java-home-page"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
import Home from '@default-theme/Home.vue'
export default {
  components: {
    Home
  }
}
</script>
<style scoped>
.java-home-page >>> .hero > img {
    position: absolute;
    margin-top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    opacity: 0.1;
}
</style>
