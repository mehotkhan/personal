<script setup lang="ts">
const { sendStream } = useFeeds();
const { currentSpace } = useStream();

const feedMessage = ref("");

const sendFeed = () => {
  if (feedMessage.value.length >= 5) {
    sendStream(feedMessage.value);
    feedMessage.value = "";
  }
};
</script>
<template>
  <UCard
    :ui="{
      body: {
        base: 'h-full border-0 ',
        padding: 'px-4 py-5',
      },
      rounded: 'rounded-md',
      divide: 'divide-0',
      ring: 'ring-0',
      header: {
        padding: 'px-4 pt-5',
      },
      footer: {
        padding: 'px-4 pb-5',
      },
    }"
  >
    <textarea
      v-model="feedMessage"
      theme="snow"
      name="message"
      type="text"
      placeholder="چیزی بنویسید ..."
      class="body w-full text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 p-2 rounded-xs"
    />
    <span class="text-sm text-gray-300 mr-3">حداقل ۵ کاراکتر</span>
    <template #footer>
      <footer class="flex justify-between">
        <div class="flex gap-2 items-center">
          <UAvatar
            size="md"
            :alt="currentSpace.title"
            :src="currentSpace.picture"
          />
          <p class="text-md text-gray-400">{{ currentSpace.about }}</p>
        </div>
        <div class="flex gap-2">
          <button
            :class="feedMessage.length < 5 ? 'disabled' : ''"
            class="flex items-center py-2 px-4 rounded-md text-md text-orange bg-white border-1 border-brown"
            @click="sendFeed"
          >
            انتشار در {{ currentSpace.title }}
            <IconMdi:send
              class="text-orange text-lg cursor-pointer mr-2"
              aria-hidden="true"
            />
          </button>
        </div>
      </footer>
    </template>
  </UCard>
</template>
<style lang="scss">
button.disabled {
  opacity: 0.5;
  cursor: no-drop;
}
</style>
