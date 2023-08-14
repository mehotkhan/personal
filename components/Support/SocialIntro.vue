<script setup lang="ts">
const { changeView } = useSupport();
const { startFeedStream } = useFeeds();
const { $dexieDb } = useNuxtApp();
const { currentSpace } = useStream();
const rawTimeline = ref<any | null>(null);

onMounted(() => {
  if (currentSpace.value?.relay) {
    startFeedStream();
  }
});

rawTimeline.value = useLiveQuery<any[]>(
  async () =>
    await $dexieDb?.events
      .orderBy("created_at")
      .filter(
        (event: any) =>
          event.spaceId === currentSpace.value.spaceId &&
          event.tags.length === 0,
      )
      .limit(1)
      .reverse()
      .toArray(),
  [currentSpace],
);
const latestFeed = computed(() => rawTimeline?.value?.value?.[0]);
</script>
<template>
  <div
    class="bg-white rounded-xl w-full px-4 py-2 my-5 transition-all shadow-2xl relative min-h-[10rem]"
  >
    <div
      class="flex w-full justify-between items-center text-md pb-3 border-b-2 mt-4 mb-0 border-brown"
    >
      <h3>آخرین رخدادها</h3>
      <div
        class="text-sm cursor-pointer text-brown"
        @click="changeView('social')"
      >
        بیشتر
      </div>
    </div>
    <div
      :key="latestFeed?.id"
      class="flex flex-row px-2 py-3 mx-3 items-center"
    >
      <ProfileUserAvatar :pub="latestFeed?.pubkey" size="xs" class="my-3" />
      <div class="flex my-1 text-gray-600 w-full justify-between">
        <ProfileUserName
          :pub="latestFeed?.pubkey"
          :support="true"
          class="mr-2 text-sm"
        />
        <div class="text-gray-400 font-thin text-xs">
          {{ FromNow(latestFeed?.created_at * 1000) }}
        </div>
      </div>
    </div>
    <div class="border-b border-gray-100"></div>

    <div
      class="text-gray-500 text-md mb-6 mx-3 px-2 text-right pt-4 break-words"
    >
      {{
        latestFeed?.content.length >= 100
          ? latestFeed?.content.slice(0, 100) + " ..."
          : latestFeed?.content
      }}
    </div>
  </div>
</template>
