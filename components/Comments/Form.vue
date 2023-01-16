<script setup lang="ts">
import { useComment } from "~/stores/comments";
const route = useRoute();

const comments = useComment();
const commentMessage = ref("");
const isHuman = ref(false);
const passHuman = (pass: boolean) => {
  isHuman.value = pass;
};
const sendComment = () => {
  if (isHuman && commentMessage?.value.length >= 3) {
    comments.send(commentMessage.value, route?.path);
    commentMessage.value = "";
  }
};
</script>
<template>
  <div class="bg-white rounded-sm border-1 mb-6 p-4">
    <textarea
      @keyup.enter="isHuman && commentMessage?.length >= 3 ? sendComment : null"
      v-model="commentMessage"
      name="message"
      type="text"
      placeholder="چیزی بنویسید ..."
      class="w-full rounded-lg p-2 text-md bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
    ></textarea>
    <footer class="flex justify-between mt-2">
      <CommentsHumanDetect @passed="passHuman" />
      <button
        :class="isHuman && commentMessage?.length >= 3 ? 'flex' : 'disabled'"
        class="flex items-center py-1 px-5 rounded-md text-lg bg-black text-white"
        @click="sendComment"
      >
        ارسال دیدگاه
        <IconMdi:send
          class="text-white text-lg cursor-pointer mr-2"
          aria-hidden="true"
        />
      </button>
    </footer>
  </div>
</template>
<style lang="scss">
button.disabled {
  opacity: 0.4;
  cursor: no-drop;
}
</style>
