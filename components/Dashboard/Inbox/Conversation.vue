<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPrivate } = useNuxtApp();

const chatMessage = ref("");
const conversation = reactive(new Map());

const sendMessage = () => {
  $irisPrivate(props.pub).send(chatMessage?.value);
  chatMessage.value = "";
};

$irisPrivate(props.pub)?.getMessages((msg: any, meta: any) => {
  if (msg?.text && !conversation.has(msg.time)) {
    conversation.set(msg.time, {
      ...msg,
      ...meta,
    });
  }
});
const sortedMessages = computed(() =>
  OrderByFromReverse(Array.from(conversation?.values()))
);
</script>
<template>
  <div class="w-full h-full flex flex-col mt-10">
    <div
      class="mb-5 bg-gray-200 border-1 min-h-20 max-h-50 flex justify-between px-4 items-center bg-slate-50 focus-within:border-slate-300 rounded-md"
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
    <div class="py-4 overflow-x-auto max-h-240 min-h-1 flex-col-reverse">
      <div
        v-for="message in sortedMessages"
        :key="message?.time"
        class="w-full flex mt-3"
        :class="message?.selfAuthored ? 'justify-start' : 'justify-end'"
      >
        <div class="w-1/2">
          <div
            class="flex items-center"
            :class="message?.selfAuthored ? 'flex-row' : 'flex-row-reverse'"
          >
            <IconMdi:user
              class="text-lg"
              :class="message?.selfAuthored ? 'ml-4' : 'mr-4'"
            />
            {{
              message?.selfAuthored
                ? $irisSession.getMyName()
                : directMessage?.person?.name
            }}

            <p
              class="font-semibold text-sm text-slate-600"
              :class="
                message?.selfAuthored
                  ? 'justify-start mr-3 '
                  : 'justify-end ml-3'
              "
            >
              <span class="text-slate-400 text-xs">{{
                FromNow(message.time)
              }}</span>
            </p>
          </div>

          <div
            class="mt-3 w-full p-4 rounded-b-xl"
            :class="
              message?.selfAuthored
                ? 'bg-gray-400 rounded-tl-xl text-white'
                : 'bg-gray-200 rounded-tr-xl text-black'
            "
          >
            <p class="text-md">
              {{ message?.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
textarea::placeholder {
  padding-right: 1rem;
  padding-top: 1rem;
}
</style>
