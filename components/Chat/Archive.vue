<script setup lang="ts">
import { useMessage } from "~/stores/directMessage";
const { $irisLocal } = useNuxtApp();

const archive = reactive(new Map());
const directMessage = useMessage();

$irisLocal.get("channels").map((chat: any, id: string) => {
  if (chat?.latest?.text && !archive.has(id)) {
    archive.set(id, { ...chat, id });
  }
});
const sortedChats = computed(() => OrderChat(Array.from(archive.values())));
</script>
<template>
  <div class="mt-10 latest">
    <ul reverse class="max-h-140 overflow-x-auto">
      <li
        v-for="(chat, id) in sortedChats"
        :key="id"
        class="h-20 items-center cursor-pointer mr-8 group"
        @click="directMessage.startChat(chat.id)"
        :class="directMessage?.pub === chat.id ? 'font-bold':'font-normal'"
      >
        <div class="flex items-center justify-between group-hover:font-bold">
          <div class="flex items-center">
            <p class="text-xl text-slate-600 m-0 p-0">
              {{ chat?.name ?? "مهمان" }}
            </p>
            <p class="text-xs text-slate-400 mr-10 max-h-10 overflow-hidden">
              {{ chat?.latest?.text.substring(0, 40) }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 ml-10">{{
              FromNow(chat.latestTime)
            }}</span>
            <div>
              <div
                class="ml-4 text-xs inline-flex items-center font-thin leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
              >
                پشتیبانی
              </div>

              <div
                class="ml-4 text-xs inline-flex items-center font-thin leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full"
              >
                عمومی
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
