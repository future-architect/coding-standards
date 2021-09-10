<template>
  <Layout class="home-with-img"> </Layout>
</template>
<script>
import Layout from "@theme/layouts/Layout.vue";
export default {
  components: {
    Layout,
  },
};
</script>
<style scoped>
.home-with-img >>> .hero {
  position: relative;
}
.home-with-img >>> .hero > img {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  opacity: 0.1;
}
.home-with-img >>> .hero > #main-title,
.home-with-img >>> .hero > .description,
.home-with-img >>> .hero > .action {
  position: relative;
  z-index: 1;
}
</style>
