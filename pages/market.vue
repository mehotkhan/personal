<script lang="ts" setup>
useHead({
  title: "فروشگاه",
});
const items = [
  {
    slot: "latest",
    label: "جدیدترین",
  },
  {
    slot: "hottest",
    label: "پرفروش‌ترین",
  },
  {
    slot: "comments",
    label: "نظرات",
  },
];
</script>
<template>
  <section class="flex flex-col">
    <IntroPost service="market" />
    <UTabs :items="items" class="w-full min-h-[30rem]">
      <template #latest="{ item }">
        <LatestItems service="market" />
      </template>

      <template #hottest="{ item }">
        <LatestItems service="market" />
      </template>
      <template #comments="{ item }">
        <LatestItems service="market" />
      </template>
    </UTabs>
  </section>
</template>
