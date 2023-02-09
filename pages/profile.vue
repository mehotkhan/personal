<script lang="ts" setup>
useHead({
  title: "حساب کاربری",
});
</script>
<template>
  <section class="flex flex-col items-start">
    <h2>حساب کاربری</h2>
    <div class="border-b-1 mb-4 w-full"></div>
    <p>پاره ای توضیحات در مورد نحوه کار این صفحه</p>
    <SocialUserSettings />
    <SocialNetworkConfig />
  </section>
</template>
