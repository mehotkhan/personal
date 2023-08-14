<script setup lang="ts">
const appConfig = useAppConfig();
const items = computed(() =>
  appConfig.menuItems.map((menu: any) => [
    {
      label: menu.title,
      click: () => navigateTo(menu.to),
    },
  ]),
);
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <IconUil:align-justify class="text-md flex" aria-hidden="true" />
  </UDropdown>
</template>
