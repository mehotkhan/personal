<script setup lang="ts">
const { $irisPublic } = useNuxtApp();
const myName = ref("");

onMounted(() => {
  $irisPublic()
    .get("profile")
    .get("name")
    .on((name: string) => {
      myName.value = name;
    });
});
</script>

<template>
  <div class="items-center flex text-md">
    <span class="ml-2">
      <span class="text-thin"> :// </span>
      {{ myName }}
    </span>
    <div class="flex items-center grayscale">
      <IconLogos:metamask-icon
        class="text-sm mx-2 cursor-pointer"
        aria-hidden="true"
      />
      <IconUil:bell class="text-md mx-2 cursor-pointer" aria-hidden="true" />
      <SocialUserMenu class="cursor-pointer" aria-hidden="true" />
    </div>
  </div>
</template>
