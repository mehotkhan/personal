<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const { $irisPublic } = useNuxtApp();

const props = defineProps({
  isOpen: { type: Boolean, required: true, default: false },
});

const newUsername = ref("");
const newUserAbout = ref("");

onMounted(() => {
  if ($irisPublic) {
    $irisPublic()
      .get("profile")
      .get("name")
      .on((name: string) => {
        newUsername.value = name;
      });

    $irisPublic()
      .get("profile")
      .get("about")
      .on((about: string) => {
        newUserAbout.value = about;
      });
  }
});
const emit = defineEmits(["closeModal"]);

const updateUsername = async () => {
  await $irisPublic().get("profile").get("name").put(newUsername.value);
  await $irisPublic().get("profile").get("about").put(newUserAbout.value);

  emit("closeModal");
};
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" class="relative z-10">
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
              class="w-full max-w-md transform overflow-hidden rounded-md bg-white p-5 text-right items-center shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                به روز رسانی اطلاعات کاربری
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
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="درباره"
                  />
                </div>
              </div>

              <div
                class="flex mt-4 w-full items-center justify-between text-white text-xl"
              >
                <button
                  type="button"
                  class="flex justify-center rounded-md-md border border-transparent bg-red-400 px-5 py-1"
                  @click="emit('closeModal')"
                >
                  بستن
                </button>
                <button
                  type="button"
                  class="flex rounded border border-transparent bg-green-400 px-5 py-1"
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
