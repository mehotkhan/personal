<script setup lang="ts">
const { supportLists, getSupportLists, deleteSupportItem } = useManage();

const columns = [
  {
    key: "pub",
    label: "کاربر",
    sortable: false,
  },
  {
    key: "name",
    label: "نام",
    sortable: false,
  },

  {
    key: "about",
    label: "درباره",
    sortable: false,
  },
  {
    key: "date",
    label: "ایجاد",
  },
  {
    key: "id",
    label: "عملیات",
  },
];
onMounted(() => {
  getSupportLists();
});
</script>

<template>
  <div>
    <UTable
      class="text-right"
      :rows="supportLists"
      :columns="columns"
      :sort="{ column: 'date', direction: 'desc' }"
    >
      <template #pub-data="{ row }">
        <div class="flex items-center">
          <ProfileUserAvatar size="xs" :pub="row.pub" />
          <ProfileUserName :pub="row.pub" class="mr-3" />
        </div>
      </template>
      <template #date-data="{ row }">
        {{ FromNow(row.date * 1000) }}
      </template>
      <template #id-data="{ row }">
        <UTooltip text="حذف">
          <span class="flex cursor-pointer" @click="deleteSupportItem(row.id)">
            <IconUil:trash-alt
              class="mr-2 flex text-red-500"
              aria-hidden="true"
            />
          </span>
        </UTooltip>
      </template>
    </UTable>
  </div>
</template>
<style lang="scss">
thead {
  th {
    text-align: right !important;
  }
}
td a,
th a {
  background: white !important;
  border: 1px solid #ddd;
}
</style>
