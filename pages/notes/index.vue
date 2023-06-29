<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/notes" />
    <LatestNotes />
  </section>
</template>
