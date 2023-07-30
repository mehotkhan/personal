<script setup>
useHead({
  title: "یادداشت‌ها",
});
const isOwner = () => {
  return true;
};
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc v-if="!isOwner()" path="/pages/notes" />
    <ManageComments v-else />
    <h3>جدیدترین ورودی‌ها</h3>
    <hr />
    <LatestItems service="notes" />
  </section>
</template>
