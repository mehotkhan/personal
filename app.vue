<script lang="ts" setup>
useHead({
  title: "علی زِمانی://طراح و توسعه دهنده وب",
  titleTemplate: "%s - علی زِمانی://طراح و توسعه دهنده وب",
  meta: [
    {
      name: "fontiran.com:license",
      content: "7RP38A",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
    {
      hid: "description",
      name: "description",
      content: "یادداشت های پراکنده از یک تکنولوژیست جوان و خردمند",
    },
  ],

  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/icons/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/icons/android-chrome-512x512.png",
    },
    {
      rel: "icon",
      type: "apple-touch-icon",
      sizes: "256x256",
      href: "/icons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/android-chrome-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/android-chrome-192x192.png",
    },
  ],
});
</script>
<template>
  <Html dir="rtl">
    <Body class="flex">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss"></style>
