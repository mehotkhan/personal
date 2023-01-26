<script setup lang="ts">
import { useMessage } from "~/stores/directMessage";
const { $irisLocal } = useNuxtApp();
const directMessage = useMessage();
const archive = reactive(new Map());

onMounted(() => {
  $irisLocal.get("channels").map((chat: any, id: string) => {
    !archive.has(id) && archive.set(id, { ...chat, id });
    return chat;
  });
});
const sortedChats = computed(() => OrderChat(Array.from(archive.values())));
</script>
<template>
  <div class="w-full grid">
    <ul
      reverse
      class="overflow-y-auto overflow-x-hidden max-h-400 flex-col w-full my-3 pl-3"
    >
      <li
        v-for="(chat, id) in sortedChats"
        :key="id"
        class="flex rounded-md my-5 border-1 h-20 items-center cursor-pointer hover:bg-slate-100"
        @click="directMessage.startChat(chat.id)"
      >
        <IconMdi:user class="text-lg mr-2" />
        <div class="mr-4">
          <p class="text-md font-semibold text-slate-600 m-0 p-0">
            {{ chat?.name ?? "name" }}
          </p>
          <p
            class="text-xs text-slate-400 -mt-0.5 font-semibold max-h-10 overflow-hidden"
          >
            {{ chat?.latest?.text.substring(0, 40) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
