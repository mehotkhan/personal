<script lang="ts" setup>
useHead({
  title: "حساب کاربری",
});
const { $irisSession } = useNuxtApp();
const isAdmin = ref(false);
const editIsOpen = ref(false);
onMounted(async () => {
  try {
    await $fetch("/owner/check", {
      method: "POST",
      body: {
        pub: $irisSession.getKey().pub,
      },
    });

    isAdmin.value = true;
  } catch (error) {
    isAdmin.value = false;
  }
});
</script>
<template>
  <section class="flex flex-col items-start">
    <div class="flex justify-between items-center w-full">
      <h3 class="flex">سلام {{ $irisSession.getMyName() }} : )</h3>
      <span
        class="flex pt-10 text-lg cursor-pointer"
        @click="editIsOpen = true"
      >
        ویرایش اطلاعات کاربری
        <IconUil:edit class="mr-2 flex" aria-hidden="true" />
      </span>
    </div>
    <div class="border-b-1 mb-4 w-full"></div>
    <p>پاره ای توضیحات در مورد نحوه کار این صفحه</p>
    <SocialUserSettings />
    <SocialNetworkConfig v-if="isDev() || isAdmin" />
    <SocialUpdateProfile
      :is-open="editIsOpen"
      @close-modal="editIsOpen = false"
    />
  </section>
</template>
