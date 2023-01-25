<script setup>
useHead({
  title: " تماس با من",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <h2 class="flex text-5xl">گفتگوی آنلاین</h2>
      <div class="flex">
        <span class="block text-gray-700">
          وضعیت:
          <span
            class="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          ></span>
          <b>آنلاین</b>
        </span>
      </div>
    </div>

    <ChatConversation />
    <!-- <div class="content-area prose-md lg:prose-2xl w-full font-normal">
      <ContentDoc path="/pages/contact" />
    </div> -->
  </section>
</template>
