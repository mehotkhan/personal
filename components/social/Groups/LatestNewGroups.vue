<script setup lang="ts">
const { $dexieDb } = useNuxtApp();
const { getSince, streamSorting, currentSpace } = useStream();
const { startGroupStream } = useGroups();

const groupsTimeline = ref<any | null>(null);
const limit = ref(7);

onMounted(() => {
  if (currentSpace.value?.relay) {
    startGroupStream();
  }
});
groupsTimeline.value = useLiveQuery<any[]>(async () => {
  const query = $dexieDb?.groups
    .orderBy("created_at")
    .filter(
      (event: any) =>
        event.spaceId === currentSpace.value.spaceId &&
        event.created_at >= getSince.value,
    )
    .limit(limit.value);

  return streamSorting.value.filter === "asc"
    ? await query?.toArray()
    : await query?.reverse().toArray();
}, [getSince, streamSorting, currentSpace]);
</script>

<template>
  <div class="mb-6 p-4 border-1">
    <div>
      <div
        class="flex items-center justify-between mt-5 px-3 gap-4 my-3 pb-3 border-b-2 border-brown"
      >
        <h3 class="text-xl">گروه های جدید {{ currentSpace.title }}</h3>
        <nuxt-link
          class="flex cursor-pointer items-end"
          to="/social/g/create-new"
        >
          <span class="text-xs">گروه جدید</span>

          <IconUil:plus class="text-md mr-2 flex" aria-hidden="true" />
        </nuxt-link>
      </div>
    </div>
    <ul v-if="groupsTimeline !== null" class="flex-col items-start">
      <!-- Story #1 -->
      <div
        v-for="group in groupsTimeline.value"
        :key="group?.id"
        class="px-2 py-4 flex flex-col border-b-2 last:border-0"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <SocialGroupsPicture
              :id="group.id"
              size="sm"
              class="text-sm font-semibold text-slate-600 m-0 p-0 ml-3"
            />
            <SocialGroupsName :id="group.id" class="text-md" />
          </div>

          <div class="flex text-[.5rem]">
            {{ FromNow(group.created_at * 1000) }}
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
