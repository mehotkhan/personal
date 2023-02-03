<script lang="ts" setup>
const route = useRoute();
const thisPub = String(route?.params?.pub);
useHead({
  title: "پیام‌ها",
});
// definePageMeta({
//   middleware: ["owner-auth"],
// });
</script>
<template>
  <section class="flex flex-col justify-center pb-20">
    <h3 class="">
      گفتگو با :
      <SocialUserDetails :pub="thisPub" />
    </h3>
    <hr />

    <div class="flex relative">
      <div class="content basis-3/4 ml-10 rtl mr-10 relative flex flex-col">
        <div class="w-full h-30 sticky top-0 bg-white">
          <ContactConversationForm :pub="thisPub" class="mt-6" />
        </div>
        <ContactConversationLists :pub="thisPub" />
      </div>
      <div class="relative basis-1/4 mr-10">
        <ContactChatTools :pub="thisPub" class="left-0 sticky top-10" />
      </div>
    </div>
  </section>
</template>
