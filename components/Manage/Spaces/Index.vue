<script setup>
const addIsOpen = ref(false);
</script>
<template>
  <div class="h-full flex-col">
    <div
      class="flex items-center justify-between mt-5 px-3 gap-4 my-3 pb-3 border-b-2 border-brown"
    >
      <h3 class="text-xl">مدیریت فضاهای کاری</h3>
      <span class="flex text-lg cursor-pointer" @click="addIsOpen = true">
        افزودن فضای جدید
        <IconUil:plus class="mr-2 flex" aria-hidden="true" />
      </span>
    </div>
    <ManageSpacesLists />
    <UModal v-model="addIsOpen">
      <ManageSpacesCreate @close-modal="addIsOpen = false" />
    </UModal>
  </div>
</template>
