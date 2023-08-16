<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <h3>افزودن یادداشت</h3>
    <hr />

    <client-only>
      <ck-editor />
    </client-only>
  </section>
</template>
