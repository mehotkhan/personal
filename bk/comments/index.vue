<template>
  <div class="flex flex-col">
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
