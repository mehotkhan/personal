<script setup lang="ts">
const route = useRoute();
const { profile, registerNew } = useUser();
const commentMessage = ref("");
const isHuman = ref(false);

const passHuman = (pass: boolean) => {
  isHuman.value = pass;
};

watch(isHuman, async (newHuman, _) => {
  if (newHuman) {
    console.log("passed");
  }
});

const sendComment = () => {
  if (isHuman && commentMessage?.value.length >= 3) {
    console.log(commentMessage.value);
    commentMessage.value = "";
  }
};
</script>

<template>
  <div class="">
    <header
      class="flex justify-between items-center border-b border-gray-200 pb-2 mb-2"
    >
      <div
        class="flex text-md items-center cursor-pointer"
        @click="registerNew()"
      >
        <IconUil:user class="ml-2 text-sm flex" aria-hidden="true" />
        <span class="block pt-2 text-md"> {{ profile.displayName }}</span>
      </div>
    </header>

    <UTextarea v-model="commentMessage" color="gray" variant="outline" />

    <footer class="flex justify-between mt-2 items-center">
      <CommentsHumanDetect v-if="!isDev()" @passed="passHuman" />

      <UButton
        :disabled="!isHuman"
        label="ارسال دیدگاه"
        variant="outline"
        color="gray"
        @click="sendComment"
      />
    </footer>
  </div>
</template>
