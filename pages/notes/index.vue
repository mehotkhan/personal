<script setup>
useHead({
  title: "یادداشت‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="content content-area prose-md lg:prose-2xl w-full font-normal">
      <div class="w-full mb-3 blur-sm">
        <ContentDoc path="/pages/notes" />
      </div>
      <GlobalLatestNotes />
    </div>
  </section>
</template>
