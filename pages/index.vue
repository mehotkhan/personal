<script lang="ts" setup>
useHead({
  title: "صفحه نخست",
});
</script>
<template>
  <section class="intro flex flex-col">
    <div class="content content-area prose-md lg:prose-2xl w-full font-normal">
      <div class="w-full mb-3">
        <GlobalIntroPost />
      </div>
      <div class="w-full mb-3">
        <GlobalLatestItems />
      </div>
    </div>
  </section>
</template>
