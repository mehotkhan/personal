<script setup lang="ts">
const { $irisSession } = useNuxtApp();
</script>

<template>
  <div>
    <span class="text-lg">
      <span class="text-thin"> :// </span>

      {{ $irisSession.getMyName() }}
    </span>
  </div>
  <div class="text-sm flex align-middle">
    <IconUil:headphone-slash class="cursor-pointer" aria-hidden="true" />
    <IconUil:at class="mr-3 cursor-pointer" aria-hidden="true" />
    <IconLogos:metamask-icon class="mr-3 cursor-pointer" aria-hidden="true" />
  </div>
</template>
