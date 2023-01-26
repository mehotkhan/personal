<script lang="ts" setup>
import { useMessage } from "~/stores/directMessage";
const directMessage = useMessage();

useHead({
  title: " تماس با من",
});
onMounted(async () => {
  const api: string = await $fetch("/get-admin", {
    method: "GET",
  });
  try {
    const response = JSON.parse(api);
    directMessage.startChat(response);
  } catch (error) {
    directMessage.startChat(undefined);
  }
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-center">
        <h2 class="flex text-5xl">گفتگوی آنلاین</h2>
        <h3 class="flex text-xl font-thin mr-5">
          <NuxtLink to="#"> بایگانی پیام‌ها </NuxtLink>
        </h3>
      </div>
      <div class="flex items-center">
        <SocialGuestProfile class="mb-4 bg-black" />
        <span class="hidden text-gray-700 mr-5">
          وضعیت:
          <b>آنلاین</b>
          <span
            class="inline-block align-text-bottom w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          >
          </span>
        </span>
      </div>
    </div>

    <ChatConversation />
    <!-- <div class="content-area prose-md lg:prose-2xl w-full font-normal">
      <ContentDoc path="/pages/contact" />
    </div> -->
  </section>
</template>
