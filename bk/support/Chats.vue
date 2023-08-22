<script setup lang="ts">
const { supportArchive, openSupportTicket } = useSupport();
</script>
<template>
  <div class="h-full w-full bg-white">
    <SocialStreamFilters class="border-b-[1px] py-1" />
    <div class="h-full w-full overflow-x-auto">
      <div class="h-auto w-full">
        <div
          v-for="chat in supportArchive"
          :key="chat?.id"
          class="px-2 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100 justify-between"
          @click="openSupportTicket(chat)"
        >
          <div class="flex items-center justify-start">
            <ProfileUserAvatar :pub="chat?.operator" size="sm" />
            <ProfileUserName
              :support="true"
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
      </div>
    </div>
  </div>
</template>
