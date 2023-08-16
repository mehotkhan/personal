<script lang="ts" setup>
const { logOut } = useUser();
const webauthLoginIsOpen = ref(false);
const { profile } = useUser();
const items = [
  [
    {
      label: profile.value.name,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "تغییر به حساب",
      icon: "i-heroicons-cog-8-tooth",
      click: () => {
        webauthLoginIsOpen.value = true;
      },
    },
  ],

  [
    {
      label: "خروج",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        logOut();
      },
    },
  ],
];
</script>

<template>
  <div>
    <UDropdown
      :items="items"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-start' }"
    >
      <IconUil:user class="text-md mr-1" />
      <IconUil:angle-down class="text-lg mr-1" />
      <template #account="{ item }">
        <div class="text-right flex w-full justify-between">
          <p>وارد شده به عنوان:</p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>

      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>

        <UIcon
          :name="item.icon"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </template>
    </UDropdown>
    <UModal v-model="webauthLoginIsOpen">
      <ProfileWebAuthLogin @close-modal="webauthLoginIsOpen = false" />
    </UModal>
  </div>
</template>
