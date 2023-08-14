<script setup>
const items = [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
    <UTooltip text="بیشتر">
      <IconUil:ellipsis-h class="" />
    </UTooltip>
  </UDropdown>
</template>
