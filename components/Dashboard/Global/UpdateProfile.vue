<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-right items-center	 shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                به روز رسانی پروفایل
              </DialogTitle>
              <div class="mt-5">
                <div class="form-group mb-6">
                  <label
                    for="username"
                    class="form-label inline-block mb-2 text-gray-700"
                    >نام شما</label
                  >
                  <input
                    id="username"
                    v-model="newUsername"
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="نام شما"
                  />
                </div>
                <div class="form-group mb-6">
                  <label
                    for="about"
                    class="form-label inline-block mb-2 text-gray-700"
                    >درباره</label
                  >
                  <input
                    id="about"
                    v-model="newUserAbout"
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="درباره"
                  />
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 float-left"
                  @click="closeModal"
                >
                  بستن
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 ml-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 float-left"
                  @click="updateUsername"
                >
                  به روزرسانی
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { ref } from 'vue'
const { $irisPublic, $irisGlobal, $irisSession } = useNuxtApp()

const props = defineProps({
  isOpen: { type: Boolean, required: true, default: false },
})

const newUsername = ref('')
const newUserAbout = ref('')
if ($irisPublic) {
  $irisPublic()
    .get('profile')
    .get('name')
    .on((name: string) => {
      newUsername.value = name
    })
  $irisPublic()
    .get('profile')
    .get('about')
    .on((about: string) => {
      newUserAbout.value = about
    })
}

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}
const updateUsername = () => {
  $irisPublic().get('profile').get('name').put(newUsername.value)
  $irisPublic().get('profile').get('about').put(newUserAbout.value)
  $irisGlobal
    .get('members')
    .get($irisSession.getKey().pub)
    .get('name')
    .put(newUsername.value)
  $irisGlobal
    .get('members')
    .get($irisSession.getKey().pub)
    .get('about')
    .put(newUserAbout.value)
  $irisGlobal
    .get('members')
    .get($irisSession.getKey().pub)
    .get('pub')
    .put($irisSession.getKey().pub)

  emit('closeModal')
}
</script>
