<script setup lang="ts">
const route = useRoute();
const { profile } = useUser();
const { sendComment, getPendingComments } = useComments();
const commentMessage = ref("");
const isHuman = ref(false);
const sending = ref(false);

const passHuman = (pass: boolean) => {
  isHuman.value = pass;
};

// watch(isHuman, async (newHuman, _) => {
//   if (newHuman) {
//     console.log("passed");
//   }
// });

const send = async () => {
  if (isHuman && commentMessage?.value.length >= 5) {
    // commentMessage.value = "";
    sending.value = true;
    await sendComment(commentMessage.value, route.path);
    await getPendingComments();
    sending.value = false;
  }
};
</script>

<template>
  <div class="">
    <header
      class="flex justify-between items-center border-b border-gray-200 pb-5 mb-2"
    >
      <div class="flex text-md items-center cursor-pointer">
        <IconUil:user class="ml-2 text-sm flex" aria-hidden="true" />
        <span class="block pt-2 text-md"> {{ profile.displayName }}</span>
      </div>
    </header>
    <UTextarea v-model="commentMessage" color="gray" class="w-full" />

    <footer class="flex justify-end mt-2 items-center">
      <CommentsHumanDetect v-if="!isDev()" @passed="passHuman" />

      <UButton
        :loading="sending"
        class="mb-4"
        size="md"
        :disabled="commentMessage?.length < 5"
        label="ارسال دیدگاه"
        color="gray"
        @click="send"
      />
    </footer>
  </div>
</template>
