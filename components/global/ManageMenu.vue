<script setup lang="ts">
const appConfig = useAppConfig();
const items = computed(() =>
  appConfig.manageMenuItems.map((menu: any) => [
    {
      label: menu.title,
      click: () => navigateTo(menu.to),
    },
  ]),
);
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <IconUil:cog class="text-md flex" aria-hidden="true" />
  </UDropdown>
</template>
