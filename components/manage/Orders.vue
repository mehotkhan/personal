<script setup lang="ts">
const { pendingComments, getPendingComments, getCommentData } = useComments();
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  await getPendingComments();
  loading.value = false;
});

const columns = [
  {
    key: "user",
    label: "نویسنده",
    sortable: true,
  },
  {
    key: "path",
    label: "صفحه",
    sortable: true,
  },
  {
    key: "comment",
    label: "نظر",
    direction: "desc",
  },
  {
    key: "date",
    label: "تاریخ",
    sortable: true,
  },
  {
    key: "id",
    label: "عملیات",
  },
];

const comments = ref([]);
watch(pendingComments, (incoming) => {
  if (incoming?.length > 0) {
    incoming?.forEach(async (commentKey: string) => {
      const commentBody = await getCommentData(commentKey);
      //   console.log(commentBody, commentKey);
      comments.value.push(commentBody);
    });
  }
});

// const selected = ref([people[1]]);
</script>

<template>
  <div>
    <h3>مدیریت سفارش‌ها</h3>
    <hr />
    <UTable :rows="comments" :columns="columns" :loading="loading">
      <template #user-data="{ row }">
        <UserDetails :pub="row?.user" />
      </template>
      <template #date-data="{ row }">
        {{ FromNow(row?.date) }}
      </template>

      <template #id-data="{ row }">
        <div class="flex text-xl">
          <IconUil:trash-alt
            class="ml-2 flex text-red-400 cursor-pointer"
            aria-hidden="true"
          />
          <IconUil:check
            class="ml-2 flex text-green-400 cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </template>
    </UTable>
  </div>
</template>
