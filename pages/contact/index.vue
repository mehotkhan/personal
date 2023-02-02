<script lang="ts" setup>
import { useMessage } from "~/stores/directMessage";
const directMessage = useMessage();

onMounted(async () => {
  if (!directMessage?.pub) {
    try {
      const api: string = await $fetch("/get-admin", {
        method: "GET",
      });
      const response = JSON.parse(api);
      directMessage.startChat(response);
    } catch (error) {
      const testPub =
        "2cWyKC1H_GthZf6E6NnnD-6nE06W2Frucek0UppopNc.IFbtOULFbSTGrxwgvbpt9gKbQDdrqmlezgclljV--84";
      directMessage.startChat(testPub);
      console.log("cant get admin pub , test area");
    }
  }
});
useHead({
  title: " تماس با من",
});
</script>
<template>
  <section
    :key="directMessage?.pub"
    class="flex flex-col justify-center content-center"
  >
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <div class="flex items-start flex-col">
        <h3 class="flex text-5xl">گفتگوی آنلاین</h3>
        <p class="block text-xl text-red-600 mt-3">
          این بخش در حال توسعه است و هنوز قابلیت اجرایی ندارد !!!
        </p>
      </div>
      <div class="flex items-center">
        <SocialGuestProfile class="mb-4 bg-black" />
      </div>
    </div>

    <ChatConversation />
    <h3 class="text-5xl border-b-1 pb-5 mt-10">بایگانی پیام‌ها</h3>
    <ChatArchive />
  </section>
</template>
