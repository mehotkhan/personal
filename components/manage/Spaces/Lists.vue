<script setup lang="ts">
const { spacesLists, getSpacesLists } = useManage();

const membersIsOpen = ref(false);
const selectedSpace = ref("");

const columns = [
  {
    key: "picture",
    label: "تصویر",
  },
  {
    key: "title",
    label: "عنوان",
  },

  {
    key: "about",
    label: "درباره",
  },
  {
    key: "relay",
    label: "سرور توزیع کننده",
  },
  {
    key: "id",
    label: "عملیات",
  },
];
onMounted(() => {
  getSpacesLists();
});
const manageSpace = (row: any) => {
  console.log(row);
};
const ManageSpaceMember = (row: any) => {
  selectedSpace.value = row;
  membersIsOpen.value = true;
};
</script>

<template>
  <div>
    <UTable
      class="text-right"
      :rows="spacesLists"
      :columns="columns"
      :sort="{ column: 'date', direction: 'desc' }"
    >
      <template #picture-data="{ row }">
        <UAvatar :src="row?.picture" :alt="row?.title" />
      </template>
      <template #id-data="{ row }">
        <div class="flex items-center text-xl gap-3">
          <UTooltip text="ویرایش">
            <span class="flex cursor-pointer" @click="manageSpace(row)">
              <IconUil:edit-alt
                class="mr-2 flex text-green-500"
                aria-hidden="true"
              />
            </span>
          </UTooltip>
          <UTooltip text="حذف">
            <span class="flex cursor-pointer" @click="manageSpace(row)">
              <IconUil:trash-alt
                class="mr-2 flex text-red-500"
                aria-hidden="true"
              />
            </span>
          </UTooltip>
          <UTooltip text="مدیریت اعضا">
            <span class="flex cursor-pointer" @click="ManageSpaceMember(row)">
              <IconUil:users-alt
                class="mr-2 flex text-green-500"
                aria-hidden="true"
              />
            </span>
          </UTooltip>
        </div>
      </template>
    </UTable>
    <UModal v-model="membersIsOpen">
      <ManageSpacesMembers
        :space="selectedSpace"
        @close-modal="membersIsOpen = false"
      />
    </UModal>
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
