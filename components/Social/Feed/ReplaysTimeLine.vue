<script lang="ts" setup>
import { useElementVisibility } from "@vueuse/core";
const props = defineProps({
  parent: {
    type: String,
    default: "",
  },
});
const limit = ref(10);
const { startFeedStream } = useFeeds();

const { $dexieDb } = useNuxtApp();
const { getSince, streamSorting, currentSpace } = useStream();
const { profile } = useUser();
const rawTimeline = ref<any | null>(null);
const nowSync = ref(0);
const nowSyncCount = ref(0);

const target = ref(null);
const loadMoreIsVisible = useElementVisibility(target);
const isLoadMore = ref(true);
nowSync.value = Date.now() / 1000;

onMounted(() => {
  if (currentSpace.value?.relay) {
    startFeedStream();
  }
});

rawTimeline.value = useLiveQuery<any[]>(async () => {
  const query = $dexieDb?.events
    .orderBy("created_at")
    .filter(
      (event: any) =>
        event.tags.some(
          (tag: any) => tag[0] === "e" && tag[1] === props.parent,
        ) &&
        event.spaceId === currentSpace.value.spaceId &&
        event.created_at >= getSince.value &&
        event.created_at < nowSync.value,
    )
    .limit(limit.value);

  return streamSorting.value.filter === "asc"
    ? await query?.toArray()
    : await query?.reverse().toArray();
}, [limit, getSince, streamSorting, currentSpace, nowSync]);

watch(currentSpace, (newSpace) => {
  if (newSpace?.relay) {
    startFeedStream();
  }
});

watch(loadMoreIsVisible, async (newLoadMoreIsVisible) => {
  if (newLoadMoreIsVisible) {
    const LoadMore = await isMore();
    if (LoadMore) {
      loadMore();
    } else {
      isLoadMore.value = false;
    }
  }
});

const loadMore = () => {
  limit.value = limit.value + 10;
};

const isMore = async () => {
  const count: any = await $dexieDb?.events
    .filter(
      (event: any) =>
        event.tags.some(
          (tag: any) => tag[0] === "e" && tag[1] === props.parent,
        ) &&
        event.spaceId === currentSpace.value.spaceId &&
        event.created_at > getSince.value,
    )
    .count();
  const nowLength = rawTimeline.value.value;
  return count !== nowLength.length ?? false;
};
const newIncoming: any = useLiveQuery(
  async () =>
    await $dexieDb?.events
      .orderBy("created_at")
      .filter(
        (event: any) =>
          event.tags.some(
            (tag: any) => tag[0] === "e" && tag[1] === props.parent,
          ) &&
          event.spaceId === currentSpace.value.spaceId &&
          event.created_at > nowSync.value,
      )
      .count(),

  [currentSpace, nowSync],
);
watch(newIncoming, async (newNewIncoming: number) => {
  if (newNewIncoming > 0) {
    nowSyncCount.value = newNewIncoming;
  }
});

const updateSync = () => {
  nowSyncCount.value = 0;
  nowSync.value = Date.now() / 1000;
};
const isOwner = (pub: string) => {
  return profile.value.pub === pub;
};
</script>
<template>
  <div>
    <button
      v-if="nowSyncCount > 0"
      class="mb-5 w-full text-center block bg-gray-100 text-gray-600"
      @click="updateSync()"
    >
      <span class="text-xs leading-10">
        {{ `${nowSyncCount} نظر جدید` }}
      </span>
    </button>
    <div
      v-for="feed in rawTimeline.value"
      :key="feed?.id"
      class="text-gray-600 p-2 antialiased flex w-full"
    >
      <div class="w-full flex">
        <ProfileUserAvatar :pub="feed?.pubkey" size="sm" class="" />

        <div class="w-full bg-gray-100 rounded-sm mr-3 p-2">
          <div class="flex items-center text-gray-400 justify-between">
            <div class="flex items-center text-xs">
              <ProfileUserName :pub="feed?.pubkey" class="" />
              <div class="font-thin mr-2">
                • {{ FromNow(feed?.created_at * 1000) }}
              </div>
            </div>
            <SocialFeedActions
              v-if="isOwner(feed?.pubkey)"
              class="absolute left-3 text-sm"
            />
          </div>
          <p class="text-sm text-gray-700 leading-10">
            {{ feed?.content }}
          </p>
        </div>
      </div>
    </div>
    <button
      v-if="isLoadMore"
      ref="target"
      class="mb-5 w-full text-center block bg-gray-100 text-gray-600"
      @click="loadMore"
    >
      <span class="text-xs leading-10"> بارگذاری بیشتر </span>
    </button>
  </div>
</template>
