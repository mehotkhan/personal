<script setup>
useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc />
    <Comments />
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.latest {
  ol {
    list-style-type: persian;
  }
}
</style>
