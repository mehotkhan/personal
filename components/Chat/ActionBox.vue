<template>
  <div
    class="h-12 px-4 fixed left-10 bottom-0 flex items-center justify-center w-90 border-1 bg-orange border-white rounded-tr-md rounded-tl-md bg-white shadow-xl transition-all"
  >
    <div
      class="w-full text-xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <button class="w-full text-right" @click="openModal">پیام‌رسان</button>
    </div>
    <IconMdi:chat-plus
      class="text-white text-2xl cursor-pointer"
      aria-hidden="true"
    />
    <IconMdi:chevron-double-up
      class="text-white text-3xl cursor-pointer mr-3"
      aria-hidden="true"
      @click="openModal"
    />
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <div class="fixed left-10 bottom-0">
        <TransitionChild
          as="template"
          enter="duration-140 fade "
          enter-from="h-0 scale-95"
          enter-to="h-140 scale-100"
          leave="duration-140  fade"
          leave-from="h-140 scale-100"
          leave-to="h-0 scale-95"
        >
          <DialogPanel
            class="w-90 transform overflow-hidden rounded-tr-md rounded-tl-md bg-white text-right align-middle shadow-xl transition-all"
          >
            <ChatArchive v-if="!directMessage.pub" @close-modal="closeModal" />
            <ChatConversation
              v-if="directMessage.pub"
              @close-modal="closeModal"
            />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue'
import { useMessage } from '~/stores/directMessage'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
const directMessage = useMessage()
directMessage.$subscribe((mutation, state) => {
  if (mutation.type === 'direct') {
    isOpen.value = true
  }
})
</script>
