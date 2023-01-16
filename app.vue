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
      type: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/favicon-16x16.png",
    },
    {
      rel: "mask-icon",
      type: "image/png",
      color: "#5bbad5",
      href: "/icons/safari-pinned-tab.svg",
    },
  ],
});
</script>
<template>
  <Html dir="rtl">
    <Body class="flex justify-center content-center bg-gray-400">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss"></style>
