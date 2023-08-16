<script setup lang="ts">
const { $dexieDb } = useNuxtApp();
const { getSince, streamSorting, currentSpace } = useStream();
const { startGroupStream } = useGroups();

const replayTimeline = ref<any | null>(null);
const limit = ref(7);

onMounted(() => {
  if (currentSpace.value?.relay) {
    startGroupStream();
  }
});
replayTimeline.value = useLiveQuery<any[]>(async () => {
  const query = $dexieDb?.groupsEvent
    .orderBy("created_at")
    .filter(
      (event: any) =>
        event.tags.length === 1 &&
        event.spaceId === currentSpace.value.spaceId &&
        event.created_at >= getSince.value,
    )
    .limit(limit.value);

  return streamSorting.value.filter === "asc"
    ? await query?.toArray()
    : await query?.reverse().toArray();
}, [getSince, streamSorting, currentSpace]);

const getParentGroup = (replay: any) => {
  if (
    replay?.tags &&
    replay?.tags?.length === 1 &&
    replay.tags.some((tag: any) => tag[0] === "e")
  ) {
    return replay.tags[0][1];
  }
};
</script>

<template>
  <div class="mb-6 p-4 border-1">
    <div>
      <div
        class="flex items-center justify-between mt-5 px-3 gap-4 my-3 pb-3 border-b-2 border-brown"
      >
        <h3 class="text-xl">گروه‌های {{ currentSpace.title }}</h3>
        <nuxt-link
          class="flex cursor-pointer items-end"
          to="/social/g/create-new"
        >
          <span class="text-xs">گروه جدید</span>

          <IconUil:plus class="text-md mr-2 flex" aria-hidden="true" />
        </nuxt-link>
      </div>
    </div>
    <ul v-if="replayTimeline !== null" class="flex-col items-start">
      <!-- Story #1 -->
      <div
        v-for="replay in replayTimeline.value"
        :key="replay?.id"
        class="px-2 py-4 flex flex-col border-b-2 last:border-0"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <SocialGroupsPicture
              :id="getParentGroup(replay)"
              size="sm"
              class="ml-3"
            />
            <SocialGroupsName
              :id="getParentGroup(replay)"
              class="text-md text-sm font-semibold text-slate-600 m-0 p-0"
            />
          </div>

          <div class="flex text-[.5rem]">
            {{ FromNow(replay.created_at * 1000) }}
          </div>
        </div>
        <div class="flex items-center justify-start mt-2 mr-3">
          <ProfileUserName :pub="replay?.pubkey" class="text-xs" />
          <div class="mx-1 text-xs">
            {{ " : " }}
          </div>
          <div class="text-xs text-slate-400 break-words overflow-hidden">
            {{
              replay?.content?.length >= 40
                ? replay?.content?.slice(0, 40) + " ..."
                : replay?.content
            }}
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
