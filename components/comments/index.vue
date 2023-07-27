<template>
  <div class="flex flex-col">
    <h3>دیدگاه ها</h3>

    <UBadge
      v-if="!isDev()"
      color="red"
      variant="solid"
      label="در حال توسعه!!!"
    />

    <CommentsForm />
    <CommentsLists />
  </div>
</template>
