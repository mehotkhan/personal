<script lang="ts" setup>
const props = defineProps({
  parent: {
    type: String,
    default: "",
  },
});
const { $dexieDb } = useNuxtApp();

const replayCount = useLiveQuery<number>(
  async () =>
    await $dexieDb?.groupsEvent
      .filter((event: any) =>
        event.tags.some(
          (tag: any) => tag[0] === "e" && tag[1] === props.parent,
        ),
      )
      .count(),
  [],
);
</script>
<template>
  <div class="flex w-full border-t border-gray-100">
    <div class="mt-3 mx-5 flex flex-row text-xs">
      <div class="flex font-normal rounded-md mb-2 mr-4 items-center">
        <div class="mr-1 text-orange text-ms">{{ `${replayCount} نظر` }}</div>
      </div>
      <!-- <div class="flex font-normal rounded-md mb-2 mr-4 items-center">
        Views:
        <div class="ml-1 text-gray-400 text-ms">60k</div>
      </div> -->
    </div>
    <!-- <div class="mt-3 mx-5 w-full flex justify-end text-xs">
      <div class="flex rounded-md mb-2 mr-4 items-center">
        Likes:
        <div class="ml-1 text-gray-400 text-ms">120k</div>
      </div>
    </div> -->
  </div>
</template>
