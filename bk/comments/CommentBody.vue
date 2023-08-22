<script setup lang="ts">
const { getCommentData } = useComments();
const props = defineProps({
  commentKey: {
    type: String,
    required: true,
  },
});
const commentBody: any = await getCommentData(props.commentKey);
</script>

<template>
  <li class="border-b pb-3 pt-1">
    <span class="font-normal text-sm">
      <UserDetails :pub="commentBody?.user" />
    </span>
    <span class="font-hairline text-xs"
      >{{ JalaliDate(commentBody?.date) }}
    </span>

    <br />
    <p class="text-md font-normal m-0">
      {{ commentBody?.comment }}
    </p>
  </li>
</template>
