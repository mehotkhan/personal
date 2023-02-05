<script setup lang="ts">
const { $irisSession } = useNuxtApp();
const editIsOpen = ref(false);
const openEditModal = () => {
  editIsOpen.value = true;
};
const closeEditModal = () => {
  editIsOpen.value = false;
};
</script>

<template>
  <div class="items-center flex">
    <span class="text-lg">
      <span class="text-thin"> :// </span>

      {{ $irisSession.getMyName() }}
    </span>
    <div class="text-sm flex items-center">
      <IconUil:headphone-slash class="mr-3 cursor-pointer" aria-hidden="true" />
      <IconUil:at class="mr-3 cursor-pointer" aria-hidden="true" />
      <IconLogos:metamask-icon class="mr-3 cursor-pointer" aria-hidden="true" />
      <IconUil:setting
        class="mr-3 cursor-pointer"
        aria-hidden="true"
        @click="openEditModal"
      />
      <SocialUpdateProfile
        :is-open="editIsOpen"
        @close-modal="closeEditModal"
      />
    </div>
  </div>
</template>
