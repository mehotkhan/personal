<script setup lang="ts">
const { pendingComments, getPendingComments } = useComments();
onMounted(() => {
  getPendingComments();
});
</script>

<template>
  <div class="border-t">
    <ul class="list-disc m-0">
      <CommentsCommentBody
        v-for="commentKey in pendingComments"
        :key="commentKey"
        :comment-key="commentKey"
      />
    </ul>
  </div>
</template>
