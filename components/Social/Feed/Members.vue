<script setup lang="ts">
// const { publicGroups, JoinGroup } = useGroups()
const { supportArchive, openSupportTicket } = useSupport();
const { currentSpace } = useStream();
</script>

<template>
  <div class="mb-6 p-4 border-1">
    <div>
      <div
        class="flex items-center justify-between mt-5 px-3 gap-4 my-3 pb-3 border-b-2 border-brown"
      >
        <h3 class="text-xl">اعضای {{ currentSpace.title }}</h3>
      </div>
    </div>
    <ul class="flex-col items-start">
      <!-- Story #1 -->
      <div
        v-for="chat in supportArchive"
        :key="chat?.id"
        class="px-2 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100 justify-between"
        @click="openSupportTicket(chat)"
      >
        <div class="flex items-center justify-start">
          <ProfileUserAvatar :pub="chat?.operator" size="sm" />
          <ProfileUserName
            :pub="chat?.operator"
            class="text-sm font-semibold text-slate-600 m-0 p-0 mr-3"
          />
          <div
            class="mr-3 text-xs text-slate-400 -mt-0.5 font-semibold break-words overflow-hidden flex items-center"
          >
            {{
              chat?.lastMessage?.length >= 10
                ? chat?.lastMessage.slice(0, 10) + " ..."
                : chat?.lastMessage
            }}
          </div>
        </div>
        <div class="flex gap-2">
          <UBadge v-if="chat?.topic" size="xs" :label="chat.topic" />
          <UBadge
            v-if="chat?.status"
            size="xs"
            :label="
              ticketStatus.find((item: any) => item.id === chat.status)?.label
            "
          />
        </div>
      </div>
    </ul>
  </div>
</template>
