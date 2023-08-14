<script setup lang="ts">
const { startPersonChat } = useMessages();

const { $dexieDb } = useNuxtApp();
const { getSince, streamSorting, currentSpace } = useStream();
const limit = ref(100);
const chatsArchive = ref<any | null>(null);
chatsArchive.value = useLiveQuery<any[]>(async () => {
  const query = $dexieDb?.chatArchive
    .orderBy("created_at")
    .filter(
      (event: any) =>
        // event.spaceId === currentSpace.value.spaceId &&
        event.created_at >= getSince.value,
    )
    .limit(limit.value);

  return streamSorting.value.filter === "asc"
    ? await query?.toArray()
    : await query?.reverse().toArray();
}, [limit, getSince, streamSorting, currentSpace]);
</script>

<template>
  <div class="h-full w-full overflow-x-auto">
    <!-- <UInput
      color="gray"
      variant="outline"
      placeholder="جستجو ..."
      class="mb-4"
    /> -->
    <div class="h-auto w-full">
      <div
        v-for="chat in chatsArchive.value"
        :key="chat?.id"
        class="px-2 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100 justify-between"
        @click="startPersonChat(chat.other)"
      >
        <div class="flex items-center justify-start">
          <ProfileUserAvatar :pub="chat?.other" size="sm" />
          <ProfileUserName
            :support="true"
            :pub="chat?.other"
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
        <UBadge size="xs" :label="FromNow(chat.updated_at * 1000)" />
      </div>
    </div>
  </div>
</template>
