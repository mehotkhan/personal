<script lang="ts" setup>
const props = defineProps({
  parent: {
    type: String,
    default: "",
  },
});
const limit = ref(7);
const { $dexieDb } = useNuxtApp();
const timeline = ref<any | null>(null);
const { profile } = useUser();

timeline.value = useLiveQuery<any[]>(
  async () =>
    await $dexieDb?.groupsEvent
      .orderBy("created_at")
      .filter((event: any) =>
        event.tags.some(
          (tag: any) => tag[0] === "e" && tag[1] === props.parent,
        ),
      )
      .limit(limit.value)
      .reverse()
      .toArray(),
  [limit],
);
const isOwner = (pub: string) => {
  return profile.value.pub === pub;
};
</script>
<template>
  <div
    v-for="feed in timeline.value"
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
</template>
