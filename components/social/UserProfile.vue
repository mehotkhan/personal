<script setup lang="ts">
const { $irisSession } = useNuxtApp();
</script>

<template>
  <div class="items-center flex">
    <span class="text-md">
      <span class="text-thin"> :// </span>

      {{ $irisSession.getMyName() }}
    </span>
    <div class="text-sm flex items-center">
      <IconUil:headphone-slash class="mr-3 cursor-pointer" aria-hidden="true" />
      <IconUil:at class="mr-3 cursor-pointer" aria-hidden="true" />
      <IconLogos:metamask-icon class="mr-3 cursor-pointer" aria-hidden="true" />
      <SocialUserMenu class="mr-3 cursor-pointer" aria-hidden="true" />
    </div>
  </div>
</template>
