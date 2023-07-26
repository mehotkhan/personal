<script setup lang="ts">
const comments = [
  {
    author: "بدون نام",
    date: 0,
    comment: "متن دیدگاه",
    id: "1",
  },
  {
    author: "بدون نام",
    date: 0,
    comment: "متن دیدگاه",
    id: "2",
  },
  {
    author: "بدون نام",
    date: 0,
    comment: "متن دیدگاه",
    id: "5",
  },
  {
    author: "بدون نام",
    date: 0,
    comment: "متن دیدگاه",
    id: "4",
  },
];
</script>

<template>
  <div class="border-t">
    <ul v-for="comment in comments" :key="comment.id" class="list-disc m-0">
      <li class="border-b pb-3 pt-1">
        <span class="font-normal text-sm"> {{ comment.author }}، </span>
        <span class="font-hairline text-xs">۳ روز پیش</span><br />
        <p class="text-md font-normal m-0">
          {{ comment.comment }}
        </p>
      </li>
    </ul>
  </div>
</template>
