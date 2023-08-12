<script lang="ts" setup>
const { registerNew } = useUser();
onMounted(() => {
  registerNew();
  // getUserDetails(profile.value.pub);
});
</script>
<template>
  <Html dir="rtl">
    <Body>
      <NuxtLayout>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
      <UNotifications />
    </Body>
  </Html>
</template>

<style lang="scss"></style>
