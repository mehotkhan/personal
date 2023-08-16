<script lang="ts" setup>
const { profile } = useUser();

const props = defineProps({
  parent: {
    type: String,
    default: "",
  },
});
const { sendReplay } = useFeeds();

const feedMessage = ref("");

const send = () => {
  if (feedMessage.value.length >= 5) {
    sendReplay(feedMessage.value, props.parent);
    feedMessage.value = "";
  }
};
</script>
<template>
  <div
    class="relative flex gap-2 items-center self-center w-full overflow-hidden text-gray-600 focus-within:text-gray-400"
  >
    <ProfileUserAvatar :pub="profile.pub" size="sm" />

    <input
      v-model="feedMessage"
      class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-sm placeholder-gray-400"
      placeholder=" نظر شما ؟"
      autocomplete="off"
      @keyup.enter.native="send"
    />
    <button
      :class="feedMessage.length < 5 ? 'disabled' : ''"
      class="flex items-center py-2 px-1 rounded-sm text-xs text-orange bg-white w-[8rem]"
      @click="send"
    >
      ارسال نظر
      <IconMdi:send
        class="text-orange text-sm cursor-pointer mr-2"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
