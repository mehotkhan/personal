<script setup lang="ts">
import { useComment } from "~/stores/comments";
const comments = useComment();
const route = useRoute();

onMounted(() => {
  comments.loadComments(route?.path);
});
</script>
<template>
  <div
    v-for="comment in OrderByFrom(Array.from(comments.commentHistory))"
    :key="comment?.from"
    class="pb-5 mb-6 group"
  >
    <div
      class="flex bg-gray-100 rounded-md w-full mt-1 items-center justify-between h-auto p-2"
    >
      <SocialUserName :pub="comment.sender" />
      <div class="text-gray-400 font-thin text-sm pt-1 mr-4">
        • {{ FromNow(comment?.from) }}
      </div>
    </div>
    <div
      class="text-gray-500 text-lg mb-6 text-right pt-4"
      v-html="comment.text"
    ></div>
    <button class="float-left text-sm hidden group-hover:block">
      پاسخ به این دیدگاه
    </button>
  </div>
</template>
