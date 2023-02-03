<script setup lang="ts">
const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const { $irisPrivate } = useNuxtApp();
const conversation = reactive(new Map());
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
  <div class="overflow-x-auto max-h-240 min-h-1 flex-col-reverse">
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
          {{ message?.selfAuthored ? $irisSession.getMyName() : "other" }}

          <p
            class="font-semibold text-sm text-slate-600"
            :class="
              message?.selfAuthored ? 'justify-start mr-3 ' : 'justify-end ml-3'
            "
          >
            <span class="text-slate-400 text-xs">{{
              FromNow(message.time)
            }}</span>
          </p>
        </div>

        <div
          class="mt-3 w-full px-2 py-1 rounded-b-xl"
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
</template>
