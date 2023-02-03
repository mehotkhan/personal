<script lang="ts" setup>
const route = useRoute();
const thisPub = String(route?.params?.pub);
useHead({
  title: "پیام‌ها",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center border-b-1 pb-5 mt-10">
      <h3 class="flex text-5xl items-middle">
        <NuxtLink to="/contact" class="flex">تماس/</NuxtLink>
        <span class="flex mr-1">
          گفتگو با /
          <SocialUserDetails :pub="thisPub" class="mr-2" />
        </span>
      </h3>
      <div class="items-center flex min-w-64 h-18 justify-between">
        <SocialUserProfile />
      </div>
    </div>

    <div class="flex relative">
      <div class="content basis-3/4 ml-10 rtl p-0 relative flex flex-col">
        <div class="w-full h-30 sticky top-0 bg-white">
          <ContactConversationForm :pub="thisPub" class="mt-6" />
        </div>
        <ContactConversationLists :pub="thisPub" />
      </div>
      <div class="relative basis-1/4">
        <ContactChatTools :pub="thisPub" class="left-0 sticky top-10" />
      </div>
    </div>
  </section>
</template>
