<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPrivate } = useNuxtApp();

const chatMessage = ref("");

const sendMessage = () => {
  $irisPrivate(props.pub).send(chatMessage?.value);
  chatMessage.value = "";
};
</script>
<template>
  <div
    class="mb-5 bg-gray-200 border-1 min-h-13 max-h-40 flex justify-between px-4 items-center bg-slate-50 focus-within:border-slate-300 rounded-md"
  >
    <div class="flex items-center h-full w-full">
      <IconUil:voicemail
        class="text-gray-400 text-3xl text-green-300 cursor-pointer"
        aria-hidden="true"
      />

      <input
        v-model="chatMessage"
        rows="2"
        type="text"
        class="-translate-y-10 w-full p-4 flex items-center h-auto bg-transparent outline-none placeholder:text-slate-400 text-lg"
        placeholder="چیزی بنویسید یا پیام صوتی ضبط کنید :)"
        @keyup.enter="sendMessage"
        @click="sendMessage"
      />
    </div>
    <div class="flex items-center justify-around">
      <IconUil:message
        v-if="chatMessage?.length > 0"
        class="text-gray-400 text-lg cursor-pointer"
        aria-hidden="true"
      />
      <IconUil:smile
        class="text-gray-400 text-2xl cursor-pointer mr-2"
        aria-hidden="true"
      />
      <IconUil:file
        v-if="chatMessage?.length === 0"
        class="text-gray-400 text-2xl cursor-pointer mr-2"
        aria-hidden="true"
      />
      <IconUil:image
        v-if="chatMessage?.length === 0"
        class="text-gray-400 text-2xl cursor-pointer mr-2"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
