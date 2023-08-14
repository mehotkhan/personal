<script setup lang="ts">
import * as Structured from "@worker-tools/structured-json";
const { profile } = useUser();
const { checkMembers } = useMembers();

const name = ref<string>("");
const loading = ref(false);
const emit = defineEmits(["closeModal"]);

const webauthLogin = async () => {
  if (name.value?.length >= 3) {
    loading.value = true;
    try {
      const res: any = await $fetch("/members/login-request", {
        method: "POST",
        body: {
          name: name.value,
        },
      });
      if (res) {
        const publicKey = await Structured.fromJSON(res);
        const loginKeys: any = await getLoginKeys(publicKey);
        if (loginKeys) {
          profile.value = loginKeys;
          await checkMembers();
          loading.value = false;
          await navigateTo("/social");
          emit("closeModal");
        } else {
          loading.value = false;
        }
      }
    } catch (error) {
      loading.value = false;
    }
  }
};
const getLoginKeys = async (publicKey: any) => {
  if (publicKey) {
    try {
      const cred = await navigator.credentials.get({ publicKey });
      const body = {
        ...(await Structured.toJSON(credToJSON(cred))),
        name: name.value,
      };
      const loginKeys = await $fetch("/members/login-pass", {
        method: "POST",
        body,
      });
      return loginKeys;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
</script>
<template>
  <div class="fixed inset-0">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="w-full max-w-md transform overflow-hidden rounded-md bg-white"
      >
        <UCard
          :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        >
          <template #header> ورود به حساب کاربری</template>
          <div class="form-group mb-6 text-right">
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder=" نام کاربری خود را وارد کنید"
            />
          </div>
          <ul class="mr-8 text-sm text-gray-500 list-disc text-right">
            <li :class="name?.length >= 3 ? 'text-gray-500' : 'text-red-500'">
              حداقل سه حرف
            </li>
          </ul>

          <template #footer>
            <div class="flex justify-between text-white">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-red-400"
                @click="emit('closeModal')"
              >
                بستن
              </button>
              <button
                :class="name.length >= 3 ? 'flex' : 'disabled'"
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2"
                @click="webauthLogin"
              >
                ورود به حساب کاربری
                <svg
                  v-if="loading"
                  aria-hidden="true"
                  class="flex w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </button>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
