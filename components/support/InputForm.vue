<script setup lang="ts">
const { sendTicket, currentTicket } = useSupport();

const chatMessage = ref("");

const send = () => {
  sendTicket(chatMessage.value);
  chatMessage.value = "";
};
</script>
<template>
  <div
    :key="currentTicket.id"
    class="w-full px-5 py-3 bg-gray-100 absolute bottom-0"
  >
    <div
      :class="[chatMessage.length && !isRTL(chatMessage) ? 'ltr' : 'rtl']"
      class="min-h-12 flex justify-between px-3 items-center border-transparent bg-slate-50 border-0 focus-within:border-slate-300"
    >
      <input
        v-model="chatMessage"
        type="text"
        class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400 border-0 rounded-sm"
        placeholder="پاسختان را بنویسید ..."
        @keyup.enter="send"
        @click="send"
      />
      <div class="flex items-center justify-around mr-3">
        <IconMdi:send
          class="text-gray-400 text-lg cursor-pointer"
          aria-hidden="true"
        />
        <!-- <IconMdi:file
          v-if="chatMessage.length === 0"
          class="text-gray-400 text-lg"
          aria-hidden="true"
        />
        <IconMdi:image
          v-if="chatMessage.length === 0"
          class="text-gray-400 text-lg mr-1"
          aria-hidden="true"
        /> -->
      </div>
    </div>
  </div>
</template>
