<script lang="ts" setup>
const props = defineProps({
  parent: {
    type: String,
    default: "",
  },
});
const limit = ref(6);
const { $dexieDb } = useNuxtApp();
const timeline = ref<any | null>(null);
const { getSince } = useStream();

timeline.value = useLiveQuery<any[]>(
  async () =>
    await $dexieDb?.groupsEvent
      .orderBy("created_at")
      .filter(
        (event: any) =>
          event.tags.some(
            (tag: any) => tag[0] === "e" && tag[1] === props.parent,
          ) && event.created_at >= getSince?.value,
      )
      .limit(limit.value)
      .reverse()
      .toArray(),
  [limit, getSince],
);
</script>
<template>
  <div
    v-for="feed in timeline.value"
    :key="feed?.id"
    class="pb-2 antialiased flex w-full border-b-[1px] my-2 border-gray-100 overflow-hidden last:border-0"
  >
    <div class="w-full flex">
      <ProfileUserAvatar :pub="feed?.pubkey" size="xs" class="" />

      <div class="w-full mr-3 text-gray-600">
        <div class="flex items-center justify-between">
          <div class="flex items-center text-[.5rem]">
            <ProfileUserName :pub="feed?.pubkey" class="" />
            <div class="font-thin mr-2">
              • {{ FromNow(feed?.created_at * 1000) }}
            </div>
          </div>
        </div>
        <span class="p-0 text-xs">
          {{
            feed?.content.length >= 20
              ? feed?.content.slice(0, 20) + " ..."
              : feed?.content
          }}
        </span>
      </div>
    </div>
  </div>
</template>
