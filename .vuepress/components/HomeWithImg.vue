<template>
  <Layout>
    <Home slot="top" class="java-home-page" v-bind="$attrs" v-on="$listeners" />
  </Layout>
</template>
<script>
import Layout from "@theme/layouts/Layout.vue";
import Home from "@theme/components/Home.vue";
export default {
  components: {
    Layout,
    Home,
  },
};
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
