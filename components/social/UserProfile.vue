<script setup lang="ts">
const { $irisSession } = useNuxtApp();
</script>

<template>
  <div class="items-center flex">
    <span class="text-md">
      <span class="text-thin"> :// </span>

      {{ $irisSession.getMyName() }}
    </span>
    <div class="flex items-center">
      <IconUil:bell class="text-md mr-3 cursor-pointer" aria-hidden="true" />
      <IconLogos:metamask-icon
        class="text-sm mr-3 cursor-pointer"
        aria-hidden="true"
      />
      <SocialUserMenu class="mr-2 cursor-pointer" aria-hidden="true" />
    </div>
  </div>
</template>
