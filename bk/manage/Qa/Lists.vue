<script setup lang="ts">
const { qaLists, getQaLists } = useManage();

const columns = [
  {
    key: "title",
    label: "عنوان",
  },

  {
    key: "answer",
    label: "پاسخ",
  },
  {
    key: "id",
    label: "عملیات",
  },
];
onMounted(() => {
  getQaLists();
});
const manageQa = (row: any) => {
  console.log(row);
};
</script>

<template>
  <div>
    <UTable
      class="text-right"
      :rows="qaLists"
      :columns="columns"
      :sort="{ column: 'date', direction: 'desc' }"
    >
      <template #id-data="{ row }">
        <UTooltip text="ویرایش">
          <span class="flex cursor-pointer" @click="manageQa(row)">
            <IconUil:edit-alt
              class="mr-2 flex text-green-500"
              aria-hidden="true"
            />
          </span>
        </UTooltip>
        <UTooltip text="حذف">
          <span class="flex cursor-pointer" @click="manageQa(row)">
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
