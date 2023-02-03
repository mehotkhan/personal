<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <section class="intro flex flex-col">
    <div class="w-full mb-3">
      <GlobalIntroPost />
    </div>
    <div class="w-full mb-3">
      <GlobalLatestItems />
    </div>
  </section>
</template>
