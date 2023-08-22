<script setup>
const { loadNotes, editorValues, updateNotes } = useDashboardNotes();
const route = useRoute();
onMounted(() => {
  loadNotes(route.params.notesId);
});
definePageMeta({
  layout: "dashboard",
});
useHead({
  title: "ویرایش یادداشت",
});

const items = [
  [
    {
      label: "ذخیره پیش‌نویس",
      icon: "i-heroicons-rectangle-stack",
      click: async () => {
        await updateNotes(route.params.notesId, "draft");
        navigateTo("/dashboard/notes");
      },
    },
  ],
  [
    {
      label: "انصراف",
      icon: "i-heroicons-x-mark",
      click: () => navigateTo("/dashboard/notes"),
    },
  ],
];
const update = async () => {
  await updateNotes(route.params.notesId, "publish");
  navigateTo("/dashboard/notes");
};
</script>
<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      shadow: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-0 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <div class="flex justify-between w-full items-center">
        <h2 class="text-xl">ویرایش یادداشت</h2>
        <div>
          <UButtonGroup size="xl" class="border-gray-200 border px-1">
            <UButton
              variant="soft"
              label="به‌روز‌رسانی"
              color="green"
              @click="update()"
            />
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <UButton
                class="px-3"
                variant="soft"
                :padded="false"
                :ui="{ rounded: 'rounded-0', ring: 'ring-0' }"
                icon="i-heroicons-chevron-down-20-solid"
                color="gray"
              />
            </UDropdown>
          </UButtonGroup>
        </div>
      </div>
    </template>

    <DashboardEditorJs v-model="editorValues" class="prose-xl px-20" />
  </UCard>
</template>
<style>
.codex-editor,
.ct {
  font-family: inherit !important;
}
.ce-block__content,
.ce-toolbar__content {
  max-width: 100%;
}
</style>
