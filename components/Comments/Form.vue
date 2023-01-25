<script setup lang="ts">
import { useComment } from "~/stores/comments";
const route = useRoute();

const comments = useComment();
const commentMessage = ref("");
const isHuman = ref(true);
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
  <div class="bg-white rounded-sm border-1 mb-6 p-3">
    <header
      class="flex justify-between items-center border-b border-gray-200 pb-2 mb-2"
    >
      <div class="flex text-sm items-center">
        <IconUil:commentShare class="ml-2 text-md flex" aria-hidden="true" />
        <span class="block pt-2"> ۵۰ شرکت کننده </span>
      </div>
      <SocialGuestProfile class="mb-4 bg-black" />
    </header>

    <textarea
      @keyup.enter="isHuman && commentMessage?.length >= 3 ? sendComment : null"
      v-model="commentMessage"
      name="message"
      type="text"
      placeholder="چیزی بنویسید ..."
      class="w-full rounded-lg p-2 text-md bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
    ></textarea>
    <footer class="flex justify-between mt-2 items-center">
      <CommentsHumanDetect @passed="passHuman" v-if="!isDev()" />
      <button
        :class="isHuman && commentMessage?.length >= 3 ? 'flex' : 'disabled'"
        class="flex items-center py-1 px-5 rounded-md text-lg bg-black text-white h-10"
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
