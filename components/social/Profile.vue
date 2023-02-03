<script setup lang="ts">
const { $irisSession } = useNuxtApp();
const user = $irisSession.getKey();

const isAdmin = ref(false);
onMounted(async () => {
  const api: string = await $fetch("/check-admin", {
    method: "POST",
    body: {
      pub: user.pub,
    },
  });
  try {
    const response = JSON.parse(api);
    isAdmin.value = response;
  } catch (error) {
    isAdmin.value = false;
    // console.log(error);
  }
});
</script>

<template>
  <div v-if="isDev() || isAdmin">
    <SocialOwnerProfile />
  </div>
  <SocialGuestProfile v-else />
</template>
