<script lang="ts" setup>
const { allNotes } = useDashboardNotes();

useHead({
  title: "یادداشت‌ها",
});
definePageMeta({
  layout: "dashboard",
});
// Columns
const columns = [
  {
    key: "title",
    label: "عنوان",
    sortable: true,
  },
  {
    key: "description",
    label: "توضیحات",
    sortable: true,
  },
  {
    key: "status",
    label: "وضعیت",
    sortable: true,
  },
  {
    key: "created_at",
    label: "ایجاد",
  },
  {
    key: "updated_at",
    label: "به‌روزرسانی",
  },
  {
    key: "id",
    label: "عملیات",
    sortable: false,
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column)),
);

// Selected Rows
const selectedRows = ref([]);

// Actions
const actions = [
  [
    {
      key: "completed",
      label: "Completed",
      icon: "i-heroicons-check",
    },
  ],
  [
    {
      key: "uncompleted",
      label: "In Progress",
      icon: "i-heroicons-arrow-path",
    },
  ],
];

// Filters
const notesStatus = [
  {
    key: "draft",
    label: "پیش‌نویس",
    value: "draft",
  },
  {
    key: "publish",
    label: "منتشر شده",
    value: "publish",
  },
];

const search = ref("");
const selectedStatus = ref([]);

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
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
        <h2 class="text-xl">افزودن یادداشت</h2>
        <div>
          <UButton
            size="xl"
            variant="outline"
            label="ایجاد یادداشت جدید"
            color="green"
            @click="navigateTo('/dashboard/notes/create')"
          />
        </div>
      </div>
    </template>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="جستجو ..."
      />

      <USelectMenu
        v-model="selectedStatus"
        :options="notesStatus"
        multiple
        placeholder="وضعیت"
        class="w-40"
      />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-end items-center w-full px-4 py-3">
      <div class="flex gap-1.5 items-center">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton icon="i-heroicons-view-columns" variant="soft" size="xs">
            ستون‌ها
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          variant="soft"
          color="red"
          size="xs"
          :disabled="search === '' && selectedStatus.length === 0"
          @click="resetFilters"
        >
          ریست
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable
      v-model="selectedRows"
      :rows="allNotes"
      :columns="columnsTable"
      sort-asc-icon="i-heroicons-arrow-up"
      sort-desc-icon="i-heroicons-arrow-down"
    >
      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="row.status == 'publish' ? 'منتشر شده' : 'پیش‌نویس'"
          :color="row.status == 'publish' ? 'emerald' : 'orange'"
          variant="subtle"
        />
      </template>
      <template #created_at-data="{ row }">
        {{ FromNow(row.created_at) }}
      </template>
      <template #updated_at-data="{ row }">
        {{ FromNow(row.updated_at) }}
      </template>
      <template #id-data="{ row }">
        <UButtonGroup size="xs">
          <UButton
            label="ویرایش"
            icon="i-heroicons-pencil-square"
            color="emerald"
            variant="outline"
            @click="navigateTo('notes/edit/' + row.id)"
          />
          <UButton
            label="حذف"
            icon="i-heroicons-trash"
            color="red"
            variant="outline"
          />
        </UButtonGroup>
      </template>
    </UTable>
  </UCard>
</template>
