<script setup lang="ts">
const { supportArchive, openSupport } = userSupportAdmin();

const columns: any[] = [
  {
    key: "owner",
    label: "فرستنده",
  },
  {
    key: "lastMessage",
    label: "آخرین",
  },

  {
    key: "topic",
    label: "موضوع",
  },
  {
    key: "status",
    label: "وضعیت",
  },

  {
    key: "created_at",
    label: "ایجاد",
  },
  {
    key: "updated_at",
    label: "به‌روز رسانی",
    direction: "asc",
  },
  {
    key: "action",
    label: "باز کردن",
    sortable: false,
  },
];
</script>

<template>
  <UTable
    :columns="columns"
    :ui="{ th: { size: 'text-xs' } }"
    :rows="supportArchive"
    class="overflow-y-auto"
    :loading="!supportArchive"
  >
    <template #lastMessage-data="{ row }">
      {{
        row?.lastMessage?.length >= 15
          ? row?.lastMessage.slice(0, 15) + " ..."
          : row?.lastMessage
      }}
    </template>
    <template #topic-data="{ row }">
      <UBadge size="sm" :label="row.topic" />
    </template>
    <template #status-data="{ row }">
      <UBadge
        size="sm"
        :label="ticketStatus.find((item: any) => item.id === row.status)?.label"
      />
    </template>
    <template #owner-data="{ row }">
      <!-- <ProfileUserAvatar size="xs" :pub="row?.owner" /> -->
      <ProfileUserName :pub="row?.owner" class="mr-1 text-xs" :support="true" />
    </template>
    <template #created_at-data="{ row }">
      <span class="text-[.7rem]">
        {{ FromNow(row.created_at * 1000) }}
      </span>
    </template>
    <template #updated_at-data="{ row }">
      <span class="text-[.7rem]">
        {{ FromNow(row.updated_at * 1000) }}
      </span>
    </template>
    <template #action-data="{ row }">
      <UTooltip text="باز کردن گفتگو">
        <IconUil:message
          aria-hidden="true"
          class="flex text-md text-brown cursor-pointer"
          @click="openSupport(row)"
        />
      </UTooltip>
    </template>
  </UTable>
</template>
<style lang="scss">
thead {
  a {
    color: black !important;
    border: none !important;
    font-size: 1rem !important;
    background: none !important;
    font-weight: normal !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
