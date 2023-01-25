<script setup lang="ts">
import _ from 'lodash'
import { useMessage } from '~/stores/directMessage'

const { $irisLocal } = useNuxtApp()
const directMessage = useMessage()

const archive = reactive(new Map())
const emit = defineEmits(['closeModal'])
const closeModal = () => {
  emit('closeModal')
}
onMounted(() => {
  $irisLocal.get('channels').map((chat: any, id: string) => {
    !archive.has(id) && archive.set(id, { ...chat, id })
    return chat
  })
})
const sortedChats = computed(() =>
  _.orderBy(
    Array.from(archive.values()),
    ['latestTime', 'name'],
    ['desc', 'asc']
  )
)
</script>
<template>
  <div class="h-full w-full flex flex-col">
    <div
      class="h-12 border-b px-4 flex items-center justify-right space-x-4 bg-orange"
    >
      <div class="px-4 text-xl font-medium text-white">پیام‌رسان</div>
      <IconMdi:chevron-double-down
        class="text-white text-2xl cursor-pointer left-0 absolute"
        aria-hidden="true"
        @click="closeModal"
      />
    </div>
    <div class="overflow-x-auto h-120">
      <div
        v-for="(chat, id) in sortedChats"
        :key="id"
        class="px-5 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
        @click="directMessage.startChat(chat.id)"
      >
        <img
          src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500"
          class="h-12 w-12 border-2 border-white rounded-full"
          alt=""
        />
        <div class="mr-4">
          <p class="text-md font-semibold text-slate-600 m-0 p-0">
            {{ chat?.name }}
          </p>
          <p class="text-xs text-slate-400 -mt-0.5 font-semibold">
            {{ chat?.latest?.text }}
          </p>
        </div>
      </div>

      <!-- else -->
    </div>
  </div>
</template>
