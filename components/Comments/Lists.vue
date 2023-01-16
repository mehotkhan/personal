<script setup lang="ts">
import { useComment } from "~/stores/comments";
const comments = useComment();
const route = useRoute()

onMounted(() => {
  comments.loadComments(route?.path);
});
</script>
<template>
  <div
    v-for="comment in OrderByFrom(Array.from(comments.commentHistory))"
    :key="comment?.from"
    class="bg-white border-1 rounded-sm mb-6"
  >
    <div class="flex flex-row px-2 py-3 mx-3">
      <div class="flex flex-col mb-2 ml-4 mt-1">
        <div class="text-gray-600 text-md font-semibold">مهمان</div>
        <div class="flex w-full mt-1">
          <div class="text-gray-400 font-thin text-sm">
            • {{ FromNow(comment?.from) }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-gray-100"></div>

    <div
      v-html="comment.text"
      class="text-gray-500 text-md mb-6 mx-3 px-2 text-right pt-4"
    ></div>
  </div>
</template>
