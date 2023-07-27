<script lang="ts" setup>
const { registerNew } = useUser();

registerNew();
</script>
<template>
  <Html dir="rtl">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss"></style>
